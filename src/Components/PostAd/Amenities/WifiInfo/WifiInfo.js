import React from "react";

export default class WifiInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Wifi <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-wifi-notincluded"><input id="post-ad-amenity-wifi-notincluded" type="radio" name="wifi" value="Not included" defaultChecked></input>Not Included</label>

                    <label htmlFor="post-ad-amenity-wifi-included"><input id="post-ad-amenity-wifi-included" type="radio" name="wifi" value="Included"></input>Included</label>
                </div>
            </section>
        );
    };
};