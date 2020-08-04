import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class DryerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dryer: ""
        };
    };

    static contextType = PostAdContext;

    handleRadioInput = (e)=>{
        if(e.target.checked){
            this.setState({
                [e.target.name]: e.target.value
            });
    
            this.context.handleRadioInput(e);
        }
    };

    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Dryer <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    <label htmlFor="post-ad-amenity-dryer-notincluded"><input id="post-ad-amenity-dryer-notincluded" type="radio" name="dryer" value="Not included" onChange={this.handleRadioInput} checked={this.context.ad.dryer && this.context.ad.dryer === "Not included" || !this.context.ad.dryer ? true : false}></input>Not Included</label>

                    <label htmlFor="post-ad-amenity-dryer-included"><input id="post-ad-amenity-dryer-included" type="radio" name="dryer" value="Included" onChange={this.handleRadioInput} checked={this.context.ad.dryer && this.context.ad.dryer === "Included" ? true : false}></input>Included</label>
                </div>
            </section>
        );
    };
};