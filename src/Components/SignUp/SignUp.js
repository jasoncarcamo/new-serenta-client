import React from "react";
import "./SignUp.css";
import UserToken from "../../Services/UserToken/UserToken";
import { Link } from "react-router-dom";

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    }

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkRequirement = (e)=>{
        if(e.target.value === "" || !(e.target.value)){
            e.target.classList.add("login-missing-input");
        } else{
            e.target.classList.remove("login-missing-input");
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        this.setState({
            error: ""
        })

        this.interateRequiremnts();

        fetch(`http://localhost:8000/api/register`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                mobile_number: this.state.mobile_number,
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
                this.props.history.push("/user");
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    error: err.error
                });
            });
    }

    interateRequiremnts = ()=>{
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name");
        const missingInput = document.querySelector(".signup-missing-input");

        if(!this.state.first_name){
            first_name.classList.add("signup-missing-input");
            console.log(missingInput);
            missingInput.scrollIntoView();
        } else{
            first_name.classList.remove("signup-missing-input");
        };

        if(!this.state.last_name){
            last_name.classList.add("signup-missing-input");
            console.log(missingInput);
            missingInput.scrollIntoView();
        } else{
            last_name.classList.remove("signup-missing-input");
        };
    }
    
    render(){
        console.log(this.state);
        return (
            <section id="signup-section">
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <fieldset id='signup-fieldset'>
                        <legend id="signup-legend">
                            <h3>Sign up</h3>
                        </legend>

                        <label className="signup-label" htmlFor="first_name">First name:</label>
                            <input 
                                id="first_name"
                                className="signup-input"
                                type="text"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.first_name}
                                name="first_name"
                                required></input>

                            <label className="signup-label" htmlFor="last_name">Last name:</label>
                            <input
                                id="last_name"
                                className="signup-input"
                                type="text"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.last_name}
                                name="last_name"
                                required></input>

                            <label className="signup-label" htmlFor="mobile_number">Mobile number:</label>
                            <input
                                id="mobile_number"
                                className="signup-input"
                                type="text"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.mobile_number}
                                name="mobile_number"
                                required></input>

                            <label className="signup-label" htmlFor="sign-up-email">Email:</label>
                            <input
                                id="sign-up-email"
                                className="signup-input"
                                type="text"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.email}
                                name="email"
                                required></input>

                            <label className="signup-label" htmlFor="sign-sup-password">Password:</label>
                            <input
                                id="sign-up-password"
                                className="signup-input"
                                type="password"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.password}
                                name="password"
                                required></input>

                            <label className="signup-label" htmlFor="confirm-password">Confirm password:</label>
                            <input 
                                id="confirm-password"
                                className="signup-input"
                                type="password"
                                onChange={this.handleTextInput}
                                onBlur={this.checkRequirement}
                                value={this.state.confirm_password}
                                name="confirm_password"
                                required></input>

                            <p id="login-error">{this.state.error ? this.state.error : ""}</p>

                            <button id="signup-submit" type="submit">Sign up</button>
                            <Link to="/login" className="signup-user-helpers">Already have an account?</Link>
                    </fieldset>
                </form>
            </section>
        );
    };
};