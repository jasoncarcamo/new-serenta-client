import React from "react";
import {GoogleMap, Polygon} from "@react-google-maps/api";
import MapContext from "../../Contexts/MapContext/MapContext";

export default class Map extends React.Component{

    static contextType = MapContext;

    onLoad = polyline => {
        console.log('polyline: ', polyline)
    };
      
    path = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ];
      
    polylineOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 2
    };
    
    render(){
        console.log(this.context)
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
                    zIndex: 3
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
            </GoogleMap>
        );
    };
};