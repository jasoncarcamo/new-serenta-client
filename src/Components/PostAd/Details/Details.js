import React from "react";
import "./Details.css";
import TypeInfo from "./TypeInfo/TypeInfo";
import PriceInfo from "./PriceInfo/PriceInfo";
import DepositInfo from "./DepositInfo/DepositInfo";
import SpaceInfo from "./SpaceInfo/SpaceInfo";

// this serves as the container for each section of details form
export default class Details extends React.Component{
    render(){
        return (
            <section>
                <form id="post-ad-form">
                    <fieldset id="post-ad-fieldset">
                        <legend id="post-ad-legend">
                            <h3>Details</h3>
                        </legend>

                        <TypeInfo/>

                        <PriceInfo/>

                        <DepositInfo/>

                        <SpaceInfo/>
                    </fieldset>
                </form>
            </section>
        );
    };
};