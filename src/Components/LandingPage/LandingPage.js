import React from "react";
import "./LandingPage.css";
import SearchSpacesInput from "./SearchSpacesInput/SearchSpacesInput";

export default class LandingPage extends React.Component {
    render() {
        return (
            <main id="landing-page" className="landing-page">
                <section
                    className="landing-page__hero"
                    aria-labelledby="landing-page-title"
                >
                    <div className="landing-page__content">
                        <span className="landing-page__eyebrow">
                            Find your next space
                        </span>

                        <h1
                            id="landing-page-title"
                            className="landing-page__title"
                        >
                            Find a place that feels like home.
                        </h1>

                        <p className="landing-page__description">
                            Discover rental properties and explore spaces
                            that fit your lifestyle.
                        </p>

                        <div className="landing-page__search">
                            <SearchSpacesInput history={this.props.history} />
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}