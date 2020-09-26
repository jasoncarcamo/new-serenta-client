import React from "react";
import {Marker} from "@react-google-maps/api";
import AdInfo from "./AdInfo/AdInfo";
import AppContext from "../../../Contexts/AppContext/AppContext";

export default class CustomMarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleInfo: false,
            screenWidth: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){
    }

    handleResize = ()=>{
        const searchForm = document.getElementById("search-spaces-form");

        this.setState({
            screenWidth: window.innerWidth
        });

        window.addEventListener("resize", (e)=>{
            const screenWidth = window.innerWidth;
            this.setState({
                screenWidth
            });

            if(screenWidth >= 1030){
                searchForm.classList.remove("hide-search-space-form");
                
                return;
            } else{
                if(this.state.toggleInfo){
                    searchForm.classList.add("hide-search-space-form");
                }
            }
        }, {passive: false})
    }

    setMapPosition = ()=>{
        this.context.mapContext.setPosition(this.props.position);
    }

    closeAdInfo = ()=>{
        this.showSearchForm();
    }

    showAdInfo = ()=>{
        this.hideSearchForm();

        //center the map to the current ad's postion
        this.setMapPosition();
    }

    toggleInfo = ()=>{
        this.setState({
            toggleInfo: !this.state.toggleInfo
        });
    }

    hideSearchForm = ()=>{
        const searchForm = document.getElementById("search-spaces-form");
        const screenWidth = this.state.screenWidth;

        this.toggleInfo();

        searchForm.classList.add("hide-search-space-form");
    }

    showSearchForm = ()=>{
        const searchForm = document.getElementById("search-spaces-form");
        const screenWidth = this.state.screenWidth;

        this.toggleInfo();

        searchForm.classList.remove("hide-search-space-form");
    }
    
    renderMarker = ()=>{
        return <Marker onClick={this.showAdInfo} position={this.props.position} clusterer={this.props.clusterer}></Marker>;
    }

    renderAdInfo = ()=>{
        return <AdInfo position={this.props.position} closeAdInfo={this.closeAdInfo} ad={this.props.ad} zIndex={this.props.zIndex}></AdInfo>
    }

    

    render(){
        
        return this.state.toggleInfo === true ? this.renderAdInfo() : this.renderMarker();
    }
}