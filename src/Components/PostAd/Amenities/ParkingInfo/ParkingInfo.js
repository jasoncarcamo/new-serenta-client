import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class ParkingInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parking: []
        };
    };

    static contextType = PostAdContext;

    handleCheckboxInput = (e)=>{
        const parking = this.state.parking;
        let infoIndex = parking.indexOf(e.target.value);

        if(e.target.checked){
            if(infoIndex === -1){
                parking.push(e.target.value);
            }
        } else{
            if(infoIndex > -1){
                parking.splice(infoIndex, 1);
            }
        };

        this.setState({
            parking
        });

        this.context.handleCheckboxInput(e);
    }

    render(){
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Parking <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-parking-notincluded"><input id="post-ad-amenity-parking-notincluded" type="checkbox" name="parking" value="Not available" onClick={this.handleCheckboxInput} defaultChecked></input>Not Available</label>

                    
                    <label htmlFor="post-ad-amenity-streetparking-included"><input id="post-ad-amenity-streetparking-included" type="checkbox" name="parking" value="Street Parking" onClick={this.handleCheckboxInput}></input>Street Parking</label>

                    
                    <label htmlFor="post-ad-amenity-driveway-included"><input id="post-ad-amenity-driveway-included" type="checkbox" name="parking" value="Driveway Parking" onClick={this.handleCheckboxInput}></input>Driveway Parking</label>

                    
                    <label htmlFor="post-ad-amenity-garageparking-included"><input id="post-ad-amenity-garageparking-included" type="checkbox" name="parking" value="Garage Parking" onClick={this.handleCheckboxInput}></input>Garage Parking</label>
                </div>
            </section>
        );
    };
};