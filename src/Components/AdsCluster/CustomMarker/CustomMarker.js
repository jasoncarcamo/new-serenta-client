import React from "react";
import {Marker} from "@react-google-maps/api";
import AdInfo from "./AdInfo/AdInfo";

export default class CustomMarker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleInfo: false,
            screenWidth: ""
        }
    }

    componentDidMount(){
        this.handleResize();
    }

    handleResize = ()=>{
        const searchForm = document.getElementById("search-spaces-form");

        this.setState({
            screenWidth: window.innerWidth
        });

        window.addEventListener("resize", (e)=>{
            const screenWidth = window.innerWidth
            console.log(document.getElementsByClassName("ad-info-container"))
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
        })
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

        if(screenWidth >= 1030){
            
            return;
        }

        searchForm.classList.add("hide-search-space-form");
    }

    showSearchForm = ()=>{
        const searchForm = document.getElementById("search-spaces-form");
        const screenWidth = this.state.screenWidth;

        this.toggleInfo();

        if(screenWidth >= 1030){
            
            return;
        }

        searchForm.classList.remove("hide-search-space-form");
    }
    
    renderMarker = ()=>{
        return <Marker onClick={this.hideSearchForm} position={this.props.position} clusterer={this.props.clusterer}></Marker>;
    }

    renderAdInfo = ()=>{
        return <AdInfo position={this.props.position} toggleInfo={this.toggleInfo}  showSearchForm={this.showSearchForm} ad={this.props.ad} zIndex={this.props.zIndex}></AdInfo>
    }

    

    render(){
        console.log(this.state)
        return this.state.toggleInfo === true ? this.renderAdInfo() : this.renderMarker();
    }
}