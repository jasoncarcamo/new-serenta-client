import React from "react";

export default class AcInfo extends React.Component{
    render(){
        return(
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">A/C <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-ac-notincluded"><input id="post-ad-amenity-ac-notincluded" type="radio" name="ac" value="Not included" defaultChecked></input> Not Included</label>
                    <label htmlFor="post-ad-amenity-ac-included"><input id="post-ad-amenity-ac-included" type="radio" name="ac" value="Included"></input> Included</label>

                </div>
            </section>
        );
    };
};