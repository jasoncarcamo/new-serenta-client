import React from "react";
import AppContext from "../../../../../Contexts/AppContext/AppContext";
import UserToken from "../../../../../Services/UserToken/UserToken";
import "./UploadedImage.css";

export default class UploadedImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deleteing: false,
            error: ""
        };
    }

    static contextType = AppContext;

    handleDelete = ()=>{
        const living_space_id = this.context.postAdContext.ad.id;

        this.setState({
            deleteing: true
        });

        fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-space-images/${this.props.image.id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify({
                image_name: this.props.image.image_name
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                const updatedAd = this.context.userContext.removeImage(resData.updatedSpaceAd, resData.updatedSpaceAd.images, this.context.postAdContext.adIndex);

                this.context.postAdContext.setCurrentAd(updatedAd);
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        console.log(this.context)
        return (
            <div className="uploaded-image-container">
                <img src={this.props.image.url || ""} alt="upload image" className="uploaded-image"/>
                <button type="button" onClick={this.handleDelete} className="uploaded-image-btn">Delete</button>
            </div>
        );
    };
}