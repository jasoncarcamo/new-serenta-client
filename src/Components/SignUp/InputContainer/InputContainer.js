import React from "react";
import "./InputContainer.css";

export default class InputContainer extends React.Component{

    render(){
        return (
            <>
                {this.props.children}
            </>
        )
    }
}