import React from "react";
import "./StartedAd.css";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class StartedAd extends React.Component{

    static contextType = PostAdContext;

    renderUserStartedAds = ()=>{
        let ads = this.context.ads;
        
    }

    setAdContext = ()=>{
        this.context.setCurrentAd(this.props.ad);

        this.toPostAd();
    }

    toPostAd = ()=>{
        this.props.history.push("/post-ad");
    };

    render(){
        return (
            <section className="started-ad-listing">
                <h4>{this.props.ad.street_address}</h4>

                <button onClick={this.setAdContext}>List ad</button>
            </section>
        )
    }
}