import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateUser from './CreateUser.js';
import App from './App';
import Login from './Login.js';
// switch for exculsive page rendering
const Home = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/log_in" component={Login}/>
            <Route path="/sign_up" component={CreateUser}/>
        </Switch>
    </BrowserRouter>
);

export default Home;