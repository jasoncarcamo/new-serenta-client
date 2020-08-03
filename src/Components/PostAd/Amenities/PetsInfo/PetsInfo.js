import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class PetsInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pets: ""
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
                <h4 className="post-ad-amenities-header">Pets <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    <label htmlFor="post-ad-amenity-nopets"><input id="post-ad-amenity-nopets" type="radio" name="pets" onClick={this.handleRadioInput} defaultChecked></input>No Pets</label>
                    
                    <label htmlFor="post-ad-amenity-dogsallowed"><input id="post-ad-amenity-dogsallowed" type="radio" name="pets" value="Dogs Allowed" onClick={this.handleRadioInput}></input>Dogs Allowed</label>

                    
                    <label htmlFor="post-ad-amenity-catsallowed"><input id="post-ad-amenity-catsallowed" type="radio" name="pets" value="Cats Allowed" onClick={this.handleRadioInput}></input>Cats Allowed</label>

                    
                    <label htmlFor="post-ad-amenity-dogsandcatsallowed"><input id="post-ad-amenity-dogsandcatsallowed" type="radio" name="pets" value="Dogs and Cats Allowed" onClick={this.handleRadioInput}></input>Dogs and Cats Allowed</label>
                </div>
            </section>
        );
    };
};