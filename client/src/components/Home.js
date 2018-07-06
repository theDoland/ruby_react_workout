import React, { Component } from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import CreateUser from './CreateUser.js';
import App from './App';
import Login from './Login.js';
// switch for exculsive page rendering
const Home = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={CreateUser}/>
        </Switch>
    </BrowserRouter>
);

export default Home;