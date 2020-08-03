import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class CableInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cable: ""
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
                <h4 className="post-ad-amenities-header">Cable <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    
                    <label htmlFor="post-ad-amenity-cable-notincluded"><input id="post-ad-amenity-cable-notincluded" type="radio" name="cable" value="Not included" onClick={this.handleRadioInput} defaultChecked></input>Not Included</label>

                    
                    <label htmlFor="post-ad-amenity-cable-included"><input id="post-ad-amenity-cable-included" type="radio" name="cable" value="Included" onClick={this.handleRadioInput}></input>Included</label>
                </div>
            </section>
        );
    };
};