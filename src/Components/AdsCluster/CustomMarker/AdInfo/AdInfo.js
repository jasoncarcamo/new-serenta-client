import React from "react";
import "./AdInfo.css";
import ImgSlider from "./ImgSlider/ImgSlider";
import AppContext from "../../../../Contexts/AppContext/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBed,faBath, faCube, faTv, faWifi, faSnowflake, faSoap, faTshirt, faPaw, faWarehouse} from "@fortawesome/free-solid-svg-icons"

export default class AdInfo extends React.Component{

    static contextType = AppContext;

    closeAdInfo = ()=>{
        this.props.closeAdInfo();
    }

    displayLastModifies = (ad)=>{

        if(ad.date_last_modified){
            return new Date(ad.date_last_modified).toDateString();
        } else{
            return "Has not been modified."
        };
    }

    getCurrentAdImages = (images)=>{
        let userImages = images;

        userImages = userImages.filter((image, i)=>{
            if(image.living_space_id === this.props.ad.id){
                return image;
            };
        });

        return userImages
    }

    displayAddress = ()=>{
        return `${this.props.ad.street_address}, ${this.props.ad.apt_num ? `${this.props.ad.apt_num}, ${this.props.ad.city}` : this.props.ad.city}, ${this.props.ad.state}, ${this.props.ad.zip_code}`;
    }

    render(){
        console.log(this.props)
        return (
            <section className="ad-info-container">
                <section className="ad-info-window">

                    <button type="button" className="ad-info-close-window" onClick={this.closeAdInfo}>X</button>

                    <div className="ad-info-div1">

                        <ImgSlider ad={this.props.ad} images={this.props.ad.images}/>
                    </div>

                    <div className="ad-info-div2">
                        <h2 className="ad-info-header">${this.props.ad.price} a month</h2>

                        <p className="ad-info-address">{this.displayAddress()}</p>

                        <section className="ad-info-details-container">
                            <p><strong><FontAwesomeIcon icon={faBed}></FontAwesomeIcon> Bed rooms:</strong> {this.props.ad.bedrooms}</p>

                            <p><strong><FontAwesomeIcon icon={faBath}></FontAwesomeIcon> Bathrooms:</strong> {this.props.ad.bathrooms}</p>

                            <p><strong><FontAwesomeIcon icon={faCube}></FontAwesomeIcon> Sqft: {this.props.ad.squareft}</strong></p>
                        </section>

                        <div className="ad-info-contact-container">
                            <a href={`tel:${this.props.ad.mobile_number}`} className="ad-info-contact-link">Call or Text</a>
                            <a href={`mailto:${this.props.ad.email}`} className="ad-info-contact-link">Email</a>
                        </div>

                        <section>
                            <h3 className="ad-info-h3">Amenities</h3>

                            <p><strong><FontAwesomeIcon icon={faTv}></FontAwesomeIcon> Cable:</strong> {this.props.ad.cable}</p>

                            <p><strong><FontAwesomeIcon icon={faWifi}></FontAwesomeIcon> Wifi:</strong> {this.props.ad.wifi}</p>

                            <p><strong><FontAwesomeIcon icon={faSnowflake}></FontAwesomeIcon> A/c:</strong> {this.props.ad.ac}</p>

                            <p><strong><FontAwesomeIcon icon={faSoap}></FontAwesomeIcon> Washer:</strong> {this.props.ad.washer}</p>

                            <p><strong><FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon> Dryer:</strong> {this.props.ad.dryer}</p>

                            <p><strong><FontAwesomeIcon icon={faPaw}></FontAwesomeIcon> Pets:</strong> {this.props.ad.pets}</p>

                            <p><strong><FontAwesomeIcon icon={faWarehouse}></FontAwesomeIcon> Parking:</strong> {this.props.ad.parking.join(", ")}</p>
                        </section>

                        <section>
                            <h3 className="ad-info-h3">Comments</h3>
                            <p className="ad-info-comment">{this.props.ad.comments ||  "Lister did not provide comments."}</p>
                        </section>

                        <button type="button" onClick={this.closeAdInfo} className="ad-info-close-btn">Close</button>

                        <p>Date posted: {new Date(this.props.ad.date_created).toDateString()}</p>
                        <p>Last modified: {this.displayLastModifies(this.props.ad)}</p>
                    </div>
                </section>
            </section>
        )
    }
}