import React from "react";

export default class DryerInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Dryer <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    <label htmlFor="post-ad-amenity-dryer-notincluded"><input id="post-ad-amenity-dryer-notincluded" type="radio" name="dryer" value="Not included" defaultChecked></input>Not Included</label>

                    <label htmlFor="post-ad-amenity-dryer-included"><input id="post-ad-amenity-dryer-included" type="radio" name="dryer" value="Included"></input>Included</label>
                </div>
            </section>
        );
    };
};