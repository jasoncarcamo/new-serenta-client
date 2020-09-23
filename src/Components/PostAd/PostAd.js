import React from "react";
import "./PostAd.css";
import PostAdContext from "../../Contexts/PostAdContext/PostAdContext";
import Details from "./Details/Details";
import Amenities from "./Amenities/Amenities";
import Description from "./Description/Description";
import SaveLaterButton from "./SaveLaterButton/SaveLaterButton";
import UploadImgs from "./UploadImgs/UploadImgs"
import SubmitAd from "./SubmitAd/SubmitAd";
import UserToken from "../../Services/UserToken/UserToken";

export default class PostAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    };

    static contextType = PostAdContext;

    componentDidMount(){
        if(!UserToken.hasToken()){
            return this.props.history.push("/login");
        };

        if(!this.context.address){

            this.context.toggleAdListing();

            return this.props.history.push("/properties");
        };
    }

    toggleLoading = ()=>{
        this.setState({
            loading: !this.state.loading
        })
    }

    renderLoading = ()=>{
        return <p>Loading</p>;
    }

    render(){
        return (
            <section id="post-ad-section">
                <h2 id="post-ad-section-header">Posting an ad listing has never been this easy</h2>
                
                <Details/>
                <Amenities/>
                <Description/>
                <UploadImgs toggleLoading={this.toggleLoading}/>
                {this.context.ad.posted === false && !this.state.loading ? <SaveLaterButton/> : ""}
                {this.state.loading ? "" : <SubmitAd history={this.props.history} toggleLoading={this.toggleLoading}/>}
            </section>
        );
    };
};