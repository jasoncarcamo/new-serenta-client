import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class PriceInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            price: ""
        }
    }

    static contextType = PostAdContext;

    handleinput = (e)=>{
        
        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleTextInput(e);
    }

    render(){
        return (
            <section className="post-ad-info">
                <h4 className="post-ad-header">Monthly Rent <span>*</span></h4>
                <div className="post-ad-input-container">
                    <p className="post-ad-dollar">$</p>
                    <input id="post-ad-input-price" type="number" name="price" value={this.context.ad.price ? this.context.ad.price : this.state.price} onChange={this.handleinput}/>
                    <p className="post-ad-price-info">Per month</p>
                </div>
            </section>
        );
    };
};