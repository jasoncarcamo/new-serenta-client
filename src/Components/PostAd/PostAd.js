import React from "react";
import "./PostAd.css";
import PostAdContext from "../../Contexts/PostAdContext/PostAdContext";
import Details from "./Details/Details";
import Amenities from "./Amenities/Amenities";
import Description from "./Description/Description";
import SaveLaterButton from "./SaveLaterButton/SaveLaterButton";
import SubmitAd from "./SubmitAd/SubmitAd";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    static contextType = PostAdContext;

    componentDidMount(){
        if(!this.context.address){

            this.context.toggleAdListing();

            return this.props.history.push("/properties");
        }

        if(!this.context.address){
            return this.props.history.push("/properties")
        }
    }

    render(){
        return (
            <section id="post-ad-section">
                <h2 id="post-ad-section-header">Posting an ad listing has never been this easy</h2>
                
                <Details/>
                <Amenities/>
                <Description/>
                {this.context.ad.posted === false ? <SaveLaterButton/> : ""}
                <SubmitAd history={this.props.history}/>
            </section>
        );
    };
};