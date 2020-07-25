import React from "react";
import "./Header.css";

export default class Header extends React.Component{
    render(){
        return (
            <header id="header-container">
                
                <nav id="nav-container">
                    <ul id="nav-list">
                        <li className="nav-link"><a>Icon</a></li>
                        <li className="nav-link"><a>Rent</a></li>
                        <li className="nav-link"><a>Post Ad</a></li>
                        <li className="nav-link"><a>Log In</a></li>
                        <li className="nav-link"><a>About</a></li>
                        <li className="nav-link"><a>Sign up</a></li>
                    </ul>
                </nav>
            </header>
        );
    };
};