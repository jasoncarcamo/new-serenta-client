import React from "react";

export default class WasherInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Washer <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-washer-notincluded"><input id="post-ad-amenity-washer-notincluded" type="radio" name="washer" value="Not included" defaultChecked></input>Not Included</label>

                    
                    <label htmlFor="post-ad-amenity-washer-included"><input id="post-ad-amenity-wsher-included" type="radio" name="washer" value="Included"></input>Included</label>
                </div>
            </section>
        );
    };
};