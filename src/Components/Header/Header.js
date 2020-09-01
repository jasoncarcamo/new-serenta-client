import React from "react";
import "./Header.css";
import "./hamburger.css";
import UserToken from "../../Services/UserToken/UserToken";
import {NavLink, } from "react-router-dom";
import Logo from "../../assets/SvgImages/logo.svg"
import AppContext from "../../Contexts/AppContext/AppContext";

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screenWidth: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        this.lockNavlistTouchmove();
        this.lockNavListScroll();
    }

    screenWidthHandler = ()=>{
        window.addEventListener("resize", (e)=>{
            this.setState({
                screenWidth: window.innerWidth
            });
        })
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
                <li className="nav-link" onClick={this.mobileNavMenuHandler}><NavLink to="/login">Log In</NavLink></li>
                <li className="nav-link" onClick={this.mobileNavMenuHandler}><NavLink to="/signup">Sign up</NavLink></li>
            </>
        )
    }

    handleSignOut = ()=>{
        
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

        window.addEventListener("scroll", (e)=>{
            if(this.state.screenWidth <= 1030){
                if(navList.classList.contains("display-nav-list")){
                    e.preventDefault();
                };
            };
        });
    };

    lockNavlistTouchmove = ()=>{
        const navList = document.getElementById("nav-list");

        window.addEventListener("touchmove", (e)=>{
            e.preventDefault();
        });
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
                        <li className="nav-link" onClick={this.mobileNavMenuHandler}><NavLink to="/"><img src={Logo} alt="Serenta logo"></img></NavLink></li>

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
                                to="post-ad" 
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