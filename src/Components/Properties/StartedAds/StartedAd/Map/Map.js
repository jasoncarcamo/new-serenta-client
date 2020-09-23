import React from "react";
import {GoogleMap, Polygon, Marker} from "@react-google-maps/api";
import MapContext from "../../../../../Contexts/MapContext/MapContext";

export default class Map extends React.Component{

    static contextType = MapContext;
    
    render(){
        const position = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        return (
            <GoogleMap 
                id="map"
                className="map"
                mapContainerStyle={{
                    position: "relative",
                    top: 0,
                    left: 0,
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    zIndex: 0
                }}
                zoom={13}
                center={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                options={{
                    fullscreenControl: false, 
                    mapTypeControl: false              
            }}>
                <Marker position={position}></Marker>;
            </GoogleMap>
        );
    };
};