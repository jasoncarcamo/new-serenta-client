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

class App extends React.Component{
    render(){
        return(
            <>
                <Route path="/" component={Header}></Route>

                <main>
                    <Route exact path="/find-rent" component={SearchSpacesInput}></Route>
                    <Route exact path="/find-rent" component={GoogleMap}></Route>
                    <Route exact path="/login" component={LogIn}></Route>
                    <Route exact path="/signup" component={SignUp}></Route>
                    <Route exact path="/about" component={About}></Route>
                    <p>Hello</p>                    
                </main>

                <Route path="/" component={Footer}></Route>
            </>
        );
    };
};

export default App;
