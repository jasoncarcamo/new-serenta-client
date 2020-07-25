import React from 'react';
import {Route} from "react-router-dom";
import './App.css';

import Header from "../Components/Header/Header";

class App extends React.Component{
    render(){
        return(
            <>
                <Route path="/" component={Header}></Route>

                <main>
                    <p>Hello</p>
                </main>
            </>
        );
    };
};

export default App;
