import React from "react";

const AdContext = React.createContext({
    history: {},
    userContext: {},
    postAdContext: {}
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