import React from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import "./SearchSpacesInput.css";
import MapContext from "../../../Contexts/MapContext/MapContext";

export default class SearchSpacesInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: ""
        }
    }

    static contextType = MapContext;

    componentDidMount(){
    }    

    handleChange = (address)=>{
        this.setState({
            address
        });
    };

    handleSelect = (address)=>{
        this.handleChange(address);
        this.searchArea(address)
    }

    searchArea = (newAddress)=>{
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

                fetch(`https://nominatim.openstreetmap.org/search.php?q=${address}&polygon_geojson=1&format=json`)
                    .then( polygonRes => {
                        if(!polygonRes.ok){
                            return polygonRes.json().then( e => Promise.reject(e));
                        }

                        return polygonRes.json();
                    })
                    .then( polygonData => {
                        this.context.searchArea(resData.results[0].geometry.location.lat, resData.results[0].geometry.location.lng, zoom);
                        this.context.setPath(polygonData[0].geojson.coordinates);

                        this.props.history.push("/find-rent");
                    })
                    .catch( polygonError => console.log(polygonError));

            })
            .catch( err => this.setState({ error: err}))
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        
        this.searchArea(this.state.address);
    }

    render(){
        
        return (
            <section id="lp-search-spaces-section">
                <form id="lp-search-spaces-form" onSubmit={this.handleSubmit}>
                    <fieldset id="lp-search-spaces-fieldset">
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div id="lp-search-spaces-input-container">

                                        <div id="lp-input-container">
                                            <input
                                            {...getInputProps({
                                                placeholder: "Where do you want to live?",
                                                className: 'location-search-input',
                                                id: "lp-search-spaces-input"
                                            })}
                                            />

                                            <button type="submit">Search</button>
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
                                                    style
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
                    </fieldset>
                </form>
            </section>
        )
    }
}