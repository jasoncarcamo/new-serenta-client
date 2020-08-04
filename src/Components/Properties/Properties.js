import React from "react";
import "./Properties.css";
import PostAdContext from "../../Contexts/PostAdContext/PostAdContext";
import AdListing from "./AdListing/AdListing";

export default class Properties extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };

    static contextType = PostAdContext;

    adListing = ()=>{
        this.context.toggleAdListing();
    }

    render(){
        console.log(this.props)
        return (
            <section id="properties-section">
                <div id="properties-section-header-container">
                    <h2>Properties</h2>

                    <button id="properties-section-container-button" onClick={this.adListing}><span>+</span> Add a property</button>
                </div>

                {this.context.adListing ? <AdListing history={this.props.history}/> : ""}

                <section id="property-listings"> 

                </section>
            </section>
        );
    };
};