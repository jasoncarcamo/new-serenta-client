import React from "react";
import "./PostAd.css";
import Details from "./Details/Details";
import Amenities from "./Amenities/Amenities";
import SubmitAd from "./SubmitAd/SubmitAd";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    render(){
        return (
            <section>
                <Details/>
                <Amenities/>
                <SubmitAd/>
            </section>
        );
    };
};