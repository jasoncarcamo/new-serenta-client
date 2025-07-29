import React from "react";
import "./Header.css";
import "./hamburger.css";
import UserToken from "../../Services/UserToken/UserToken";
import {NavLink, } from "react-router-dom";
import Logo from "../../Assets/SvgImages/logo.svg"
import AppContext from "../../Contexts/AppContext/AppContext";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screenWidth: window.innerWidth
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        this.lockNavlistTouchmove();
        this.lockNavListScroll();
        this.screenWidthHandler();
    }

    screenWidthHandler = ()=>{
        window.addEventListener("resize", (e)=>{
            this.setState({
                screenWidth: window.innerWidth
            });
        }, {passive: false})
    }

    renderLoggedLinks = () => {
        if(UserToken.hasToken()){
            return (
                <>
                    <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                        <NavLink 
                            to="/properties"
                            activeStyle={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                        }}>Properties</NavLink>
                    </li>
                    <li className="nav-link" onClick={this.mobileNavMenuHandler}><NavLink to="/" onClick={this.handleSignOut}>Sign Out</NavLink></li>
                </>
            )
        }

        return (
            <>
                <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                    <NavLink 
                        to="/login" 
                        activeStyle={{
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: "bold"
                    }}>Log In</NavLink>
                </li>
                <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                    <NavLink 
                        to="/signup"
                        activeStyle={{
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: "bold"
                    }}>Sign up</NavLink>
                </li>
            </>
        )
    }

    handleSignOut = ()=>{
        
        // sets states to default upon sign out
        this.context.userContext.resetState();
        this.context.postAdContext.resetState();
        
        UserToken.removeToken();
    }

    mobileNavMenuHandler = ()=>{
        const navBurger = document.getElementById("nav-burger");
        const navList = document.getElementById("nav-list");

        if(this.state.screenWidth > 1030){
            return;
        };

        navList.classList.toggle("display-nav-list");
            
        navBurger.classList.toggle("is-active");
    }

    lockNavListScroll = ()=>{
        const navList = document.getElementById("nav-list");

        
    };

    lockNavlistTouchmove = ()=>{
        const navList = document.getElementById("nav-list");
    };

    render(){
        return (
            <header id="header-container">
                
                <nav id="nav-container">

                    <button id="nav-burger" className="hamburger hamburger--collapse" type="button" onClick={this.mobileNavMenuHandler}>
                        <span className="hamburger-box" >
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>

                    <ul id="nav-list">
                        <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                            <NavLink 
                                exact to="/"
                                activeStyle={{
                                    backgroundColor: "black",
                                    color: "white",
                                    fontWeight: "bold"
                                }}>
                                <img src={Logo} alt="Serenta logo"></img>
                            </NavLink></li>

                        <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                            <NavLink 
                                to="/find-rent" 
                                activeStyle={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                        }}>Find Rent</NavLink></li>

                        <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                            <NavLink 
                                to="/post-ad" 
                                activeStyle={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                        }}>Post Ad</NavLink></li>

                        <li className="nav-link" onClick={this.mobileNavMenuHandler}>
                            <NavLink 
                                to="/about"
                                activeStyle={{
                                    backgroundColor: "black",
                                    color: "white",
                                    fontWeight: "bold"
                        }}>About</NavLink></li>
                        {this.renderLoggedLinks()}
                    </ul>
                </nav>
            </header>
        );
    };
};