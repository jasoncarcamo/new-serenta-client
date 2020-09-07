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
        const fetchRequests = [];

        for(let key of Object.keys(newImages)){
            let formData = new FormData();

            formData.append("living_space_id", this.context.ad.id);
            formData.append(`images`, newImages[key]);
            console.log(newImages[key])
            fetchRequests[key] = fetch("http://localhost:8000/api/living-space-images", {
                method: "POST",
                headers: {
                    'authorization': `bearer ${UserToken.getToken()}`
                },
                body: formData
            });
        };

        console.log(fetchRequests);

        this.setState({
            uploading: true
        });

        Promise.all(fetchRequests)
            .then( responses => {
                console.log(responses);

                for( let i = 0; i < responses.length; i++){
                    console.log(responses[i]);
                    if(!responses[i].ok){
                        return responses[i].json().then( e => Promise.reject(e));
                    };
                };

                return Promise.all(responses.map(( response, index)=> response.json()));
            })
            .then( resDatas => {
                console.log(resDatas);
                this.setState({
                    uploading: false
                });
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    uploading: false
                });
            })
    }

    render(){
        console.log(this.context)
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