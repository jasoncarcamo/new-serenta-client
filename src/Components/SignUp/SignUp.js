import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

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
            email: ""
        }
    }

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();

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
            .catch( err => console.log(err));
    }
    
    render(){
        console.log(this.state);
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Sign up today!</h2>

                            <label htmlFor="first_name">First name:</label>
                            <input 
                                id="first_name"
                                type="text"
                                onChange={this.handleTextInput}
                                value={this.state.first_name}
                                name="first_name"></input>

                            <label htmlFor="last_name">Last name:</label>
                            <input
                                id="last_name"
                                type="text"
                                onChange={this.handleTextInput}
                                value={this.state.last_name}
                                name="last_name"></input>

                            <label htmlFor="mobile_number">Mobile number:</label>
                            <input
                                id="mobile_number"
                                type="text"
                                onChange={this.handleTextInput}
                                value={this.state.mobile_number}
                                name="mobile_number"></input>

                            <label htmlFor="sign-up-email">Email:</label>
                            <input
                                id="sign-up-email"
                                type="text"
                                onChange={this.handleTextInput}
                                value={this.state.email}
                                name="email"></input>

                            <label htmlFor="sign-sup-password">Password:</label>
                            <input
                                id="sign-up-password"
                                type="password"
                                onChange={this.handleTextInput}
                                value={this.state.password}
                                name="password"></input>

                            <label htmlFor="confirm-password">Confirm password:</label>
                            <input 
                                id="confirm-password"
                                type="password"
                                onChange={this.handleTextInput}
                                value={this.state.confirm_password}
                                name="confirm_password"></input>

                            <button type="submit">Sign up</button>
                        </legend>
                    </fieldset>
                </form>
            </section>
        );
    };
};