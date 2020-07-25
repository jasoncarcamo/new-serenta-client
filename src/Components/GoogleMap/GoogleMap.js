import React from "react";
import GoogleMap from "@react-google-maps/api";

export default class Map extends React.Component{
    render(){
        return (
            <GoogleMap id="map"></GoogleMap>
        );
    };
};