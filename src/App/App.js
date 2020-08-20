import React from 'react';
import {Route} from "react-router-dom";
import './App.css';

import Header from "../Components/Header/Header";
import LogIn from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import SearchSpacesInput from "../Components/SearchSpacesInput/SearchSpacesInput";
import GoogleMap from "../Components/Map/Map";
import Footer from "../Components/Footer/Footer";
import About from "../Components/About/About"; 

// Once the user is logged in
import Properties from "../Components/Properties/Properties";
import PostAd from "../Components/PostAd/PostAd";

class App extends React.Component{

    isLoggedIn = ()=>{
        return (
            <>
                <Route exact path="/properties" component={Properties}></Route>
            </>
        );
    };

    notLoggedIn =()=>{
        return (
            <>

            </>
        )
    }

    render(){
        console.log(this.props)
        return(
            <>
                <Route path="/" component={Header}></Route>

                <main>
                    <Route exact path="/find-rent" component={SearchSpacesInput}></Route>
                    <Route exact path="/find-rent" render={(props)=> <GoogleMap {...props}></GoogleMap>}></Route>
                    <Route exact path="/post-ad" component={PostAd}></Route>
                    <Route exact path="/properties" component={Properties}></Route>
                    <Route exact path="/login" component={LogIn}></Route>
                    <Route exact path="/signup" component={SignUp}></Route>
                    <Route exact path="/about" component={About}></Route>                  
                </main>

                <Route path="/" component={Footer}></Route>
            </>
        );
    };
};

export default App;
