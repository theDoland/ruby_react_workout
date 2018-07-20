import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CreateUser from './CreateUser.js';
import App from './App';
import Login from './Login.js';
import {WorkoutBox} from './Exercises.js';
import Settings from './Settings.js';

// switch for exculsive page rendering
const Home = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/log_in" component={Login}/>
            <Route path="/sign_up" component={CreateUser}/>
            <Route path="/home" component={WorkoutBox}/>
            <Route path="/profile" component={Settings}/>
        </Switch>
    </BrowserRouter>
);

export default Home;