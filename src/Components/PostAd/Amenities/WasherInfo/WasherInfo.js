import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class WasherInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            washer: ""
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
                <h4 className="post-ad-amenities-header">Washer <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-washer-notincluded"><input id="post-ad-amenity-washer-notincluded" type="radio" name="washer" value="Not included" onClick={this.handleRadioInput} defaultChecked></input>Not Included</label>

                    
                    <label htmlFor="post-ad-amenity-washer-included"><input id="post-ad-amenity-wsher-included" type="radio" name="washer" value="Included" onClick={this.handleRadioInput}></input>Included</label>
                </div>
            </section>
        );
    };
};