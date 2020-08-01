import React from "react";
import "./Amenities.css";

export default class Amenities extends React.Component{
    render(){
        return (
            <section id="post-ad-amenities-section">
                <form id="post-ad-amenities-form">
                    <fieldset id="post-ad-amenities-fieldset">
                        <legend>
                            <h3>Amenities</h3>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-header">A/C <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">
                                    
                                    <label htmlFor="post-ad-amenity-ac-notincluded"><input id="post-ad-amenity-ac-notincluded" type="radio" name="ac" value="Not included" defaultChecked></input> Not Included</label>
                                    <label htmlFor="post-ad-amenity-ac-included"><input id="post-ad-amenity-ac-included" type="radio" name="ac" value="Included"></input> Included</label>

                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Wifi <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">
                                    
                                    <label htmlFor="post-ad-amenity-wifi-notincluded"><input id="post-ad-amenity-wifi-notincluded" type="radio" name="wifi" value="Not included" defaultChecked></input>Not Included</label>

                                    <label htmlFor="post-ad-amenity-wifi-included"><input id="post-ad-amenity-wifi-included" type="radio" name="wifi" value="Included"></input>Included</label>
                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Cable <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">

                                    
                                    <label htmlFor="post-ad-amenity-cable-notincluded"><input id="post-ad-amenity-cable-notincluded" type="radio" name="cable" value="Not included" defaultChecked></input>Not Included</label>

                                    
                                    <label htmlFor="post-ad-amenity-cable-included"><input id="post-ad-amenity-cable-included" type="radio" name="cable" value="Included"></input>Included</label>
                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Pets <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">

                                    <label htmlFor="post-ad-amenity-nopets"><input id="post-ad-amenity-nopets" type="radio" name="pets" defaultChecked></input>No Pets</label>
                                    
                                    <label htmlFor="post-ad-amenity-dogsallowed"><input id="post-ad-amenity-dogsallowed" type="radio" name="pets"></input>Dogs allowed</label>

                                    
                                    <label htmlFor="post-ad-amenity-catsallowed"><input id="post-ad-amenity-catsallowed" type="radio" name="pets"></input>Cats Allowed</label>

                                    
                                    <label htmlFor="post-ad-amenity-dogsandcatsallowed"><input id="post-ad-amenity-dogsandcatsallowed" type="radio" name="pets"></input>Dogs and Cats Allowed</label>
                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Parking <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">
                                    
                                    <label htmlFor="post-ad-amenity-parking-notincluded"><input id="post-ad-amenity-parking-notincluded" type="checkbox" name="parking" defaultChecked></input>Not Available</label>

                                    
                                    <label htmlFor="post-ad-amenity-streetparking-included"><input id="post-ad-amenity-streetparking-included" type="checkbox" name="parking"></input>Street Parking</label>

                                    
                                    <label htmlFor="post-ad-amenity-driveway-included"><input id="post-ad-amenity-driveway-included" type="checkbox" name="parking"></input>Driveway Parking</label>

                                    
                                    <label htmlFor="post-ad-amenity-garageparking-included"><input id="post-ad-amenity-garageparking-included" type="checkbox" name="parking"></input>Garage Parking</label>
                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Washer <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">
                                    
                                    <label htmlFor="post-ad-amenity-washer-notincluded"><input id="post-ad-amenity-washer-notincluded" type="radio" name="washer" value="Not included" defaultChecked></input>Not Included</label>

                                    
                                    <label htmlFor="post-ad-amenity-washer-included"><input id="post-ad-amenity-wsher-included" type="radio" name="washer" value="Included"></input>Included</label>
                                </div>
                            </section>

                            <section className="post-ad-amenities-info">
                                <h4 className="post-ad-amenities-header">Dryer <span>*</span></h4>

                                <div className="post-ad-amenities-input-container">
    
                                    <label htmlFor="post-ad-amenity-dryer-notincluded"><input id="post-ad-amenity-dryer-notincluded" type="radio" name="dryer" value="Not included" defaultChecked></input>Not Included</label>

                                    <label htmlFor="post-ad-amenity-dryer-included"><input id="post-ad-amenity-dryer-included" type="radio" name="dryer" value="Included"></input>Included</label>
                                </div>
                            </section>
                        </legend>
                    </fieldset>
                </form>
            </section>
        );
    };
};