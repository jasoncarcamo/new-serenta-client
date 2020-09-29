import React from "react";
import ReactLoading from "react-loading";
import "./MapLoading.css";
import AppContext from "../../Contexts/AppContext/AppContext";

export default class MapLoading extends React.Component{

    static contextType = AppContext;

    renderLoading = ()=>{
        return (
            <div className="map-loading-container">
                <ReactLoading className="map-loading" type={"spinningBubbles"} color={"grey"}/>
            </div>
        )
    }
    render(){
        
        return !this.context.adsContext.loading ? "" : this.renderLoading();
    };
};