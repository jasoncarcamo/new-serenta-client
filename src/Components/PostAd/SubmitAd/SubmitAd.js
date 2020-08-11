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

        this.context.handleAdSubmit()
            .then( resData => {

                this.context.addAd(this.context.ad);
                console.log(resData);
                //this.context.setAdDefault();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: err.error
                })
            })
    }

    render(){
        return <button type="button" onClick={this.handleForm}>Post Ad</button>;
    }
}