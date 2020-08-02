import React from "react";

export default class PetsInfo extends React.Component{
    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Pets <span>*</span></h4>

                <div className="post-ad-amenities-input-container">

                    <label htmlFor="post-ad-amenity-nopets"><input id="post-ad-amenity-nopets" type="radio" name="pets" defaultChecked></input>No Pets</label>
                    
                    <label htmlFor="post-ad-amenity-dogsallowed"><input id="post-ad-amenity-dogsallowed" type="radio" name="pets"></input>Dogs allowed</label>

                    
                    <label htmlFor="post-ad-amenity-catsallowed"><input id="post-ad-amenity-catsallowed" type="radio" name="pets"></input>Cats Allowed</label>

                    
                    <label htmlFor="post-ad-amenity-dogsandcatsallowed"><input id="post-ad-amenity-dogsandcatsallowed" type="radio" name="pets"></input>Dogs and Cats Allowed</label>
                </div>
            </section>
        );
    };
};