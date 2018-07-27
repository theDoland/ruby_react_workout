import React, { Component } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './CreateUser';
import axios from 'axios';
import Title from './Title';
import Footer from './Footer';

class App extends Component {
  constructor(props){
    super(props);

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
    axios.post('api/v1/signup', {
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

            axios.post('api/v1/user_token', config)
            .then(response => {
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("email", formData.get('email'));
                localStorage.setItem("name", formData.get("name"));
                this.props.history.push("/home");
            })
        }    
        else if(response.status === 204){
            // print error message (flash) on the screen
            console.log("Error");
        }
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
      <div className="App">
        <div className="App-layer">
          <div className="jumbotron-fluid">
            <div className="container-fluid App-Top">
              <Title onClick={this.onClick} titleLink="/log_in" titleName="Log in"/>
            </div>
          </div>
          <br/>
          <div className="jumbotron-fluid">
            <div className="container-fluid" id="App-CreateUser">
              <CreateUser onSubmit={this.submitForm}/>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;