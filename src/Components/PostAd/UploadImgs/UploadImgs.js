import React from "react";
import "./UploadImgs.css";
import UserToken from "../../../Services/UserToken/UserToken";

import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";

export default class UploadImgs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            files: {},
            uploading: false,
            error: ""
        }
    }

    static contextType = PostAdContext;

    handleChange = (e)=>{
        const fileInputFiles = document.getElementById("post-ad-images").files;
        let files = this.state.files;

        console.log(fileInputFiles)
        
        for(let key of Object.keys(fileInputFiles)){
            console.log(key);
            if(!files[key]){
                files[key] = fileInputFiles[key];
            }
        }

        this.setState({
           files
        });
        console.log(files)

        console.log(fileInputFiles)
        this.handleUpload(files);
    }

    displayFileAmountMessage = ()=>{
        const files = this.state.files;
        let length = 0;
        console.log(files)

        for(let key of Object.keys(files)){
            if(key){
                length++;
            }
        };

        if(length === 0){
            return "No image has been selected"
        } else if( length > 0){
            return `${length} images selected`
        };
    }

    displayLoading = ()=>{
        return "Loading..."
    }

    handleUpload = (images)=>{
        const newImages = images;
        const formData = new FormData();

        for(let key of Object.keys(newImages)){
            console.log(newImages[key])
            formData.append(`images`, newImages[key]);
        };

        this.setState({
            uploading: true
        });

        console.log(formData);

        fetch("http://localhost:8000/api/living-space-images", {
                method: "POST",
                headers: {
                    
                    'authorization': `bearer ${UserToken.getToken()}`
                },
                body: formData
            })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);

                this.setState({
                    uploading: false
                });
            })
            .catch( err => {
                console.log(err);

                this.setState({
                    uploading: false
                });

                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        console.log(this.state.files)
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">Upload Images of your space <span>*</span></h4>

                <div className="post-ad-images-container">
                    
                    <label htmlFor="post-ad-images">{this.state.uploading ? this.displayLoading() : this.displayFileAmountMessage()}</label>
                    <input id="post-ad-images" name="images" type="file" onChange={this.handleChange} multiple={true}></input>        
                </div>
            </section>
        )
    }
}