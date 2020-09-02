import React from "react";
import {InfoWindow} from "@react-google-maps/api";
import "./AdInfo.css";
import LivingRoomWide from "../../../../assets/livingroom.jpg";
import ImgSlider from "./ImgSlider/ImgSlider";

export default class AdInfo extends React.Component{

    toggleInfo = ()=>{
        this.props.toggleInfo();
    };

    displayLastModifies = (ad)=>{

        if(ad.date_last_modified){
            return new Date(ad.date_last_modified).toDateString();
        } else{
            return "Has not been modified."
        };
    }

    render(){
        console.log(this.props);
        return (
            <InfoWindow
                className="ad-info-container"
                position={this.props.position}
                onCloseClick={this.toggleInfo}
                zIndex={this.props.zIndex}>
                <section className="ad-info-window">

                    <ImgSlider/>
                    
                    <div>
                        <h2 className="ad-info-header">{this.props.ad.type}</h2>

                        <section>
                            <p><strong>Address:</strong> {this.props.ad.street_address}, {this.props.ad.city}, {this.props.ad.state}, {this.props.ad.zip_code}</p>
                            
                            <p><strong>Monthly price:</strong> {this.props.ad.price}</p>

                            <p><strong>Bed rooms:</strong> {this.props.ad.bedrooms}</p>

                            <p><strong>Bathrooms:</strong> {this.props.ad.bathrooms}</p>
                        </section>

                        <section>
                            <h3 className="ad-info-h3">Amenities</h3>

                            <p><strong>Cable:</strong> {this.props.ad.cable}</p>

                            <p><strong>Wifi:</strong> {this.props.ad.wifi}</p>

                            <p><strong>A/c:</strong> {this.props.ad.ac}</p>

                            <p><strong>Washer:</strong> {this.props.ad.washer}</p>

                            <p><strong>Dryer:</strong> {this.props.ad.dryer}</p>

                            <p><strong>Pets:</strong> {this.props.ad.pets}</p>

                            <p><strong>Parking:</strong> {this.props.ad.parking.join(", ")}</p>
                        </section>

                        <section>
                            <h3 className="ad-info-h3">Comments</h3>
                            <p className="ad-info-comment">{this.props.ad.comments}</p>
                        </section>

                        <div id="ad-info-contact-container">
                            <a href={`tel:${this.props.ad.mobile_number}`} className="ad-info-contact-link">Call or Text</a>
                            <a href={`mailto:${this.props.ad.email}`} className="ad-info-contact-link">Email</a>
                            <button type="button" onClick={this.toggleInfo} className="ad-info-close-btn">Close</button>
                        </div>

                        <p>Date posted: {new Date(this.props.ad.date_created).toDateString()}</p>
                        <p>Last modified: {this.displayLastModifies(this.props.ad)}</p>
                    </div>
                </section>
            </InfoWindow>
        )
    }
}