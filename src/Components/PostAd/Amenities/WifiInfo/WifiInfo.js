import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class WifiInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Wifi: ""
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
                <h4 className="post-ad-amenities-header">Wifi <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-wifi-notincluded"><input id="post-ad-amenity-wifi-notincluded" type="radio" name="wifi" value="Not included" onClick={this.handleRadioInput} defaultChecked></input>Not Included</label>

                    <label htmlFor="post-ad-amenity-wifi-included"><input id="post-ad-amenity-wifi-included" type="radio" name="wifi" value="Included" onClick={this.handleRadioInput}></input>Included</label>
                </div>
            </section>
        );
    };
};