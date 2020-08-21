import React from "react";
import PostAdContext from "../../../../Contexts/PostAdContext/PostAdContext";
import "./SpaceInfo.css";

export default class SpaceInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bedrooms: 1,
            bathrooms: 1,
            squareft: ""
        };
    }

    static contextType = PostAdContext;

    handleSelectInput = (e)=>{
        
        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleSelectInput(e);
    }

    handleTextInput = (e)=>{

        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleSelectInput(e);
    }

    render(){
        console.log(this.state)
        return (
            <section className="post-ad-space-info">
                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Bed Rooms <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <select className="post-ad-select" value={this.context.ad.bedrooms ? this.context.ad.bedrooms : this.state.bedrooms} onChange={this.handleSelectInput} name="bedrooms">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </section>

                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Bath Rooms <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <select className="post-ad-select" value={this.context.ad.bathrooms ? this.context.ad.bathrooms : this.state.bathrooms} onChange={this.handleSelectInput} name="bathrooms">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </section>

                <section className="post-ad-space-info-option">
                    <h4 className="post-ad-header">Square Feet <span>*</span></h4>
                    <div className="post-ad-space-info-option-container">
                        <input type="text" id="post-ad-squareft" name="squareft" value={this.context.ad.squareft ? this.context.ad.squareft : this.state.squareft} onChange={this.handleTextInput}/>
                        <p className="post-ad-squareft-label">sq ft</p>
                    </div>
                </section>
            </section>
        );
    };
};