import React from "react";

const AdContext = React.createContext({
    history: {},
    adsContext: ()=>{},
    userContext: {},
    postAdContext: {},
    mapContext: ()=>{}
})

export default AdContext;

export class AppProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: {}
        };
    };

    render(){
        const value = {
            adsContext: this.props.adsContext,
            userContext: this.props.userContext,
            postAdContext: this.props.postAdContext,
            mapContext: this.props.mapContext
        };

        return (
            <AdContext.Provider value={value}>
                {this.props.children}
            </AdContext.Provider>
        )
    }
}