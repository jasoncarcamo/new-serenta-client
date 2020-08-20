import React from "react";
import "./Login.css";
import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Contexts/AppContext/AppContext";
import { Link } from "react-router-dom";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    static contextType = AppContext;

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toSignUp = ()=>{
        this.props.history.push("/signup");
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData)
                UserToken.setToken(resData.token);

                this.context.userContext.handleLogIn();
                
                this.props.history.push("/user");
            })
            .catch( err => this.setState({
                error: err.error
            }))
    }

    render(){

        return (
            <section id="login-section">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <fieldset id="login-fieldset">
                        <legend id="login-legend">
                            <h3>Log in to your account</h3>
                        </legend>

                        <label className="login-label" htmlFor="login-email">Email:</label>
                        <input
                            id="login-email"
                            type="text"
                            onChange={this.handleTextInput}
                            value={this.state.email}
                            name="email"
                            required></input>

                        <label className="login-label" htmlFor="login-password">Password:</label>
                        <input
                            id="login-password"
                            type="password"
                            onChange={this.handleTextInput}
                            value={this.state.password}
                            name="password"
                            required></input>
                        <p className="login-user-helpers">Forgot you password?</p>
                        {this.state.error ? <p id="login-error">{this.state.error}</p> : ""}

                        <button id="login-submit" type="submit">Log In</button>
                        <p id="login-to-signup" id="to-signup" className="login-user-helpers">Need an account? <Link to="/signup">Sign Up</Link></p>
                    </fieldset>
                </form>
            </section>
        )
    }
}