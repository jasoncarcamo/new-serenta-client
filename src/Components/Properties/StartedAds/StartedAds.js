import React from "react";
import "./StartedAds.css";
import UserContext from "../../../Contexts/UserContext/UserContext";
import StartedAd from "./StartedAd/StartedAd";

export default class StartedAds extends React.Component{

    static contextType = UserContext;

    renderUserStartedAds = ()=>{
        let ads = this.context.ads;

        if(ads.length === 0){
            return (
                <>
                    <p className="property-listings-no-ads-message">You have not created an ad listing</p>
                </>
            );
        };

        ads = ads.map((ad, index)=>{
            console.log(ad)
            return <StartedAd key={index} index={index} ad={ad} history={this.props.history} userContext={this.context}></StartedAd>;
        });

        return ads;
    };

    render(){
        
        return (
            <section id="property-listings"> 
                {this.renderUserStartedAds()}
            </section>
        );
    };
};