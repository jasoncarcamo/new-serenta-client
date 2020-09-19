import React from "react";
import UserToken from "../../Services/UserToken/UserToken";
import AppContext from "../../Contexts/AppContext/AppContext";

const UserContext = React.createContext({
    user: {},
    userImages: [],
    ads: [],
    loading: Boolean,
    refresh: ()=>{},
    addtoAds: ()=>{},
    removeFromAds: ()=>{},
    addImages: ()=>{},
    removeImage: ()=>{},
    resetState: ()=>{},
    handleLogIn: ()=>{},
    loading: Boolean
});

export default UserContext;

export class UserProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            userImages: [],
            ads: [],
            loading: false,
            error: ""
        };
    };

    static contextType = AppContext;

    componentDidMount(){
        this.getUserInfo();
    };

    removeImage = (ad, images, index)=>{
        const ads = this.state.ads;
        let newImages = images;
        const updateAd = ad;
        let adIndex = index;

        newImages = newImages.map((image, i)=>{
            return JSON.parse(image);
        });

        updateAd.images = newImages;

        ads[adIndex] = updateAd;

        this.setState({
            ads
        });

        return updateAd;
    }

    addImages = (ad, images)=>{
        const ads = this.state.ads
        const updateAd = ad;
        let adIndex = ads.indexOf(updateAd);

        for(let i = 0; i < images.length; i++){
            if(!updateAd.images.includes(images[i])){
                updateAd.images.push(images[i]);
            }
        };

        ads[adIndex] = updateAd;

        this.setState({
            ads
        });

        return updateAd;
    }

    handleLogIn = ()=>{

        this.getUserInfo();
    }   

    // resets this state when user signs out
    resetState = ()=>{
        this.setState({
            user: {},
            ads: [],
            loading: false,
            error: ""
        })
    }

    removeFromAds = (ad)=>{
        const ads = this.state.ads;
        let adIndex;
        const foundAd = ads.filter((currentAd, index)=>{
            if(currentAd.id === ad.id){

                adIndex = index;

                return currentAd;
            };
        });

        if(adIndex > -1){
            ads.splice(adIndex, 1);
        };

        this.setState({
            ads
        })
    }

    addToAds = (ad)=>{
        const ads = this.state .ads;

        ads.push(ad);

        this.setState({
            ads
        });
    }

    refresh = async ()=>{
        return await this.getUserInfo();
    }
    
    getUserInfo = async ()=>{
        if(UserToken.hasToken()){
            
            return await Promise.all([
                fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/user`, {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    }
                }),
                fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-space`, {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    }
                }),
                fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-space-images/user`, {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    }
                })
            ])
                .then(([userRes, userAdsRes, userImagesRes]) => {
                    if(!userRes.ok){
                        return userRes.json().then( e => Promise.reject(e));
                    };

                    if(!userAdsRes.ok){
                        return userAdsRes.json().then( e => Promise.reject(e));
                    };

                    if(!userImagesRes.ok){
                        return userImagesRes.json().then( e => Promise.reject(e));
                    };

                    return Promise.all([ userRes.json(), userAdsRes.json(), userImagesRes.json()]);
                })
                .then(([userData, userAdsData, userImagesData])=>{
                    let userAds = userAdsData.userAds.map((ad, i)=>{

                        for(let j = 0; j < ad.images.length; j++){
                            ad.images[j] = JSON.parse(ad.images[j]);
                        }

                        return ad;
                    });

                    this.setState({
                        user: userData.user,
                        ads: userAds,
                        userImages: userImagesData.userImages,
                    });
                    
                })
                .catch( err => {
                    this.setState({
                        error: err.error
                    });
                });
        }
    }

    render(){
        const value = {
            user: this.state.user,
            userImages: this.state.userImages,
            ads: this.state.ads,
            loading: this.state.loading,
            refresh: this.refresh,
            addToAds: this.addToAds,
            removeFromAds: this.removeFromAds,
            addImages: this.addImages,
            removeImage: this.removeImage,
            resetState: this.resetState,
            loading: this.state.loading,
            handleLogIn: this.handleLogIn
        };
        
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}