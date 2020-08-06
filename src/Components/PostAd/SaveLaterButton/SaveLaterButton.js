import React from "react";
import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";

export default class SaveLaterButton extends React.Component{
    constructor(props){
        super(props);
        this. state = {
            saving: false,
            saved: false,
            error: ""
        };
    };

    static contextType = PostAdContext;

    handleSave = (e)=>{

        this.setState({
            saving: true
        });

        this.context.handlePatchAd()
            .then( resData => {
                this.setState({
                    saving: false,
                    saved: true
                });

                this.handleSuccessSave();
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    saving: false,
                    error: err.error
                });
            })
    };

    renderSaveButton = ()=>{
        return <button type="button" onClick={this.handleSave}>Save for later</button>;
    };

    renderSaved = ()=>{
        return <p>Saved!</p>;
    }

    renderLoading = ()=>{
        return <p>Loading...</p>;
    };

    // this will revert saved message back to button after 2.5 seconds on successful save
    handleSuccessSave = ()=>{
        setTimeout(()=>{
            this.setState({
                saved: false
            });
        }, 2500);
    };

    render(){
        return(
            <>
                {this.state.saving ? this.renderLoading() : ""}
                {this.state.saved ? this.renderSaved() : this.renderSaveButton()}
            </>
        )
    }
}