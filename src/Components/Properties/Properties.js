import React from "react";
import "./Properties.css";
import PostAdContext from "../../Contexts/PostAdContext/PostAdContext";
import AdListing from "./AdListing/AdListing";
import StartedAds from "./StartedAds/StartedAds";

export default class Properties extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    static contextType = PostAdContext;

    adListing = ()=>{
        this.context.setAdDefault();
        this.context.toggleAdListing();
    };

    render(){
        console.log(this.context);
        return (
            <section id="properties-section">
                <div id="properties-section-header-container">
                    <h2>Properties</h2>

                    <button id="properties-section-container-button" onClick={this.adListing}><span>+</span> Add a property</button>
                </div>

                {this.context.adListing ? <AdListing history={this.props.history}/> : ""}

                <StartedAds history={this.props.history}/>
            </section>
        );
    };
};