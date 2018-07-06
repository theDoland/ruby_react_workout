import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1> Hello </h1>
        <Link to="/sign_up">Sign Up</Link>
        <Link to="/log_in">Log in</Link>
      </div>
    );
  }
}

export default App;
