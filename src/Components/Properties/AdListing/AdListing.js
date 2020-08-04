import React from "react";
import PostAdContext from "../../../Contexts/PostAdContext/PostAdContext";

export default class AdListing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            type: "Room"
        };
    };

    static contextType = PostAdContext;

    componentDidMount(){
        
    }

    handleTextInput = (e)=>{

        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleTextInput(e);
    }

    handleSelectInput = (e)=>{

        this.setState({
            [e.target.name]: e.target.value
        });

        this.context.handleSelectInput(e);
    }

    toPostAd = ()=>{
        console.log(this.context)
        this.props.history.push("/post-ad")
    }

    render(){
        console.log(this.context)
        return (
            <section>
                <form>
                    <legend>
                        <h3>Add Property</h3>
                    </legend>
                    <fieldset>
                        <label htmlFor="ad-listing-street-address">Property Address</label>
                        <input type="text" name="address" value={this.state.address} onChange={this.handleTextInput}/>

                        <label htmlFor="ad-listing-property-type">Space listing type</label>
                        <select id="ad-listing-property-type" name="type" value={this.context.ad.type ? this.context.ad.type : this.state.type} onChange={this.handleSelectInput}>
                            <option value="Room">Room</option>
                            <option value="Apartment">Apartment</option>
                        </select>

                        <button type="button" onClick={this.toPostAd}>Create Listing</button>
                        <button>Manage Lsitings</button>
                    </fieldset>
                </form>
            </section>
        )
    }
}