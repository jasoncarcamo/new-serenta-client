import React from "react";
import "./Amenities.css";
import AcInfo from "./AcInfo/AcInfo";
import WifiInfo from "./WifiInfo/WifiInfo";
import CableInfo from "./CableInfo/CableInfo";
import PetsInfo from "./PetsInfo/PetsInfo";
import ParkingInfo from "./ParkingInfo/ParkingInfo";
import WasherInfo from "./WasherInfo/WasherInfo";
import DryerInfo from "./DryerInfo/DryerInfo";

export default class Amenities extends React.Component{
    render(){
        return (
            <section id="post-ad-amenities-section">
                <form id="post-ad-amenities-form">
                    <fieldset id="post-ad-amenities-fieldset">
                        <legend id="post-ad-amenitites-legend">
                            <h3>Amenities</h3>
                        </legend>


                        <AcInfo/>   

                        <WifiInfo/>

                        <CableInfo/>

                        <PetsInfo/>

                        <ParkingInfo/>

                        <WasherInfo/>

                        <DryerInfo/>
                    </fieldset>
                </form>
            </section>
        );
    };
};