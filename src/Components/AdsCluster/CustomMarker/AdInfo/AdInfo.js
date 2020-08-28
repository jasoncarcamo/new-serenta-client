import React from "react";
import {InfoWindow} from "@react-google-maps/api";
import "./AdInfo.css";

export default class AdInfo extends React.Component{

    toggleInfo = ()=>{
        this.props.toggleInfo();
    };

    render(){
        console.log(this.props);
        return (
            <InfoWindow
                className="ad-info-container"
                position={this.props.position}
                onCloseClick={this.toggleInfo}>
                <section className="ad-info-window">
                    <p>Hello</p>
                </section>
            </InfoWindow>
        )
    }
}