import React from "react";

const PostAdContext = React.createContext({
    ad: {},
    adListing: Boolean,
    managingListings: Boolean,
    handleAddressInput: ()=>{},
    handleRadioInput: ()=>{},
    handleCheckboxInput: ()=>{},
    handleTextInput: ()=>{},
    handleSelectInput: ()=>{},
    toggleAdListing: ()=>{}
});

export default PostAdContext;

export class PostAdProvider extends React.Component{
    constructor(props){
        super(props);
        this. state = {
            address: "",
            ad: {
                street_address: "",
                apt_num: "",
                city: "",
                state: "",
                country: "",
                zip_code: "",
                type: "Room",
                price: "",
                deposit: "",
                bedrooms: 1,
                bathrooms: 1,
                squareft: "",
                ac: "Not included",
                wifi: "Not included",
                cable: "Not included",
                pets: "No pets",
                parking: ["Not available"],
                washer: "Not included",
                dryer: "Not included",
                comments: ""
            },
            adListing: false,
            managingListings: false
        };
    };

    handleAddressInput = (address)=>{
        let newAddress = address.split(", ");
        const ad = this.state.ad;

        if(newAddress.length > 2){
            ad.street_address = newAddress[0];
            ad.city = newAddress[1];
            ad.state = newAddress[2].split(" ")[0];
            ad.country = newAddress[newAddress.length - 1]
            ad.zip_code = newAddress[2].split(" ")[1];
        }

        this.setState({
            address,
            ad
        })

    }

    handleRadioInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    };

    handleCheckboxInput = (e)=>{
        const ad = this.state.ad;
        let infoIndex = ad[e.target.name].indexOf(e.target.value);

        if(e.target.checked){
            if(infoIndex === -1){
                ad[e.target.name].push(e.target.value);
            }
        } else{
            if(infoIndex > -1){
                ad[e.target.name].splice(infoIndex, 1);
            }
        };

        this.setState({
            ad
        });

    }

    handleTextInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    }

    handleSelectInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    }

    toggleAdListing = ()=>{
        this.setState({
            adListing: !this.state.adListing
        });
    }

    render(){
        const value = {
            ad: this.state.ad,
            adListing: this.state.adListing,
            managingListings: this.state.managingListings,
            address: this.state.address,
            handleAddressInput: this.handleAddressInput,
            handleRadioInput: this.handleRadioInput,
            handleCheckboxInput: this.handleCheckboxInput,
            handleTextInput: this.handleTextInput,
            handleSelectInput: this.handleSelectInput,
            toggleAdListing: this.toggleAdListing
        };
        console.log(value);
        return (
            <PostAdContext.Provider value={value}>
                {this.props.children}
            </PostAdContext.Provider>
        )
    }
} 