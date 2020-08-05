import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const UserContext = React.createContext({
    user: {},
    ads: [],
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
        this.getUserInfo();
    };
    
    getUserInfo = ()=>{
        if(UserToken.hasToken()){
            Promise.all([
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
                })
                .then(([userData, userAdsData])=>{
                    console.log(userData);
                    console.log(userAdsData);
                    this.setState({
                        user: userData.user,
                        ads: userAdsData.userAds
                    });
                    
                })
                .catch( err => {
                    console.log(err)
                    this.setState({
                        error: err.error
                    })
                })
        }
    }

    render(){
        const value = {
            user: this.state.user,
            ads: this.state.ads
        };
        console.log(value)
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}