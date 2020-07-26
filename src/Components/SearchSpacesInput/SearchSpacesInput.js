import React from "react";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import "./SearchSpacesInput.css";

export default class SearchSpacesInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: ""
        }
    }

    render(){
        return (
            <form id="search-spaces-form">
                <fieldset id="search-spaces-fieldset">
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={address => this.setState({address})}
                        onSelect={address => {this.setState({address})}}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div id="search-spaces-input-container">

                                    <div id="input-container">
                                        <input
                                        {...getInputProps({
                                            placeholder: 'Search areas...',
                                            className: 'location-search-input',
                                            id: "search-spaces-input"
                                        })}
                                        />

                                        <button>Search</button>
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
                                            <li
                                                key={index}
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
        )
    }
}