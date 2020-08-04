import React from "react";
import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";
import PlacesAutocomplete from "react-places-autocomplete";
import SearchSpacesInput from "../../SearchSpacesInput/SearchSpacesInput";

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

    componentDidMount(){
        
    }

    handleAddressInput = (address)=>{

        this.setState({
            address
        });

        this.context.handleAddressInput(address);
    }

    handleSelectInput = (address)=>{

        this.getAddressDetails(address);
    }

    toPostAd = ()=>{
        this.props.history.push("/post-ad")
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
        console.log(address)
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData.results[0].formatted_address)

                

                this.handleAddressInput(resData.results[0].formatted_address);

            })
            .catch( err => this.setState({ error: err}))
    }

    render(){
        console.log(this.context)
        return (
            <section>
                <form>
                    <legend>
                        <h3>Add Property</h3>
                    </legend>
                    <fieldset>

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
                                            placeholder: 'Propety address...',
                                            className: 'location-search-input',
                                            id: "search-spaces-input"
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
                        <input id="" type="text" name="apt_num" value={this.context.ad.apt_num ? this.context.ad.apt_num : this.state.apt_num} placeholder="If applicable"></input>

                        <label htmlFor="ad-listing-property-type">Space listing type</label>
                        <select id="ad-listing-property-type" name="type" value={this.context.ad.type ? this.context.ad.type : this.state.type} onChange={this.handleSelectInput}>
                            <option value="Room">Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <button type="button" onClick={this.toPostAd}>Create Listing</button>
                        <button>Manage Lsitings</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}