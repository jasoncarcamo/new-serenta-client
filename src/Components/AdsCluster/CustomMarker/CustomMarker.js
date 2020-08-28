import React from "react";
import {InfoWindow, Marker} from "@react-google-maps/api";
import AdInfo from "./AdInfo/AdInfo";

export default class CustomMarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleInfo: false
        }
    }

    toggleInfo = ()=>{
        this.setState({
            toggleInfo: !this.state.toggleInfo
        });
    }
    renderMarker = ()=>{
        return <Marker onClick={this.toggleInfo} position={this.props.position} clusterer={this.props.clusterer}></Marker>;
    }

    renderAdInfo = ()=>{
        return <AdInfo position={this.props.position} toggleInfo={this.toggleInfo}></AdInfo>
    }

    render(){
        return this.state.toggleInfo === true ? this.renderAdInfo() : this.renderMarker();
    }
}