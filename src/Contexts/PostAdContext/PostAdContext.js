import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const PostAdContext = React.createContext({
    ad: {},
    address: "",
    adListing: Boolean,
    managingListings: Boolean,
    handleAddressInput: ()=>{},
    handleRadioInput: ()=>{},
    handleCheckboxInput: ()=>{},
    handleTextInput: ()=>{},
    handleSelectInput: ()=>{},
    toggleAdListing: ()=>{},
    setAdDefault: ()=>{},
    setCurrentAd:()=>{},
    handlePostAd: ()=>{},
    handlePatchAd: ()=>{}
});

export default PostAdContext;

export class PostAdProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
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


    // handles saving the instance of the current ad
    handlePatchAd = async ()=>{
        return fetch(`http://localhost:8000/api/living-space/${this.state.ad.id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify(this.state.ad)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json();
            })
    }

    // handles the instance of creating an ad
    // POST request to create and save current ad
    handlePostAd = async ()=>{
        return fetch(`http://localhost:8000/api/living-space`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${UserToken.getToken()}`
            },
            body: JSON.stringify(this.state.ad)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json();
            })
    }

    // sets this.state.ad to default data
    setAdDefault = ()=>{
        this.setState({
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
            }
        })
    }

    // sets current ad when editing and posting an ad
    setCurrentAd = (ad)=>{

        // sets the state new address 
        this.convertAdInfoAddress(ad);

        this.setState({
            ad
        });
    }

    // converts ad info into address string then sets new state address
    convertAdInfoAddress = (ad)=>{
        const {
            street_address,
            city,
            state,
            zip_code
        } = ad;

        this.setState({
            address: `${street_address}, ${city} ${zip_code}, ${state}`
        });
    }

    // handles address input form our start ad form in /properties
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
        });

    }

    // handles radio inputs from our post ad form
    handleRadioInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    }

    // handles checkbox inputs form our post ad form
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

    // handles text inputs in our post form
    handleTextInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    }


    // handles select inputs in our post ad form
    handleSelectInput = (e)=>{
        const ad = this.state.ad;

        ad[e.target.name] = e.target.value;

        this.setState({
            ad
        });
    }

    // toggles start ad post form in /properties
    toggleAdListing = ()=>{
        this.setState({
            adListing: !this.state.adListing
        });
    }

    render(){
        const value = {
            ad: this.state.ad,
            address: "",
            adListing: this.state.adListing,
            managingListings: this.state.managingListings,
            address: this.state.address,
            handleAddressInput: this.handleAddressInput,
            handleRadioInput: this.handleRadioInput,
            handleCheckboxInput: this.handleCheckboxInput,
            handleTextInput: this.handleTextInput,
            handleSelectInput: this.handleSelectInput,
            toggleAdListing: this.toggleAdListing,
            setAdDefault: this.setAdDefault,
            setCurrentAd: this.setCurrentAd,
            handlePostAd: this.handlePostAd,
            handlePatchAd: this.handlePatchAd
        };
        console.log(value);

        return (
            <PostAdContext.Provider value={value}>
                {this.props.children}
            </PostAdContext.Provider>
        )
    }
} 