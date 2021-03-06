import React from "react";
import AppContext from "../../../../Contexts/AppContext/AppContext";
import UploadedImage from "./UploadedImage/UploadedImage";

export default class UploadedImages extends React.Component{

    static contextType = AppContext;

    renderUploadedImages = ()=>{
        let images = this.props.images;

        if(!images){
            return;
        };
        
        images = images.map((image, index)=>{
            if(image.living_space_id === this.context.postAdContext.ad.id){
                return <UploadedImage key={index} image={image} index={index}/>
            }
        });

        return images;

    }

    render(){

        return (
            <div>
                {this.renderUploadedImages()}
            </div>
        );
    };
};