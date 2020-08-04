import React from "react";
import PostContextAd from "../../../Contexts/PostAdContext/PostAdContext";
import UserToken from "../../../Services/UserToken/UserToken";

export default class SUbmitAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ""
        };
    };

    static contextType = PostContextAd;

    handleForm =  (e)=>{
        e.preventDefault();
        console.log(this.context.ad)
        fetch(`http://localhost:8000/api/living-space`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify(this.context.ad)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.error
                })
            })
    }

    render(){
        return (
            <>
                <button type="button" onClick={this.handleForm}>Post Ad</button>
            </>
        )
    }
}