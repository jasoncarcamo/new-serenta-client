import React from "react";

export default class PriceInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-info">
                <h4 className="post-ad-header">Monthly Rent <span>*</span></h4>
                <div className="post-ad-input-container">
                    <p className="post-ad-dollar">$</p>
                    <input id="post-ad-input-price" type="number" />
                    <p className="post-ad-price-info">Per month</p>
                </div>
            </section>
        );
    };
};