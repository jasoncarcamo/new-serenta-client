import React from "react";
import "./PostAd.css";
import PostAdContext from "../../Contexts/PostAdContext/PostAdContext";
import Details from "./Details/Details";
import Amenities from "./Amenities/Amenities";
import Description from "./Description/Description";
import SubmitAd from "./SubmitAd/SubmitAd";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    };

    static contextType = PostAdContext;

    componentDidMount(){
        if(!this.context.adListing){

            if(this.context){
                this.context.toggleAdListing();
            };

            return this.props.history.push("/properties");
        }

        if(!this.context.address){
            return this.props.history.push("/properties")
        }
    }

    render(){
        return (
            <section>
                <Details/>
                <Amenities/>
                <Description/>
                <SubmitAd/>
            </section>
        );
    };
};