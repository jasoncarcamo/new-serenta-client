import React from "react";
import "./UploadImgs.css";
import UserToken from "../../../Services/UserToken/UserToken";
import AppContext from "../../../Contexts/AppContext/AppContext";
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

    static contextType = AppContext;

    handleChange = (e)=>{
        const fileInputFiles = document.getElementById("post-ad-images").files;
        let files = this.state.files;
        let newFiles = [];
        
        for(let key of Object.keys(fileInputFiles)){
            newFiles[key] = fileInputFiles[key];
        };

        this.setState({
           files: newFiles
        });

        this.handleUpload(newFiles);
    }

    displayFileAmountMessage = ()=>{
        const files = this.state.files;
        let length = 0;

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
        const fetchRequests = [];

        // loop through the image keys
        for(let key of Object.keys(newImages)){
            let formData = new FormData();

            formData.append("living_space_id", this.context.postAdContext.ad.id);
            formData.append(`images`, newImages[key]);

            fetchRequests[key] = fetch("http://localhost:8000/api/living-space-images", {
                method: "POST",
                headers: {
                    'authorization': `bearer ${UserToken.getToken()}`
                },
                body: formData
            });
        };

        this.setState({
            uploading: true
        });

        Promise.all(fetchRequests)
            .then( responses => {

                for( let i = 0; i < responses.length; i++){
                    if(!responses[i].ok){
                        return responses[i].json().then( e => Promise.reject(e));
                    };
                };

                return Promise.all(responses.map(( response, index)=> response.json()));
            })
            .then( resData => {
                this.setState({
                    uploading: false
                });

                this.context.userContext.addImagesToAd(this.context.postAdContext.ad, resData[0].images);
            })
            .catch( err => {
                this.setState({
                    uploading: false
                });
            })
    }

    render(){
        
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