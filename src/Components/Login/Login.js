import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
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
                this.props.history.push("/user");
            })
            .catch( err => console.log(err))
    }

    render(){

        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Log in to your account</h2>
                        </legend>

                        <label htmlFor="login-email">Email:</label>
                        <input
                            id="login-email"
                            type="text"
                            onChange={this.handleTextInput}
                            value={this.state.email}
                            name="email"></input>

                        <label htmlFor="login-password">Password:</label>
                        <input
                            id="login-password"
                            type="password"
                            onChange={this.handleTextInput}
                            value={this.state.password}
                            name="password"></input>

                        <button type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}