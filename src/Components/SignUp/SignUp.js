import React from "react";
import "./SignUp.css";
import UserToken from "../../Services/UserToken/UserToken";
import { Link } from "react-router-dom";
import ReactLoadingIcon from "../ReactLoadingIcon/ReactLoadingIcon";

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            email: "",
            password: "",
            confirm_password: "",
            loading: false,
            error: ""
        }
    }

    allInputs = ()=>{
        const inputs = [
            (
                <>
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
                        <div id="password-matches"></div>
                        {this.state.password && this.state.confirm_password ? this.passwordMatch() : ""}

                        {this.state.error ? <p id="signup-error">{this.state.error}</p> : <p id="signup-error-sub">{""}</p>}
                </>
            )
        ]
    }

    passwordMatch = ()=>{
        const div = document.getElementById("password-matches");

        
        if(this.state.password === this.state.confirm_password){
            div.style.backgroundColor = "green";

        } else{
            div.style.backgroundColor = "red";
        }
        
    };

    validatePassword = (password) => {
        
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/);

        const requirements = [ 
            <li key={0} className="reg_error">Password must be longer than 8 characters</li>,
            <li key={1} className="reg_error">Password must be less than 72 characters</li>,
            <li key={2} className="reg_error">Password must not start or end with empty spaces</li>,
            <li key={3} className="reg_error">Password must contain one upper case, lower case, number and special character</li>
        ]

        if(password.length > 1){
            if (password.length > 8) {
                requirements[0] = <li key={0} className="reg_error" style={{color: 'green'}}>Password must be longer than 8 characters</li>
              } else{
      
              }
      
              if (password.length < 72) {
                requirements[1] = <li key={1} className="reg_error" style={{color: 'green', }}>Password must be less than 72 characters</li>
              } else{
      
              };
      
              if (!password.startsWith(' ') || !password.endsWith(' ')) {
                requirements[2] = <li key={2} className="reg_error" style={{color: 'green'}}>Password must not start or end with empty spaces</li>
              } else{
                
              };
      
              if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
                  requirements[3] = <li key={3} className="reg_error" style={{color: 'gray'}}>Password must contain one upper case, lower case, number and special character</li>
              } else{
                  requirements[3] = <li key={3} className="reg_error" style={{color: 'green'}}>Password must contain one upper case, lower case, number and special character</li>
              };
        }
        
        return requirements
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

            this.setState({
                error: ""
            });
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        this.setState({
            error: "",
            loading: true
        })

        if(!this.interateRequiremnts()){
            return;
        }

        fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/register`, {
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
                UserToken.setToken(resData.token);

                this.setState({
                    loading: false
                });

                this.props.history.push("/user");
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    loading: false
                });
            });
    }

    interateRequiremnts = ()=>{
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name");
        const password = this.state.password;
        const confirmPassword = this.state.confirm_password;
        const confirmPasswordInput = document.getElementById("confirm-password");
        const missingInput = document.querySelector(".signup-missing-input");

        if(!this.state.first_name){
            first_name.classList.add("signup-missing-input");
            
            missingInput.scrollIntoView();

            return false;
        } else{
            first_name.classList.remove("signup-missing-input");
        };

        if(!this.state.last_name){
            last_name.classList.add("signup-missing-input");
            
            missingInput.scrollIntoView();

            return false;
        } else{
            last_name.classList.remove("signup-missing-input");
        };
        
        if(password !== confirmPassword){
            confirmPasswordInput.classList.add("signup-missing-input");

            this.setState({
                error: "Password confirmation does not match"
            });

            return false;
        } else{
            confirmPasswordInput.classList.remove("signup-missing-input");
        }

        return true;
    }
    
    render(){

        return (
            <section id="signup-section">
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <fieldset id='signup-fieldset'>
                        <legend id="signup-legend">
                            <h3>Register and get started today!</h3>
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
                            <ul id="password-confirm-box">
                                {this.validatePassword(this.state.password)}
                            </ul>

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
                            <div id="password-matches"></div>
                            
                            {this.state.password && this.state.confirm_password ? this.passwordMatch() : ""}

                            {this.state.error ? <p id="signup-error">{this.state.error}</p> : <p id="signup-error-sub">{""}</p>}

                            {!this.state.loading ? <button id="signup-submit" type="submit">Sign up</button> : <ReactLoadingIcon/>}
                            <Link to="/login" className="signup-user-helpers">Already have an account?</Link>
                    </fieldset>
                </form>
            </section>
        );
    };
};