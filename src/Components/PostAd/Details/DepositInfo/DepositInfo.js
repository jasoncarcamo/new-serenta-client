import React from "react";

export default class DepositInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-info">
                <h4 className="post-ad-header">Security Deposit <span>*</span></h4>
                <div className="post-ad-input-container">
                    <p className="post-ad-dollar">$</p>
                    <input id="post-ad-input-deposit" type="number" />
                </div>
            </section>
        );
    };
};