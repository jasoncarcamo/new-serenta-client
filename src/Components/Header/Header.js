import React from "react";
import "./Header.css";
import UserToken from "../../Services/UserToken/UserToken";
import {NavLink, } from "react-router-dom";
import Logo from "../../Assets/SvgImages/logo.svg"
import AppContext from "../../Contexts/AppContext/AppContext";

export default class Header extends React.Component{

    static contextType = AppContext;

    renderLoggedLinks = () => {
        if(UserToken.hasToken()){
            return (
                <>
                    <li className="nav-link"><NavLink to="/properties">Properties</NavLink></li>
                    <li className="nav-link"><NavLink to="/messages">Messages</NavLink></li>
                    <li className="nav-link"><NavLink to="/" onClick={this.handleSignOut}>Sign Out</NavLink></li>
                </>
            )
        }

        return (
            <>
                <li className="nav-link"><NavLink to="/login">Log In</NavLink></li>
                <li className="nav-link"><NavLink to="/register">Sign up</NavLink></li>
            </>
        )
    }

    handleSignOut = ()=>{
        
        this.context.userContext.resetState();
        this.context.postAdContext.resetState();
        
        UserToken.removeToken();
    }

    render(){
        return (
            <header id="header-container">
                
                <nav id="nav-container">
                    <ul id="nav-list">
                        <li className="nav-link"><NavLink to="/"><img src={Logo} alt="Serenta logo"></img></NavLink></li>

                        <li className="nav-link">
                            <NavLink 
                                to="/find-rent" 
                                activeStyle={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                        }}>Find Rent</NavLink></li>

                        <li className="nav-link">
                            <NavLink 
                                to="post-ad" 
                                activeStyle={{
                                backgroundColor: "black",
                                color: "white",
                                fontWeight: "bold"
                        }}>Post Ad</NavLink></li>

                        <li className="nav-link">
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