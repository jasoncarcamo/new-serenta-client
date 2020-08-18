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

        // sets current ad to this ad for editing
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

    renderEditAdButton = ()=>{
        return <button type="button" onClick={this.toPostAd} className="started-ad-listing-buttons">Edit</button>
    }

    renderListAdButton = ()=>{
        return <button onClick={this.toPostAd} className="started-ad-listing-buttons">List ad</button>;
    }

    renderRemoveAdButton = ()=>{
        return <button type="button" onClick={this.handleRemove} className="started-ad-listing-buttons">Remove ad</button>;
    }

    render(){
        return (
            <section className="started-ad-listing">
                <div className="started-ad-listing-first-section">
                    <div className="started-ad-listing-address-container">
                        <p>{this.props.ad.street_address}, {this.props.ad.city}, {this.props.ad.state}, {this.props.ad.zip_code}</p>
                    </div>
                    
                    <div className="started-ad-listing-buttons-container">
                        {!this.state.cancel && (!this.state.cancelSuccess) && (!this.props.ad.posted) ? this.renderListAdButton() : ""}
                        {!this.state.cancel && (!this.state.cancelSuccess) && (this.props.ad.posted) ? this.renderEditAdButton() : ""}
                        {!this.state.cancel && (!this.state.cancelSuccess) ? this.renderRemoveAdButton() : "" }
                        {this.state.cancel && (!this.state.cancelSuccess) ? this.renderCancelOptions() : ""}
                        {this.state.cancelSuccess ? this.renderRemoveSuccess() : ""}
                    </div>
                </div>

                <div>
                    <p><span>Monthly price:</span> {this.props.ad.price}</p>
                </div>     

                <div>
                    <p><span>Comments from lister:</span> {this.props.ad.comments}</p>
                </div>            
            </section>
        )
    }
}