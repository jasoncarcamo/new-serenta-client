import React from "react";
import UserToken from "../../Services/UserToken/UserToken";

const AdsContext = React.createContext({
    ads: [],
    loading: Boolean,
    addAdd: ()=>{},
    updateAd: ()=>{},
    deleteAd: ()=>{}
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

        fetch(`${process.env.REACT_APP_FETCH_API_URL}/api/living-spaces`, {
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
                resData.ads.forEach((ad, i)=>{
                    for(let j = 0; j < ad.images.length; j++){
                        ad.images[j] = JSON.parse(ad.images[j])
                    };
                });

                this.setState({
                    ads: resData.ads
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

    updateAd = (ad) => {
        const ads = this.state.ads;
        let adIndex;
        const foundAd = ads.filter((currentAd, index) => {
            
            adIndex = index;

            return currentAd.id === ad.id ? currentAd : null;
        });

        if(adIndex > -1){
            ads[adIndex] = ad;
        };

        this.setState({
            ads
        });
    }

    deleteAd = (index)=>{
        let ads = this.state.ads;
        let removedAd = ads.splice(index, 1);

        this.setState({
            ads
        });
    }

    render(){
        const value = {
            ads: this.state.ads,
            loading: this.state.loading,
            addAd: this.addAd,
            updateAd: this.updateAd,
            deleteAd: this.deleteAd
        };
        
        return (
            <AdsContext.Provider value={value}>
                {this.props.children}
            </AdsContext.Provider>
        )
    }
}