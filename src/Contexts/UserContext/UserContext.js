import React from "react";
import UserToken from "../../Services/UserToken/UserToken";


const UserContext = React.createContext({
    user: {},
    ads: []
});

export default UserContext;

export class UserContext extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {},
            ads: []
        };
    };

    componentDidMount(){

    };
    
    getUserInfo = ()=>{
        if(UserToken.hasToken()){
            fetch()
        }
    }

    render(){
        const value = {
            user: this.state.user,
            ads: this.state.ads
        };
        
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}