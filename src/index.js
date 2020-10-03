import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import HomePage from './Pages/HomePage/HomePage';
import VideoChatPage from './Pages/VideoChatPage/VideoChatPage';
import { Header } from './Pages/VideoChatPage/Header';
ReactDOM.render(
    <div>
        <Header/>
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/vid" exact>
                    <VideoChatPage/>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>
    </div>,
    document.getElementById('root')
);