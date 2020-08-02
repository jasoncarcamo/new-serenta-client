import React from "react";

export default class ParkingInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Parking <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-parking-notincluded"><input id="post-ad-amenity-parking-notincluded" type="checkbox" name="parking" defaultChecked></input>Not Available</label>

                    
                    <label htmlFor="post-ad-amenity-streetparking-included"><input id="post-ad-amenity-streetparking-included" type="checkbox" name="parking"></input>Street Parking</label>

                    
                    <label htmlFor="post-ad-amenity-driveway-included"><input id="post-ad-amenity-driveway-included" type="checkbox" name="parking"></input>Driveway Parking</label>

                    
                    <label htmlFor="post-ad-amenity-garageparking-included"><input id="post-ad-amenity-garageparking-included" type="checkbox" name="parking"></input>Garage Parking</label>
                </div>
            </section>
        );
    };
};