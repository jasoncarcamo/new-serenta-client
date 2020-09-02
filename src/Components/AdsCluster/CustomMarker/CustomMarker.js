import React from "react";
import {Marker} from "@react-google-maps/api";
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
        return <AdInfo position={this.props.position} toggleInfo={this.toggleInfo} ad={this.props.ad} zIndex={this.props.zIndex}></AdInfo>
    }

    render(){
        return this.state.toggleInfo === true ? this.renderAdInfo() : this.renderMarker();
    }
}