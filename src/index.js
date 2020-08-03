import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import MapContext, {MapProvider} from "./Contexts/MapContext/MapContext";
import PostAdContext, {PostAdProvider} from "./Contexts/PostAdContext/PostAdContext";

ReactDOM.render(
    <BrowserRouter>
        <PostAdProvider>
            <MapProvider>
                <App/>
            </MapProvider>
        </PostAdProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
