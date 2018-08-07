import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Login from './Login.js';
import {WorkoutBox} from './Exercises.js';
import Settings from './Settings.js';

// switch for exculsive page rendering
const Home = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/log_in" component={Login}/>
            <Route path="/home" component={WorkoutBox}/>
            <Route path="/profile" component={Settings}/>
        </Switch>
    </HashRouter>
);

export default Home;