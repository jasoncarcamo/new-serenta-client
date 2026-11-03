import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import "./SearchSpacesInput.css";
import MapContext from "../../../Contexts/MapContext/MapContext";

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
        const commaCount = (address.match(/,/g) || []).length;

        if (commaCount === 0) {
            return 4;
        }

        if (commaCount === 1) {
            return 8;
        }

        return 14;
    };

    searchArea = async (address) => {
        const searchAddress = address.trim();

        if (!searchAddress) {
            this.setState({
                error: "Please enter a location."
            });

            return;
        }

        this.setState({
            searching: true,
            error: ""
        });

        try {
            const results = await geocodeByAddress(searchAddress);

            if (!results || results.length === 0) {
                throw new Error("Location not found.");
            }

            const { lat, lng } = await getLatLng(results[0]);
            const zoom = this.getZoomLevel(searchAddress);

            let polygonCoordinates = null;

            try {
                const polygonResponse = await fetch(
                    `https://nominatim.openstreetmap.org/search?` +
                    `q=${encodeURIComponent(searchAddress)}` +
                    `&polygon_geojson=1&format=json`
                );

                if (!polygonResponse.ok) {
                    throw new Error("Unable to retrieve area boundaries.");
                }

                const polygonData = await polygonResponse.json();

                if (
                    Array.isArray(polygonData) &&
                    polygonData.length > 0 &&
                    polygonData[0].geojson &&
                    polygonData[0].geojson.coordinates
                ) {
                    polygonCoordinates = polygonData[0].geojson.coordinates;
                }
            } catch (polygonError) {
                console.error("Polygon lookup failed:", polygonError);
            }

            this.context.searchArea(lat, lng, zoom);

            if (polygonCoordinates) {
                this.context.setPath(polygonCoordinates);
            } else {
                this.context.setPath([]);
            }

            this.props.history.push("/find-rent");
        } catch (error) {
            this.setState({
                error: error.message || "Unable to search this location."
            });
        } finally {
            this.setState({
                searching: false
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.searching) {
            return;
        }

        this.searchArea(this.state.address);
    };

    render() {
        const { address, searching, error } = this.state;

        return (
            <section
                id="lp-search-spaces-section"
                aria-label="Search rental properties"
            >
                <form
                    id="lp-search-spaces-form"
                    onSubmit={this.handleSubmit}
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
                            <div className="lp-search-spaces-wrapper">
                                <div id="lp-input-container">
                                    <label
                                        htmlFor="lp-search-spaces-input"
                                        className="lp-search-spaces-label"
                                    >
                                        Search by city, neighborhood, or address
                                    </label>

                                    <div className="lp-search-spaces-control">
                                        <input
                                            {...getInputProps({
                                                placeholder: "Where do you want to live?",
                                                className: "location-search-input",
                                                id: "lp-search-spaces-input",
                                                autoComplete: "off",
                                                "aria-describedby": error
                                                    ? "lp-search-error"
                                                    : undefined
                                            })}
                                        />

                                        <button
                                            type="submit"
                                            disabled={searching}
                                        >
                                            {searching ? "Searching..." : "Search"}
                                        </button>
                                    </div>
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
                            id="lp-search-error"
                            className="lp-search-error"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}
                </form>
            </section>
        );
    }
}