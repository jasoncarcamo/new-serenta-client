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

    render(){
        console.log(this.props)
        return (
            <section id="properties-section">
                <div>
                    <h2>Properties</h2>

                    <button><span>+</span> Add a property</button>
                </div>

                <AdListing history={this.props.history}/>

                <section id="property-listings"> 

                </section>
            </section>
        );
    };
};