
import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MapContext from "../../Contexts/MapContext/MapContext";
import "./SearchSpacesInput.css";

export default class SearchSpacesInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: "",
            searching: false,
            error: ""
        };
    }

    static contextType = MapContext;

    handleChange = (address) => {
        this.setState({
            address,
            error: ""
        });
    };

    handleSelect = (address) => {
        this.setState({
            address
        }, () => {
            this.searchArea(address);
        });
    };

    getZoomLevel = (address) => {
        const commas = (address.match(/,/g) || []).length;

        if (commas === 0) {
            return 4;
        }

        if (commas === 1) {
            return 8;
        }

        return 14;
    };

    searchArea = async (address) => {
        const searchAddress = address.trim();

        if (!searchAddress || this.state.searching) {
            if (!searchAddress) {
                this.setState({
                    error: "Please enter a location."
                });
            }

            return;
        }

        this.setState({
            searching: true,
            error: ""
        });

        try {
            const results = await geocodeByAddress(searchAddress);

            if (!results || results.length === 0) {
                throw new Error("We couldn't find that location.");
            }

            const { lat, lng } = await getLatLng(results[0]);
            const zoom = this.getZoomLevel(searchAddress);

            let polygonCoordinates = [];

            try {
                const response = await fetch(
                    "https://nominatim.openstreetmap.org/search?" +
                    new URLSearchParams({
                        q: searchAddress,
                        polygon_geojson: "1",
                        format: "json"
                    }).toString()
                );

                if (!response.ok) {
                    throw new Error("Unable to retrieve area boundaries.");
                }

                const data = await response.json();

                if (
                    Array.isArray(data) &&
                    data.length > 0 &&
                    data[0].geojson &&
                    data[0].geojson.coordinates
                ) {
                    polygonCoordinates = data[0].geojson.coordinates;
                }
            } catch (polygonError) {
                console.error("Boundary lookup failed:", polygonError);
            }

            this.context.searchArea(lat, lng, zoom);
            this.context.setPath(polygonCoordinates);

        } catch (error) {
            this.setState({
                error: error.message || "Unable to search this area."
            });
        } finally {
            this.setState({
                searching: false
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.searchArea(this.state.address);
    };

    render() {
        const { address, searching, error } = this.state;

        return (
            <form
                id="search-spaces-form"
                onSubmit={this.handleSubmit}
                role="search"
                aria-label="Search rental locations"
            >
                <PlacesAutocomplete
                    value={address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                    }) => (
                        <div id="search-spaces-input-container">
                            <label
                                htmlFor="search-spaces-input"
                                className="search-spaces-label"
                            >
                                Search locations
                            </label>

                            <div id="input-container">
                                <input
                                    {...getInputProps({
                                        placeholder: "City, town, or neighborhood...",
                                        className: "location-search-input",
                                        id: "search-spaces-input",
                                        "aria-label": "Search locations",
                                        "aria-describedby": error
                                            ? "search-spaces-error"
                                            : undefined
                                    })}
                                />

                                <button
                                    type="submit"
                                    className="search-spaces-button"
                                    aria-label="Search area"
                                    disabled={searching}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>

                            {(loading || suggestions.length > 0) && (
                                <div className="autocomplete-dropdown-container">
                                    {loading && (
                                        <p className="autocomplete-loading">
                                            Finding locations...
                                        </p>
                                    )}

                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.placeId}
                                            {...getSuggestionItemProps(suggestion, {
                                                className: suggestion.active
                                                    ? "suggestion-item suggestion-item--active"
                                                    : "suggestion-item"
                                            })}
                                        >
                                            {suggestion.description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </PlacesAutocomplete>

                {error && (
                    <p
                        id="search-spaces-error"
                        className="search-spaces-error"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </form>
        );
    }
}
