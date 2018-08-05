import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faWrench, faDumbbell, faBars } from '@fortawesome/free-solid-svg-icons'
import CreateUser from './CreateUser';
import axios from 'axios';
import Footer from './Footer';

library.add(fab, faWrench, faDumbbell, faBars);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasErrors: false,
    };
    this.onClick = this.onClick.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  // submitForm for creating a user
  submitForm(event){
    // prevent the submit form from refreshing page
    event.preventDefault();
    var form = document.forms.createForm;
    var formData = new FormData(form);

    // post request to rails database
    axios.post('/api/v1/signup', {
        user: {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')  
        }
    })
    .then(response => {
        // success
        if(response.status === 201){
            // need to set JWT after 
            // initialize the first exercise (so the rest will be patch?)
            var config = {
                auth: {
                    email: formData.get('email'),
                    password: formData.get('password')
                }
            }

            axios.post('/api/v1/user_token', config)
            .then(response => {
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("email", formData.get('email'));
                localStorage.setItem("name", formData.get("name"));
                this.props.history.push("/home");
            })
        }    
        else if(response.status === 204){
            // print error message (flash) on the screen
        }
    })
    .catch(error => {
      this.setState({
        hasErrors: true
      });
    });

}
  // login clicked
  onClick(link){
    this.props.history.push(link);
  }
  // if already valid information, send user to workout page
  componentWillMount() {
    if(localStorage.getItem("jwt") && localStorage.getItem("email")){
      this.props.history.push("/home");
    }
  }
  componentDidMount() {
    document.title = "My Gym Goals";
  }
  render() {
    return (
      <div>
        <div className="App">
            <div className="jumbotron-fluid">
                <nav className="navbar navbar-expand-lg navbar-dark App-bg-custom">
                    <a className="navbar-brand"><FontAwesomeIcon className="dumbbell" icon="dumbbell"/>My Gym Goals</a>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <input type="button" className="btn btn-lg App-Login" onClick={() => this.onClick("/log_in")} value="Log in"/>
                        </li>
                    </ul>
                </nav>
            </div>
            <br/>
            <div className="container" id="App-CreateUser">
              <CreateUser hasError={this.state.hasErrors} onSubmit={this.submitForm}/>
            </div>

          <div className="container">
            <Footer />
          </div>

        </div>
      </div>
    );
  }
}

export default App;