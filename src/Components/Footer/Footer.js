
import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/SvgImages/logo.svg";
import UserToken from "../../Services/UserToken/UserToken";

import "./Footer.css";

export default class Footer extends React.Component {
    renderAccountLinks = () => {
        if (UserToken.hasToken()) {
            return (
                <li>
                    <Link to="/properties">
                        My Properties
                    </Link>
                </li>
            );
        }

        return (
            <>
                <li>
                    <Link to="/login">
                        Log In
                    </Link>
                </li>

                <li>
                    <Link to="/signup">
                        Create an Account
                    </Link>
                </li>
            </>
        );
    };

    render() {
        const currentYear = new Date().getFullYear();

        return (
            <footer
                className="serenta-footer"
                aria-label="Site footer"
            >
                <div className="serenta-footer-main">
                    <div className="serenta-footer-container">
                        <div className="serenta-footer-grid">
                            <div className="serenta-footer-brand">
                                <Link
                                    to="/"
                                    className="serenta-footer-logo-link"
                                    aria-label="Serenta home"
                                >
                                    <img
                                        src={Logo}
                                        alt="Serenta"
                                        className="serenta-footer-logo"
                                    />
                                </Link>

                                <p className="serenta-footer-description">
                                    Connecting renters and property
                                    owners through a simpler way to
                                    discover and share rental
                                    opportunities.
                                </p>

                                <span className="serenta-footer-tagline">
                                    Find a place. Make a connection.
                                </span>
                            </div>

                            <nav
                                className="serenta-footer-column"
                                aria-label="Explore Serenta"
                            >
                                <h2>Explore</h2>

                                <ul>
                                    <li>
                                        <Link to="/">
                                            Home
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/find-rent">
                                            Find a Rental
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/post-ad">
                                            Post an Ad
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/about">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav
                                className="serenta-footer-column"
                                aria-label="Account navigation"
                            >
                                <h2>Your Account</h2>

                                <ul>
                                    {this.renderAccountLinks()}
                                </ul>
                            </nav>

                            <div className="serenta-footer-cta">
                                <h2>Have a property to share?</h2>

                                <p>
                                    Reach people searching for their
                                    next rental by creating a property
                                    advertisement on Serenta.
                                </p>

                                <Link
                                    to="/post-ad"
                                    className="serenta-footer-cta-button"
                                >
                                    Post Your Property

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 6 6 6-6 6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="serenta-footer-bottom">
                    <div className="serenta-footer-container">
                        <div className="serenta-footer-bottom-inner">
                            <p>
                                © {currentYear} Serenta.
                                All rights reserved.
                            </p>

                            <p className="serenta-footer-bottom-message">
                                Bringing people and places together.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
