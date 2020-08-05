import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const AdsContext = React.createContext({
    ads: []
});

export default AdsContext;

export class AdsProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            error: ""
        };
    };

    componentDidMount(){
        this.getAllAds();
    }

    getAllAds = ()=>{
        fetch("http://localhost:8000/api/living-spaces", {
            headers: {
                'content-type': 'application/json',
                'authorization': `${UserToken.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
                this.setState({
                    ads: resData.ads
                })
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        const value = {
            ads: this.state.ads
        };
        console.log(value);
        return (
            <AdsContext.Provider value={value}>
                {this.props.children}
            </AdsContext.Provider>
        )
    }
}