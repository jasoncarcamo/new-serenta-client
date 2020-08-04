import React from "react";

const AdContext = React.createContext({
    history: {}
})

export default AdContext;

export default class AppContextProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: {}
        };
    };

    render(){
        const value = {
            history: this.props.history
        };
        return (
            <AdContext.Provider value={value}>
                {this.props.children}
            </AdContext.Provider>
        )
    }
}