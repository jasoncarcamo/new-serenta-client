import React from "react";
import {GoogleMap, Polygon} from "@react-google-maps/api";
import MapContext from "../../Contexts/MapContext/MapContext";
import AdsCluster from "../AdsCluster/AdsCluster";

export default class Map extends React.Component{

    static contextType = MapContext;
    
    render(){
        
        return (
            <GoogleMap 
                id="map"
                className="map"
                mapContainerStyle={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    flex: 1,
                    height: "100%",
                    width: "100vw",
                    padding: 0,
                    margin: 0,
                    zIndex: 2
                }}
                zoom={this.context.zoom}
                center={{
                    lat: this.context.lat,
                    lng: this.context.lng
                }}
                options={{
                    fullscreenControl: false, 
                    mapTypeControl: false              
            }}>
                <p>Hello</p>
                <AdsCluster></AdsCluster>
            </GoogleMap>
        );
    };
};