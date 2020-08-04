import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class AcInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: ""
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
        console.log(this.state)
        return(
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">Space Type <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-ac-notincluded"><input id="post-ad-amenity-type-notincluded" type="radio" name="type" value="Room" onChange={this.handleRadioInput} checked={this.context.ad.type === "Room" ? true : false}></input> Room</label>
                    <label htmlFor="post-ad-amenity-ac-included"><input id="post-ad-amenity-type-included" type="radio" name="type" value="Apartment" onChange={this.handleRadioInput} checked={this.context.ad.type === "Apartment" ? true : false}></input> Apartment</label>

                </div>
            </section>
        );
    };
};