import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class AcInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ac: ""
        };
    };

    static contextType = PostAdContext;

    handleRadioInput = (e)=>{

        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleRadioInput(e);
    };

    render(){
        console.log(this.state)
        return(
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">A/C <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-ac-notincluded"><input id="post-ad-amenity-ac-notincluded" type="radio" name="ac" value="Not included" onChange={this.handleRadioInput} checked={this.context.ad.ac && this.context.ad.ac === "Not included" || !this.context.ad.ac ? true : false}></input> Not Included</label>
                    <label htmlFor="post-ad-amenity-ac-included"><input id="post-ad-amenity-ac-included" type="radio" name="ac" value="Included" onChange={this.handleRadioInput}checked={this.context.ad.ac && this.context.ad.ac === "Included" ? true : false}></input> Included</label>

                </div>
            </section>
        );
    };
};