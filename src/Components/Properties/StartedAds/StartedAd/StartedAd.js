import React from "react";
import "./StartedAd.css";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class StartedAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cancel: false,
            cancelSuccess: false
        }
    }

    static contextType = PostAdContext;

    finish = ()=>[
        this.setState({
            cancel: false,
            cancelSuccess: false,
            error: ""
        })
    ]

    setAdContext = ()=>{
        this.context.setCurrentAd(this.props.ad);
    };

    toPostAd = ()=>{
        this.context.setCurrentAd(this.props.ad);
        this.props.history.push("/post-ad");
    };

    handleCancel = ()=>{
        this.setState({
            cancel: false
        }); 
    }

    handleRemove = ()=>{
        this.setState({
            cancel: true
        });

        this.setAdContext();
    }

    handleRemoveAd = ()=>{

        this.context.removeStartedAd(this.props.ad)
            .then( resData => {
                
                this.setState({
                    cancel: false,
                    cancelSuccess: true
                });

            })
            .catch( err => {
                this.setState({
                    cancel: false,
                    error: err.error
                });
            });
    }

    handleAdSuccess = ()=>{
        this.context.handleAdSuccess();
        this.props.userContext.refresh()
            .then( refreshed => {
                if(refreshed === true){
                    this.finish();
                };
            });
    }

    renderRemoveSuccess = ()=>{
        return (
            <div>
                <p>This ad own been succesfully removed.</p>

                <button type="button" onClick={this.handleAdSuccess}>Ok</button>
            </div>
        );
    }

    renderCancelOptions = ()=>{
        return (
            <div id="ad-listing-cancel-options">
                <p>Are you sure?</p>

                <div>
                    <button type="button" onClick={this.handleRemoveAd}>Yes</button>
                    <button type="button" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    };

    renderListAdButton = ()=>{
        return <button onClick={this.toPostAd}>List ad</button>;
    }

    renderRemoveAdButton = ()=>{
        return <button type="button" onClick={this.handleRemove}>Remove ad</button>;
    }

    render(){
        return (
            <section className="started-ad-listing">
                <h4>{this.props.ad.street_address}</h4>

                {!this.state.cancel && (!this.state.cancelSuccess) ? this.renderListAdButton() : ""}
                {!this.state.cancel && (!this.state.cancelSuccess) ? this.renderRemoveAdButton() : "" }
                {this.state.cancel && (!this.state.cancelSuccess) ? this.renderCancelOptions() : ""}
                {this.state.cancelSuccess ? this.renderRemoveSuccess() : ""}
            
            </section>
        )
    }
}