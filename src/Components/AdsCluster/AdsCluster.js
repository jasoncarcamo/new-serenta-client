import React from "react";
import {MarkerClusterer} from "@react-google-maps/api";
import AdsContext from "../../Contexts/AdsContext/AdsContext";
import CustomMarker from "./CustomMarker/CustomMarker";

export default class AdsCluster extends React.Component{
    
    static contextType = AdsContext;

    renderAds = (clusterer, ads)=>{

        ads = ads.map( ( ad, index) => {
            
            let position = {
                lat: Number(ad.lat),
                lng: Number(ad.lng)
            };
            
            return <CustomMarker key={index} ad={ad} position={position} clusterer={clusterer} zIndex={index}/>
        });

        return ads;
    };

    render(){
        const options = {
            imagePath:"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m" 
        };

        return (
            <MarkerClusterer options={options}>{(clusterer) => this.renderAds(clusterer, this.context.ads)}</MarkerClusterer>
        );
    };
};