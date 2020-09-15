import React from "react";
import LivingRoomWide from "../../../../../assets/livingroomwide.jpg";
import LivingRoom from "../../../../../assets/livingroom.jpg";
import "./ImgSlider.css";
import AppContext from "../../../../../Contexts/AppContext/AppContext";

export default class ImgSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: this.props.images,
            imgIndex: 0
        };
    }

    static contextType = AppContext;

    componentDidMount(){

        let userImages = [];
        console.log(this.props, this.context)
        for(let i = 0; i < this.props.images; i++){
            if(this.props.images[i].living_space_id === this.props.ad.id){
                userImages.push(this.props.images[i]);
            }
        }

        this.setState({
            images: userImages
        });
    }

    leftButton = ()=>{
        let imgIndex = this.state.imgIndex;
        const leftButton = document.getElementsByClassName("ad-info-img-btn-left")[0];
        const rightButton = document.getElementsByClassName("ad-info-img-btn-right")[0];

        if(this.props.images.length <= 1){
            return;
        }
        
        imgIndex--;

        // check and remove fade button style from right button
        if(rightButton.classList.contains("fade-btn")){
            rightButton.classList.remove("fade-btn");
        };

        if(imgIndex <= 0){
            imgIndex = 0;

            // fade left button to signify restriction of pressing
            leftButton.classList.add("fade-btn");
        };

        this.setState({
            imgIndex
        });
    };

    rightButton = ()=>{
        let imgIndex = this.state.imgIndex;
        let length = this.props.images.length;
        const rightButton = document.getElementsByClassName("ad-info-img-btn-right")[0];
        const leftButton = document.getElementsByClassName("ad-info-img-btn-left")[0];

        if(this.props.images.length <= 1){
            return;
        }

        imgIndex++;

        // check and remove fade button style from left button
        if(leftButton.classList.contains("fade-btn")){
            leftButton.classList.remove("fade-btn");
        };

        if(imgIndex >= length - 1){
            imgIndex = length - 1;

            // fade right button to signify restriction of pressing
            rightButton.classList.add("fade-btn");
        };

        this.setState({
            imgIndex
        });
    };

    renderImg = (imgs)=>{

        return <img src={!imgs[this.state.imgIndex].url ? LivingRoom : imgs[this.state.imgIndex].url} alt="" className="ad-info-img"/>
    };

    render(){
        console.log(this.props)
        return (
            <section className="ad-info-img-container">
                <button onClick={this.leftButton} className="ad-info-img-btn-left fade-btn">{"<"}</button>
                
                {this.renderImg(this.props.images)}

                <button onClick={this.rightButton} className={(this.props.images.length <= 1 ? "ad-info-img-btn-right fade-btn" : "ad-info-img-btn-right") }>{">"}</button>
            </section>
        )
    }
}