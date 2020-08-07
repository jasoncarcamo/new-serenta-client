import React from "react";
import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";
import PlacesAutocomplete from "react-places-autocomplete";
import SearchSpacesInput from "../../SearchSpacesInput/SearchSpacesInput";
import UserToken from "../../../Services/UserToken/UserToken";

export default class AdListing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            apt_num: "",
            type: "Room"
        };
    };

    static contextType = PostAdContext;

    renderLoading = ()=>{
        return <p className="loading-icon">Loading...</p>
    }

    toggleAdListing = ()=>{
        this.context.toggleAdListing();
    }

    handleTextInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value 
        });

        this.context.handleTextInput(e);
    }

    // address and coordinates in post ad context
    handleAddressInput = (address, location)=>{

        this.setState({
            address
        });

        this.context.handleAddressInput(address);

        if(location){
            this.context.setCoordinates(location);
        };
    }

    handleSelectInput = (address)=>{

        this.getAddressDetails(address);
    }

    toPostAd = ()=>{
        this.props.history.push(`/post-ad`)
    }

    // This starts ad, so it will be used even the user returns and continues on the ad
    startPostAd =  (e)=>{
        e.preventDefault();
        console.log(this.context.ad)

        // check if the ad has already been created on the backend
        if((this.context.ad.posted === false) && (this.context.ad.posted !== undefined)){
            return this.toPostAd();
        };

        this.context.handlePostAd()
            .then( resData => {
                console.log(resData);
                this.context.setCurrentAd(resData.createdAd);
                this.context.addToUserAds(resData.createdAd);
                this.toPostAd();
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: err.error
                })
            })
    }

    getAddressDetails = (newAddress)=>{
        let commasAmount = 0;
        let zoom = 13;
        let address = newAddress;

        address = address.split(" ");

        for(let i = 0; i < address.length; i++){
            if(address[i].substring(address[i].length - 1) === ","){
                commasAmount++;
            };
        };

        if(commasAmount === 0){
            zoom = 4;
        };

        if(commasAmount === 1){
            zoom = 8;
        };

        if(commasAmount >= 2){
            zoom = 14;
        };

        address = address.join(" ").split(", ").join("+").split(" ").join("+");
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {

                this.handleAddressInput(resData.results[0].formatted_address, resData.results[0].geometry.location);

            })
            .catch( err => this.setState({ error: err}))
    }

    render(){
        console.log(this.context)
        return (
            <section>
                <form onSubmit={this.startPostAd}>
                    <legend>
                        <h3>Add Property</h3>
                    </legend>
                    <fieldset>

                        <label htmlFor="search-address-input">Property Address <span>*</span></label>
                        <PlacesAutocomplete
                        name="address"
                        value={this.context.address ? this.context.address : this.state.address}
                        onChange={this.handleAddressInput}
                        onSelect={this.handleSelectInput}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div id="search-spaces-input-container">

                                    <div id="input-container">
                                        <input
                                        {...getInputProps({
                                            placeholder: 'Address...',
                                            className: 'location-search-input',
                                            id: "search-address-input"
                                        })}
                                        />
                                    </div>
                                    
                                    <ul className="autocomplete-dropdown-container">
                                    {loading && <p>Loading...</p>}
                                    {suggestions.map( (suggestion, index) => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: 'lightgrey', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <li key={index}
                                                {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                                })}
                                            >
                                                <p key={index}>{suggestion.description}</p>
                                            </li>
                                        );
                                    })}
                                    </ul>
                                </div>
                            )}
                        </PlacesAutocomplete>

                        <label htmlFor="ad-listing-property-apt-num">Suite / Apartment number</label>
                        <input id="" type="text" name="apt_num" onChange={this.handleTextInput} value={this.context.ad.apt_num ? this.context.ad.apt_num : this.state.apt_num} placeholder="If applicable"></input>

                        <label htmlFor="ad-listing-property-type">Space listing type</label>
                        <select id="ad-listing-property-type" name="type" value={this.context.ad.type ? this.context.ad.type : this.state.type} onChange={this.handleSelectInput}>
                            <option value="Room">Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <button type="submit">Create Listing</button>
                        <button type="button" onClick={this.toggleAdListing}>Manage Lsitings</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}