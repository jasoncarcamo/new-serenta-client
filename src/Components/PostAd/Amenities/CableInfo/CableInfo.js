import React from "react";

export default class CableInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Cable <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    
                    <label htmlFor="post-ad-amenity-cable-notincluded"><input id="post-ad-amenity-cable-notincluded" type="radio" name="cable" value="Not included" defaultChecked></input>Not Included</label>

                    
                    <label htmlFor="post-ad-amenity-cable-included"><input id="post-ad-amenity-cable-included" type="radio" name="cable" value="Included"></input>Included</label>
                </div>
            </section>
        );
    };
};