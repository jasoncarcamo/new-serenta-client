import React from "react";
import "./UploadImgs.css";

export default class UploadImgs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

    handleChange = (e)=>{
        const fileInputFiles = document.getElementById("post-ad-images").files;
        let files = this.state.files;

        console.log(Array.from(fileInputFiles));
        
        Array.from(fileInputFiles).forEach((file, index)=>{
            if(!Array.from(files).includes(file)){
                files.push(file);
            };
        });

        console.log(fileInputFiles);
        this.setState({
           files
        });
    }

    displayFileAmountMessage = ()=>{
        const files = this.state.files;

        if(files.length === 0){
            return "No image has been selected"
        } else if( files.length > 0){
            return `${files.length} images selected`
        };
    }

    render(){
        console.log(this.state.files)
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">Upload Images of your space <span>*</span></h4>

                <div className="post-ad-images-container">
                    
                    <label htmlFor="post-ad-images">{this.displayFileAmountMessage()}</label>
                    <input id="post-ad-images" type="file" onChange={this.handleChange} multiple={true}></input>        
                </div>
            </section>
        )
    }
}