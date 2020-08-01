import React from "react";
import "./Details.css";
import PriceInfo from "./PriceInfo/PriceInfo";
import DepositInfo from "./DepositInfo/DepositInfo";
import SpaceInfo from "./SpaceInfo/SpaceInfo";

export default class Details extends React.Component{
    render(){
        return (
            <section>
                <form id="post-ad-form">
                    <fieldset id="post-ad-fieldset">
                        <legend>
                            <h3>Details</h3>
                        </legend>

                        <PriceInfo/>

                        <DepositInfo/>

                        <SpaceInfo/>
                    </fieldset>
                </form>
            </section>
        );
    };
};