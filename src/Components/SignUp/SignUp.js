import React from "react";
import "./SignUp.css";
import UserToken from "../../Services/UserToken/UserToken";
import { Link } from "react-router-dom";
import ReactLoadingIcon from "../ReactLoadingIcon/ReactLoadingIcon";
import InputContainer from "./InputContainer/InputContainer";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

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
            passwordMatches: false,
            loading: false,
            currentInput: "",
            currentInputIndex: 0,
            inputMax: 6,
            userInputs: [],
            error: ""
        }
    }

    componentDidMount(){
    }

    passwordMatches = ()=>{
        if(this.state.password === this.state.confirm_password){
            return true;
        } else{
            return false;
        }
    }

    passwordMatchColor = ()=>{

        if(this.state.password === this.state.confirm_password){

            return "green";

        } else if(this.state.confirm_password.length > 0){
            return "red";
        };

        return "grey"
        
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
            this.setState({
                error: ""
            });

            return;
        };

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

                this.props.history.push("/properties");
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    loading: false
                });
            });
    }

    interateRequiremnts = ()=>{
        let inputs = this.allInputs();

        for(let i = 0; i < inputs.length; i++){
            const inputName = inputs[i].inputName;

            if(this.state.currentInputIndex === i && !this.state[inputName]){
                this.setState({
                    error: `Missing ${inputName.split("_").join(" ")}`
                });

                return false;
            }
        };

        return true;
    };

    handleBackButton = ()=>{
        let currentInputIndex = this.state.currentInputIndex;

        currentInputIndex--;

        if(currentInputIndex < 0){{
            currentInputIndex = 0;
        }};

        this.setState({
            currentInputIndex
        });

        this.unAnimate(currentInputIndex);
    }

    handleNextButton = ()=>{
        let currentInputIndex = this.state.currentInputIndex;
        let originalIndex = currentInputIndex;

        currentInputIndex++;

        if(currentInputIndex > 5){{
            currentInputIndex = 5;
        }};

        if(!this.interateRequiremnts()){
            return;
        };

        this.setState({
            currentInputIndex
        });

        this.animateInput(currentInputIndex);
    }

    renderButtons = (currentInputIndex)=>{
        return (
            <div id="signup-btns-container">
                {currentInputIndex > 0 && !this.state.loading ? <button onClick={this.handleBackButton}>Back</button> : ""}
                {currentInputIndex >= 0 && currentInputIndex < 5 ? <button onClick={this.handleNextButton}>Next</button> : ""}
                {currentInputIndex === 5 ? !this.state.loading ? <button id="signup-submit" type="button" style={{ opacity: this.passwordMatches() ? 1 : .2, cursor: this.passwordMatches() ? "pointer" : "default"}} onClick={ this.passwordMatches() ? this.handleSubmit : ()=>{}}>Sign up</button> : <ReactLoadingIcon/> : ""}
            </div>
        )
    }  
    
    allInputs = (currentInputIndex)=>{
        let userInputs = [
            {
                inputName: "first_name",
                input: <div className="signup-input-container animate-input-container">
                <label className="signup-label" htmlFor="first_name">First name <span className="signup-astrick">*</span></label>
                    <input 
                        id="first_name"
                        className="signup-input"
                        type="text"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.first_name}
                        name="first_name"></input>
                </div>
            }
        ,
            {
                inputName: "last_name",
                input: <div className="signup-input-container">
                <label className="signup-label" htmlFor="last_name">Last name <span className="signup-astrick">*</span></label>
                    <input
                        id="last_name"
                        className="signup-input"
                        type="text"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.last_name}
                        name="last_name"></input>
                </div>
            }
        ,
            {
                inputName: "email",
                input: <div className="signup-input-container">
                <label className="signup-label" htmlFor="sign-up-email">Email <span className="signup-astrick">*</span></label>
                    <input
                        id="sign-up-email"
                        className="signup-input"
                        type="text"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.email}
                        name="email"></input>
                </div>
            }
        ,
            {
                inputName: "mobile_number",
                input: <div className="signup-input-container">
                <label className="signup-label" htmlFor="mobile_number">Mobile number <span className="signup-astrick">*</span></label>
                    <input
                        id="mobile_number"
                        className="signup-input"
                        type="text"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.mobile_number}
                        name="mobile_number"></input>
                </div>
            }
        ,
            {
                inputName: "password",
                input: <div className="signup-input-container">
                <label className="signup-label" htmlFor="sign-up-password">Password <span className="signup-astrick">*</span></label>
                    <input
                        id="sign-up-password"
                        className="signup-input"
                        type="password"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.password}
                        name="password"></input>
                    <ul id="password-confirm-box">
                        {this.validatePassword(this.state.password)}
                    </ul>
                </div>
            }
        ,
            {
                inputName: "confirm_password",
                input: <div className="signup-input-container">
                <label className="signup-label" htmlFor="confirm-password">Confirm password <span className="signup-astrick">*</span></label>
                    <input 
                        id="confirm-password"
                        className="signup-input"
                        type="password"
                        placeholder="Retype password"
                        onChange={this.handleTextInput}
                        onBlur={this.checkRequirement}
                        value={"" || this.state.confirm_password}
                        name="confirm_password"></input>
                    <div 
                        id="password-matches"
                        style={{
                            backgroundColor: this.passwordMatchColor()
                        }}></div>
                </div>
            }
        ];

        return userInputs;
    }

    renderInput = (currentInputIndex)=>{
        let inputs = this.allInputs(currentInputIndex);

        inputs = inputs.map((input, i)=>{
            return input.input;
        });

        return inputs;
    }

    cancelForm = (e)=>{
        e.preventDefault();
    }

    animateInput = (currentInputIndex)=>{
        const allInputs = document.getElementsByClassName("signup-input-container");

        if(allInputs.length === 0){
            return;
        };

        for(let i = 0; i < allInputs.length; i++){
            allInputs[i].classList.remove("animate-input-container");
            allInputs[i].classList.remove("unanimate-input-container");


            if(currentInputIndex === i){
                allInputs[i].classList.add("animate-input-container");
            };
        };
    }

    unAnimate = (currentInputIndex)=>{
        const allInputs = document.getElementsByClassName("signup-input-container");

        if(allInputs.length === 0){
            return;
        };

        for(let i = 5; i >= 0; i--){

            allInputs[i].classList.remove("animate-input-container");
            allInputs[i].classList.remove("unanimate-input-container");

            if( i === currentInputIndex){
                allInputs[i].classList.add("unanimate-input-container");
            };
        };
    }
    
    render(){

        return (
            <section id="signup-section">
                <form id="signup-form" onSubmit={this.cancelForm}>
                    <fieldset id='signup-fieldset'>
                        <legend id="signup-legend">
                            <h3>Register and get started today!</h3>
                        </legend>


                        <div id="signup-inputs-container">
                            {this.renderInput(this.state.currentInputIndex)}

                            {this.state.error ? <p id="signup-error">{this.state.error}</p> : <p id="signup-error-sub">{""}</p>}

                            {this.renderButtons(this.state.currentInputIndex)}
                        </div>

                        <Link to="/login" className="signup-user-helpers">Already have an account?</Link>
                    </fieldset>
                </form>
            </section>
        );
    };
};