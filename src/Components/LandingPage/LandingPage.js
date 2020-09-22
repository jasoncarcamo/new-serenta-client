import React from "react";
import "./LandingPage.css";
import SearchSpacesInput from "./SearchSpacesInput/SearchSpacesInput";

export default class LandingPage extends React.Component{
    render(){
        return (
            <section id="landing-page-section">
                <SearchSpacesInput history={this.props.history}/>
            </section>
        )
    }
}