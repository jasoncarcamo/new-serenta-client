import React from "react";
import "./StartedAd.css";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";
import AppContext from "../../../../Contexts/AppContext/AppContext";
import Map from "./Map/Map";

export default class StartedAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cancel: false,
            cancelSuccess: false,
            error: ""
        }
    }

    static contextType = AppContext;

    finish = ()=>{
        this.setState({
            cancel: false,
            cancelSuccess: false,
            error: ""
        });
    }

    setAdContext = ()=>{
        this.context.postAdContext.setCurrentAd(this.props.ad);
    };

    toPostAd = ()=>{

        // sets current ad to this ad for editing
        this.context.postAdContext.setCurrentAd(this.props.ad);

        // sets index of current ad
        this.context.postAdContext.setAdIndex(this.props.index);

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

        this.context.postAdContext.removeStartedAd(this.props.ad)
            .then( resData => {

                //removes ad upon success
                this.context.postAdContext.deleteAd(this.props.index);

                this.context.postAdContext.resetState();
                
                // sets state properties to show success message
                this.setState({
                    cancel: false,
                    cancelSuccess: true
                });

                const button = document.getElementById("ad-listing-cancel-success-button");

                button.scrollIntoView({behavior: "smooth"});

            })
            .catch( err => {
                this.setState({
                    cancel: false,
                    error: err.error
                });
            });
    }

    handleAdSuccess = ()=>{
        this.context.userContext.removeFromAds(this.props.ad);
        
        this.finish();

    }

    renderRemoveSuccess = ()=>{
        return (
            <div id="ad-listing-cancel-success-container">
                <p id="ad-listing-cancel-success-message">Ad succesfully removed.</p>

                <button id="ad-listing-cancel-success-button" type="button" onClick={this.handleAdSuccess}>Ok</button>
            </div>
        );
    }

    renderCancelOptions = ()=>{
        return (
            <div id="ad-listing-cancel-options">
                <p id="ad-listing-cancel-options-confirm-message">Are you sure?</p>

                <div>
                    <button type="button" onClick={this.handleRemoveAd}>Yes</button>
                    <button type="button" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    };

    renderEditAdButton = ()=>{
        return <button type="button" onClick={this.toPostAd} className="started-ad-listing-buttons">Edit</button>
    }

    renderListAdButton = ()=>{
        return <button onClick={this.toPostAd} className="started-ad-listing-buttons">Post ad</button>;
    }

    renderRemoveAdButton = ()=>{
        return <button type="button" onClick={this.handleRemove} className="started-ad-listing-buttons">Remove ad</button>;
    }

    render(){
        
        return (
            <section className="started-ad-listing">
                <div className="started-ad-listing-first-section">
                    <div className="started-ad-listing-address-container">
                        <Map lat={Number(this.props.ad.lat)} lng={Number(this.props.ad.lng)}/>
                    </div>
                </div>

                <p>{this.props.ad.street_address}, {this.props.ad.city}, {this.props.ad.state}, {this.props.ad.zip_code}</p>

                <div className="started-ad-listing-buttons-container">
                    {!this.state.cancel && (!this.state.cancelSuccess) && (!this.props.ad.posted) ? this.renderListAdButton() : ""}
                    {!this.state.cancel && (!this.state.cancelSuccess) && (this.props.ad.posted) ? this.renderEditAdButton() : ""}
                    {!this.state.cancel && (!this.state.cancelSuccess) ? this.renderRemoveAdButton() : "" }
                    {this.state.cancel && (!this.state.cancelSuccess) ? this.renderCancelOptions() : ""}
                    {this.state.cancelSuccess ? this.renderRemoveSuccess() : ""}
                </div>

                <div className="started-ad-listing-dates">
                    <p className="started-ad-listing-dates-label"><strong>Date created:</strong> {new Date(this.props.ad.date_created).toDateString()}</p>
                    <p className="started-ad-listing-dates-label"><strong>Last modified:</strong> { this.props.ad.date_last_modified !== null ? new Date(this.props.ad.date_last_modified).toDateString() : "Has not been modified yet"}</p>
                </div>     
        
            </section>
        );
    };
};