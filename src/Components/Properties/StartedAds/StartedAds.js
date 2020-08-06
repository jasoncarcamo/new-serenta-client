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
                    <p>You have not created an ad listing</p>
                </>
            );
        };

        ads = ads.map((ad, index)=>{
            if((ad.posted === false) && (ad.posted !== undefined)){
                return <StartedAd key={index} ad={ad} history={this.props.history}></StartedAd>;
            };
        });

        return ads;
    };

    render(){
        console.log(this.context);
        return (
            <section id="property-listings"> 
                {this.renderUserStartedAds()}
            </section>
        );
    };
};