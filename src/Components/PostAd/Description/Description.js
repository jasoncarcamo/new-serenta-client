import React from "react";
import "./Description.css";
import PostAdCOntext from "../../../Contexts/PostAdContext/PostAdContext";
import PostAd from "../PostAd";
import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";

export default class Description extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: ""
        };
    };

    static contextType = PostAdContext;

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleTextInput(e);
    }

    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">Comments <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-ac-comments">About the property</label>
                    <textarea id="post-ad-amenity-ac-comments" type="text" name="comments" value={this.context.ad.comments ? this.context.ad.comments : this.state.comments} onChange={this.handleTextInput} placeholder="E.g. comments and additional amenities"></textarea>           
                </div>
            </section>
        );
    };
};