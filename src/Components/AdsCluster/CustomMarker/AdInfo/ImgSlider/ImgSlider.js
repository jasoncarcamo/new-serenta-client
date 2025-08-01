import React from "react";
import LivingRoom from "../../../../../Assets/livingroom.jpg";
import "./ImgSlider.css";
import AppContext from "../../../../../Contexts/AppContext/AppContext";

export default class ImgSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: this.props.images,
            imgIndex: 0,
            displayImage: false,
            imageSrc: ""
        };
    }

    static contextType = AppContext;

    componentDidMount(){
        let userImages = [];

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

    renderFirstImg = (imgs)=>{
        return <img src={imgs[0].url} alt="" className="ad-info-img" onClick={this.fullScreenImg}/>;
    }

    renderImgs = (imgs)=>{

        let images = imgs;

        images = images.map((image, index)=>{

            return <img src={image.url} key={index} alt="" className="ad-info-img" onClick={this.fullScreenImg}/>
        });

        return images;
    };

    fullScreenImg = (e)=>{
        this.setState({
            displayImage: true,
            imageSrc: e.target.src
        });
    }

    displayFullScreenImg = ()=>{
        return (
            <div className="full-screen-img-container">
                <button className="full-screen-close-btn" onClick={this.closeFullScreen}>X</button>

                <img src={this.state.imageSrc} alt="" className="ad-info-img-full-screen" onClick={this.fullScreenImg}/>
            </div>
        )
    }

    closeFullScreen = ()=>{
        this.setState({
            displayImage: false,
            imageSrc: ""
        });
    }

    render(){
        
        return (
            <section className="ad-info-img-container">

                {this.renderFirstImg(this.props.images)}

                {this.state.displayImage === true ? this.displayFullScreenImg() : ""}

                <div className="ad-info-grid">
                    {this.renderImgs(this.props.images.slice(1))}
                </div>
                
            </section>
        )
    }
}