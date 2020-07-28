import React from "react";
import DocTitleService from "../../Services/DocTitleService/DocTitleService";

export default class About extends React.Component{
    componentDidMount(){
        // Set document title to About
        DocTitleService.setDocTitle("We are proud to help make connections between clients and customers.");

    }
    render(){
        return (
            <section>
                <h2>About</h2>
            </section>
        );
    };
};