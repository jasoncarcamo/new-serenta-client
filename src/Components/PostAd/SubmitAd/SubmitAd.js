import React from "react";
import PostContextAd from "../../../Contexts/PostAdContext/PostAdContext";
import UserToken from "../../../Services/UserToken/UserToken";
import "./SubmitAd.css";

export default class SubmitAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            success: false,
            message: "",
            error: ""
        };
    };

    static contextType = PostContextAd;

    handleForm =  (e)=>{
        e.preventDefault();

        this.setState({
            message: "",
            success: false,
            error: ""
        });

        if(this.context.ad.posted == true){
            this.setPatchMessage();
        } else if(this.context.ad.posted === false){
            this.setPostMessage();
        };

        // sets ad to posted 
        this.context.toggleAdPosted(true);

        this.context.handlePatchAd()
            .then( resData => {

                this.context.addAd(this.context.ad);
                console.log(resData);
                this.setState({
                    success: true
                });
                
                this.context.setAdDefault();
            })
            .catch(err => {
                console.log(err);

                // sets ad to not post if we get a failed request
                this.context.toggleAdPosted(false);

                this.setState({
                    success: false,
                    message: "",
                    error: err.error
                });
            });
    };

    goToProperties = ()=>{
        this.props.history.push("/properties");
    };

    handleConfirm = ()=>{ 
        this.goToProperties();
    };

    renderAdPostedSuccess = ()=>{
        return (
            <div id="post-ad-success-container">
                <p id="post-ad-success-message">{this.state.message}</p>
                <button id="post-ad-success-button" type="button" onClick={this.handleConfirm}>Ok</button>
            </div>
        );
    };

    setPatchMessage = ()=>{
        this.setState({
            message: "Your ad has been updated!"
        });
    }

    setPostMessage = ()=>{
        this.setState({
            message: "Your ad has been posted!"
        });
    }

    renderUpdateAdButton = ()=>{

        return <button type="button" onClick={this.handleForm}>Update Ad</button>
    }

    renderPostAdButton = ()=>{

        return <button type="button" onClick={this.handleForm}>Post Ad</button>;
    };

    render(){
        return (
            <>
                {this.state.success === true ? this.renderAdPostedSuccess() : ""}
                {this.context.ad.posted === true && this.state.success === false ? this.renderUpdateAdButton() : ""}
                {this.context.ad.posted === false &&  this.state.success === false ? this.renderPostAdButton() : ""}
            </>
        )
    };
}