
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Contexts/AppContext/AppContext";

import Logo from "../../Assets/SvgImages/logo.svg";

import "./Header.css";

class Header extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            scrolled: false
        };

        this.menuRef = React.createRef();
        this.menuButtonRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, {
            passive: true
        });

        window.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("mousedown", this.handleOutsideClick);

        this.handleScroll();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.location.pathname !== this.props.location.pathname &&
            this.state.menuOpen
        ) {
            this.setState({
                menuOpen: false
            });
        }

        if (prevState.menuOpen !== this.state.menuOpen) {
            document.body.classList.toggle(
                "serenta-menu-open",
                this.state.menuOpen
            );
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("mousedown", this.handleOutsideClick);

        document.body.classList.remove("serenta-menu-open");
    }

    handleScroll = () => {
        const scrolled = window.scrollY > 12;

        if (scrolled !== this.state.scrolled) {
            this.setState({
                scrolled
            });
        }
    };

    handleKeyDown = (event) => {
        if (event.key === "Escape" && this.state.menuOpen) {
            this.closeMenu();
            this.menuButtonRef.current?.focus();
        }
    };

    handleOutsideClick = (event) => {
        if (!this.state.menuOpen) {
            return;
        }

        const menu = this.menuRef.current;
        const button = this.menuButtonRef.current;

        if (
            menu &&
            !menu.contains(event.target) &&
            button &&
            !button.contains(event.target)
        ) {
            this.closeMenu();
        }
    };

    toggleMenu = () => {
        this.setState((previousState) => ({
            menuOpen: !previousState.menuOpen
        }));
    };

    closeMenu = () => {
        this.setState({
            menuOpen: false
        });
    };

    handleSignOut = () => {
        if (this.context.userContext) {
            this.context.userContext.resetState();
        }

        if (this.context.postAdContext) {
            this.context.postAdContext.resetState();
        }

        UserToken.removeToken();
        this.closeMenu();
    };

    renderAuthLinks = () => {
        if (UserToken.hasToken()) {
            return (
                <>
                    <NavLink
                        to="/properties"
                        className="serenta-nav-link"
                        activeClassName="serenta-nav-link--active"
                        onClick={this.closeMenu}
                    >
                        My Properties
                    </NavLink>

                    <NavLink
                        exact
                        to="/"
                        className="serenta-nav-link serenta-nav-signout"
                        onClick={this.handleSignOut}
                    >
                        Sign Out
                    </NavLink>
                </>
            );
        }

        return (
            <>
                <NavLink
                    to="/login"
                    className="serenta-nav-link serenta-nav-login"
                    activeClassName="serenta-nav-link--active"
                    onClick={this.closeMenu}
                >
                    Log In
                </NavLink>

                <NavLink
                    to="/signup"
                    className="serenta-nav-signup"
                    activeClassName="serenta-nav-signup--active"
                    onClick={this.closeMenu}
                >
                    Sign Up
                </NavLink>
            </>
        );
    };

    render() {
        const { menuOpen, scrolled } = this.state;

        return (
            <header
                id="header-container"
                className={[
                    "serenta-header",
                    scrolled ? "serenta-header--scrolled" : ""
                ].filter(Boolean).join(" ")}
            >
                <nav
                    id="nav-container"
                    className="serenta-nav"
                    aria-label="Main navigation"
                >
                    <NavLink
                        exact
                        to="/"
                        className="serenta-brand"
                        onClick={this.closeMenu}
                        aria-label="Serenta home"
                    >
                        <img
                            src={Logo}
                            alt="Serenta"
                            className="serenta-brand-logo"
                        />
                    </NavLink>

                    <button
                        ref={this.menuButtonRef}
                        className={[
                            "serenta-menu-toggle",
                            menuOpen ? "serenta-menu-toggle--open" : ""
                        ].filter(Boolean).join(" ")}
                        type="button"
                        onClick={this.toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="serenta-navigation-links"
                    >
                        <span className="serenta-menu-toggle-lines">
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>

                    <div
                        id="serenta-navigation-links"
                        ref={this.menuRef}
                        className={[
                            "serenta-nav-content",
                            menuOpen ? "serenta-nav-content--open" : ""
                        ].filter(Boolean).join(" ")}
                    >
                        <div className="serenta-nav-main">
                            <NavLink
                                exact
                                to="/"
                                className="serenta-nav-link"
                                activeClassName="serenta-nav-link--active"
                                onClick={this.closeMenu}
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/find-rent"
                                className="serenta-nav-link"
                                activeClassName="serenta-nav-link--active"
                                onClick={this.closeMenu}
                            >
                                Find a Rental
                            </NavLink>

                            <NavLink
                                to="/about"
                                className="serenta-nav-link"
                                activeClassName="serenta-nav-link--active"
                                onClick={this.closeMenu}
                            >
                                About Us
                            </NavLink>
                        </div>

                        <div className="serenta-nav-actions">
                            {this.renderAuthLinks()}

                            <NavLink
                                to="/post-ad"
                                className="serenta-post-button"
                                activeClassName="serenta-post-button--active"
                                onClick={this.closeMenu}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M12 5v14M5 12h14" />
                                </svg>

                                <span>Post an Ad</span>
                            </NavLink>
                        </div>
                    </div>
                </nav>

                {menuOpen && (
                    <button
                        type="button"
                        className="serenta-menu-backdrop"
                        onClick={this.closeMenu}
                        aria-label="Close navigation menu"
                        tabIndex={-1}
                    />
                )}
            </header>
        );
    }
}

export default withRouter(Header);
