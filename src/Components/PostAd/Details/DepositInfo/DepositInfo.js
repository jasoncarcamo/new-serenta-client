import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class DepositInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deposit: ""
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
                <h4 className="post-ad-header">Security Deposit <span>*</span></h4>
                <div className="post-ad-input-container">
                    <p className="post-ad-dollar">$</p>
                    <input id="post-ad-input-deposit" type="number" name="deposit" value={this.context.ad.deposit ? this.context.ad.deposit : this.state.deposit} onChange={this.handleinput}/>
                </div>
            </section>
        );
    };
};