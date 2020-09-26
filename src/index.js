import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import UserContext, {UserProvider} from "./Contexts/UserContext/UserContext";
import AdsContext, {AdsProvider} from "./Contexts/AdsContext/AdsContext";
import MapContext, {MapProvider} from "./Contexts/MapContext/MapContext";
import PostAdContext, {PostAdProvider} from "./Contexts/PostAdContext/PostAdContext";
import AppContext, {AppProvider} from "./Contexts/AppContext/AppContext";

ReactDOM.render(
    <BrowserRouter>
        <AdsProvider>
            <AdsContext.Consumer>
                {adsContext => (
                    <UserProvider>
                        <UserContext.Consumer>
                            { userContext => (
                                <MapProvider>
                                    <MapContext.Consumer>
                                        { mapContext => (
                                            <PostAdProvider mapContext={mapContext} userContext={userContext}>
                                                <PostAdContext.Consumer>
                                                    {postAdContext => (
                                                        <AppProvider adsContext={adsContext} mapContext={mapContext} userContext={userContext} postAdContext={postAdContext}>
                                                            <App/>
                                                        </AppProvider>
                                                    )}
                                                </PostAdContext.Consumer>
                                            </PostAdProvider>
                                        )}
                                    </MapContext.Consumer>
                                </MapProvider>
                            )}
                        </UserContext.Consumer>
                    </UserProvider>
                )}
            </AdsContext.Consumer>
        </AdsProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
