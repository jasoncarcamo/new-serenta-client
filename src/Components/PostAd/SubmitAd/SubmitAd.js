import React from "react";
import PostContextAd from "../../../Contexts/PostAdContext/PostAdContext";
import UserToken from "../../../Services/UserToken/UserToken";

export default class SUbmitAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            success: false,
            error: ""
        };
    };

    static contextType = PostContextAd;

    handleForm =  (e)=>{
        e.preventDefault();

        this.setState({
            success: false,
            error: ""
        });

        // sets ad to posted 
        this.context.toggleAdPosted(true);

        this.context.handleAdSubmit()
            .then( resData => {

                this.context.addAd(this.context.ad);
                console.log(resData);
                this.setState({
                    success: true
                });
                //this.context.setAdDefault();
            })
            .catch(err => {
                console.log(err);

                // sets ad to not post if we get a failed request
                this.context.toggleAdPosted(false);

                this.setState({
                    success: false,
                    error: err.error
                });
            });
    };

    goToProperties = ()=>{
        this.props.history.push("/properties");
    };

    handleConfirm = ()=>{
        this.context.setAdDefault();  
        this.goToProperties();
    };

    renderAdPostedSuccess = ()=>{
        return (
            <div>
                <p>Your ad has been posted!</p>
                <button type="button" onClick={this.handleConfirm}>Ok</button>
            </div>
        );
    };

    renderPostAdButton = ()=>{
        return <button type="button" onClick={this.handleForm}>Post Ad</button>;
    };

    render(){
        return (
            <>
                {this.state.success === true ? this.renderAdPostedSuccess() : this.renderPostAdButton()}
            </>
        )
    };
}