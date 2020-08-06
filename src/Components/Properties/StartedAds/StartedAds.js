import React from "react";
import "./StartedAds.css";
import UserContext from "../../../Contexts/UserContext/UserContext";

export default class StartedAds extends React.Component{

    static contextType = UserContext;

    render(){
        return (
            <section id="property-listings"> 
                
            </section>
        );
    };
};