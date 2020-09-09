import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const UserContext = React.createContext({
    user: {},
    ads: [],
    loading: Boolean,
    refresh: ()=>{},
    addtoAds: ()=>{},
    addImagesToAd: ()=>{},
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
            ads: [],
            loading: false,
            error: ""
        };
    };

    componentDidMount(){
        this.getUserInfo()
            .then(([userData, userAdsData])=>{

                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds
                });
                
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    };

    addImagesToAd = (ad, images)=>{
        let ads = this.state.ads;
        const adIndex= ads.indexOf(ad);

        ads[adIndex].images = images;

        this.setState({
            ads
        });
    }

    handleLogIn = ()=>{
        this.setState({
            loading: true
        });

        this.getUserInfo()
            .then(([userData, userAdsData])=>{
                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds,
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
            .then(([userData, userAdsData])=>{

                this.setState({
                    user: userData.user,
                    ads: userAdsData.userAds
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
            return Promise.all([
                fetch("http://localhost:8000/api/user", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    }
                }),
                fetch("http://localhost:8000/api/living-space", {
                    headers: {
                        'content-type': "application/json",
                        'authorization': `bearer ${UserToken.getToken()}`
                    }
                })
            ])
                .then(([userRes, userAdsRes]) => {
                    if(!userRes.ok){
                        return userRes.json().then( e => Promise.reject(e));
                    };

                    if(!userAdsRes.ok){
                        return userAdsRes.json().then( e => Promise.reject(e));
                    };

                    return Promise.all([ userRes.json(), userAdsRes.json()]);
                });
        }
    }

    render(){
        const value = {
            user: this.state.user,
            ads: this.state.ads,
            loading: this.state.loading,
            refresh: this.refresh,
            addToAds: this.addToAds,
            addImagesToAd: this.addImagesToAd,
            resetState: this.resetState,
            loading: this.state.loading,
            handleLogIn: this.handleLogIn
        };
        console.log(value);
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}