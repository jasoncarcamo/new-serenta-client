import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const AdsContext = React.createContext({
    ads: [],
    loading: Boolean,
    addAdd: ()=>{}
});

export default AdsContext;

export class AdsProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ads: [],
            loading: false,
            error: ""
        };
    };

    componentDidMount(){

        // this.state.loading handler and gets all ads
        this.getAllAds();
    }

    getAllAds = ()=>{

        this.setState({
            loading: true
        });

        fetch("http://localhost:8000/api/living-spaces", {
            headers: {
                'content-type': 'application/json'
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
                    ads: resData.ads,
                    loading: false
                });
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    loading: false
                });
            });
    }

    addAd = (ad)=>{
        const ads = this.state.ads;

        ads.push(ad);

        this.setState({
            ads
        });
    }

    render(){
        const value = {
            ads: this.state.ads,
            loading: this.state.loading,
            addAd: this.addAd
        };
        console.log(value);
        return (
            <AdsContext.Provider value={value}>
                {this.props.children}
            </AdsContext.Provider>
        )
    }
}