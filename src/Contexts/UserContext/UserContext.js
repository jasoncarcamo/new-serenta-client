import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const UserContext = React.createContext({
    user: {},
    userImages: [],
    ads: [],
    loading: Boolean,
    refresh: ()=>{},
    addtoAds: ()=>{},
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

    componentDidMount(){
        this.getUserInfo()
            .then(([userData, userAdsData, userImagesData])=>{

                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds,
                    userImages: userImagesData.userImages,
                });
                
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    };

    removeImage = (image)=>{
        const userImages = this.state.userImages;
        const imageIndex = userImages.indexOf(image);

        for(let i = 0; i < userImages.length; i++){
            if(userImages[i].id === image.id){
                userImages.splice(i, 1);
            }
        }

        this.setState({
            userImages
        });
    }

    addImages = (images)=>{
        let userImages = this.state.userImages;

        for(let i = 0; i < images.length; i++){
            if(!userImages.includes(images[i])){
                userImages.push(images[i]);
            }
        };

        this.setState({
            userImages
        });
    }

    handleLogIn = ()=>{
        this.setState({
            loading: true
        });

        this.getUserInfo()
            .then(([userData, userAdsData, userImagesData])=>{
                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds,
                    userImages: userImagesData.userImages,
                    loading: false
                });
                
            })
            .catch( err => {
                this.setState({
                    loading: false,
                    error: err.error
                })
            });
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

    addToAds = (ad)=>{
        const ads = this.state .ads;

        ads.push(ad);

        this.setState({
            ads
        });
    }

    refresh = async ()=>{
        this.getUserInfo()
            .then(([userData, userAdsData, userImagesData])=>{

                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds,
                    userImages: userImagesData.userImages
                });

                return true;
                
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });

                return false;
            });
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