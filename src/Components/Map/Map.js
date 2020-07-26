import React from "react";
import {GoogleMap, LoadScript} from "@react-google-maps/api";

export default class Map extends React.Component{
    render(){
        return (
            <GoogleMap 
                id="map"
                className="map"
                mapContainerStyle={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    zIndex: 1
                }}
                zoom={5}
                center={{
                    lat: 38.885512,
                    lng: -99.383977
                }}
                options={{
                    fullscreenControl: false, 
                    mapTypeControl: false              
            }}>
                <p>Helooooooooo</p>
            </GoogleMap>
        );
    };
};