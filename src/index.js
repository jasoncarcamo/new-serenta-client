import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import MapContext, {MapProvider} from "./Contexts/MapContext/MapContext";

ReactDOM.render(
    <BrowserRouter>
        <MapProvider>
            <MapContext.Consumer>
                {(mapContext => <App mapContext={mapContext}/>)}
            </MapContext.Consumer>
        </MapProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
