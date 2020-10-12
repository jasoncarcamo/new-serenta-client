import React from "react";
import "./UploadImgs.css";
import UserToken from "../../../Services/UserToken/UserToken";
import AppContext from "../../../Contexts/AppContext/AppContext";
import UploadedImages from "./UploadedImages/UploadedImages";
import ImageCompression from 'browser-image-compression';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import ReactLoadingIcon from "../../ReactLoadingIcon/ReactLoadingIcon";

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

    componentDidMount(){
        this.handleLabelAnimation();
    }

    toggleLoading = ()=>{
        this.props.toggleLoading();
    }

    handleChange = (e)=>{
        const fileInputFiles = document.getElementById("post-ad-images").files;
        let newFiles = [];

        this.toggleLoading();
        
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

    handleUpload = async (images)=>{
        const newImages = images;
        const fetchRequests = [];

        this.setState({
            uploading: true
        });

        // loop through the image keys
        for(let key of Object.keys(newImages)){
            let formData = new FormData();
            const options = {
                maxSizeMB: 50000,
                maxWidthOrHeight: 5920,
                useWebWorker: true
            };
            const compressedImage = await ImageCompression(newImages[key], options);

            formData.append("living_space_id", this.context.postAdContext.ad.id);
            formData.append("image_name", compressedImage.name);
            formData.append(`images`, compressedImage)
            formData.append("ImageFiles", newImages);

            fetchRequests[key] = fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-space-images`, {
                method: "POST",
                headers: {
                    'authorization': `bearer ${UserToken.getToken()}`
                },
                body: formData
            });
        };

        Promise.all(fetchRequests)
            .then( responses => {

                for( let i = 0; i < responses.length; i++){
                    if(!responses[i].ok){
                        return responses[i].json().then( e => Promise.reject(e));
                    };
                };

                return Promise.all(responses.map(( response, index)=> response.json()));
            })
            .then( async resData => {
                let images = [];

                resData.forEach((res, i)=>{
                    images[i] = res.createdImage;
                });

                const updatedAd = this.context.userContext.addImages(this.context.postAdContext.ad, images);

                fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-space/${updatedAd.id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    },
                    body: JSON.stringify(updatedAd)
                })
                    .then( imageUploaded => {
                        if(!imageUploaded.ok){
                            return imageUploaded.json().then( e => Promise.reject(e));
                        };

                        return imageUploaded.json();
                    })
                    .then( uploadedData => {

                        this.setState({
                            uploading: false
                        });

                        this.toggleLoading();

                    })
                    .catch( uploadErr => {

                        this.setState({
                            error: uploadErr.error
                        });

                        this.toggleLoading();

                    });
            })
            .catch( err => {
                this.setState({
                    uploading: false
                });

                this.toggleLoading();
            });
    }

    isInViewport = (element)=>{
        var rect = element.getBoundingClientRect();
        var html = document.documentElement;

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    };

    handleLabelAnimation =()=>{
        const label = document.querySelector(".post-ad-images-container label");

        window.addEventListener("scroll", (e)=>{
            if(this.isInViewport(label)){
                label.classList.add("animate-label");
            }
        })
    }

    render(){
        
        return (
            <section className="post-ad-amenities-info">
                <h4 className="post-ad-header">Upload Images of your space <span>*</span></h4>

                <div className="post-ad-images-container">
                    
                    <label htmlFor="post-ad-images">
                        {this.state.uploading ? <ReactLoadingIcon/> : <FontAwesomeIcon className="post-ad-image-icon" icon={faUpload}></FontAwesomeIcon>}
                    </label>
                    <input id="post-ad-images" name="images" type="file" onChange={this.handleChange} multiple={true}></input> 
                    <p className="post-ad-images-hint">* For the best user experience please upload images in landscape mode</p>       
                </div>

                <UploadedImages images={this.context.postAdContext.ad.images}/>
            </section>
        )
    }
}