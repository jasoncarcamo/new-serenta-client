import React from "react";
import ReactLoading from "react-loading";
import "./ReactLoadingIcon.css";

export default class ReactLoadingIcon extends React.Component{
    render(){
        return <ReactLoading className="loading-icon" type={"spinningBubbles"} color={"grey"}/>;
    };
}