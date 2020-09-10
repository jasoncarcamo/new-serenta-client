import React from "react";
import AppContext from "../../../../../Contexts/AppContext/AppContext";
import UserToken from "../../../../../Services/UserToken/UserToken";
import "./UploadedImage.css";

export default class UploadedImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: ""
        };
    }

    static contextType = AppContext;

    handleDelete = ()=>{
        const living_space_id = this.context.postAdContext.ad.id;

        fetch(`http://localhost:8000/api/living-space-images/${living_space_id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify({
                image: this.props.image
            })
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
                this.context.userContext.addImagesToAd(this.context.postAdContext.ad, resData.updatedSpace.images);
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        console.log(this.context.postAdContext.ad.id);
        return (
            <div className="uploaded-image-container">
                <img src={this.props.image} alt="upload image" className="uploaded-image"/>
                <button type="button" onClick={this.handleDelete} className="uploaded-image-btn">Delete</button>
            </div>
        );
    };
}