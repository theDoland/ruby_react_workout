import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1> Hello </h1>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}

export default App;
