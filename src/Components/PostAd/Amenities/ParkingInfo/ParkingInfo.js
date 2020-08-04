import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";

export default class ParkingInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parking: ["Not available"],
            error: ""
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

        // this method checks if the not available option is choosen
        // when choosing other options
        this.handleMultiChoiceError();

        this.setState({
            parking
        });

        this.context.handleCheckboxInput(e);
    }

    handleMultiChoiceError = ()=>{
        const parking = this.state.parking;
        let indexOfDefault = parking.indexOf("Not available");

        // if "Not availble" is contained with other options
        if(parking.length > 1 && indexOfDefault !== -1){
            this.setState({
                error: "Cannot choose 'Not available' if providing other parking options"
            });
        } else{
            this.setState({
                error: ""
            })
        }
    }

    render(){
        console.log(this.state);
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-amenities-header">Parking <span>*</span></h4>

                <div className="post-ad-amenities-input-container">
                    
                    <label htmlFor="post-ad-amenity-parking-notincluded"><input id="post-ad-amenity-parking-notincluded" type="checkbox" name="parking" value="Not available" onChange={this.handleCheckboxInput} checked={this.context.ad.parking && this.context.ad.parking.indexOf("Not available") > -1 || !this.context.ad.parking ? true : false}></input>Not Available</label>

                    
                    <label htmlFor="post-ad-amenity-streetparking-included"><input id="post-ad-amenity-streetparking-included" type="checkbox" name="parking" value="Street Parking" onChange={this.handleCheckboxInput} checked={this.context.ad.parking && this.context.ad.parking.indexOf("Street Parking") > -1 ? true : false}></input>Street Parking</label>

                    
                    <label htmlFor="post-ad-amenity-driveway-included"><input id="post-ad-amenity-driveway-included" type="checkbox" name="parking" value="Driveway Parking" onChange={this.handleCheckboxInput} checked={this.context.ad.parking && this.context.ad.parking.indexOf("Driveway Parking") > -1 ? true : false}></input>Driveway Parking</label>

                    
                    <label htmlFor="post-ad-amenity-garageparking-included"><input id="post-ad-amenity-garageparking-included" type="checkbox" name="parking" value="Garage Parking" onChange={this.handleCheckboxInput} checked={this.context.ad.parking && this.context.ad.parking.indexOf("Garage Parking") > -1 ? true : false}></input>Garage Parking</label>
                </div>
                <p>{this.state.error ? this.state.error : ""}</p>
            </section>
        );
    };
};