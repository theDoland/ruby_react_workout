import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.getUser = this.getUser.bind(this);
    }
    getUser(event){
        // prevent the submit form from refreshing page
        event.preventDefault();
        var form = document.forms.loginForm;
        var formData = new FormData(form);

        axios.post('api/v1/user_token', {
            auth: {
                email: formData.get('email'),
                password: formData.get('password')
            }
        })
        .then(response => {
            // success
            if(response.status === 201){
                localStorage.setItem("jwt", response.data.jwt)
                this.props.history.push("/home");
            }    
            else if(response.status === 204){
                console.log("Error");
                this.props.history.push("/home");
            }   
        });
        
    }
    render() {
        return(
            <div>
                <h1>Log in</h1>
                <form id="loginForm" onSubmit={this.getUser}>
                    Email: <input type="text" name="email"/> <br/>
                    Password: <input type="password" name="password"/><br/>
                    <input type="submit" value="Log in"/>
                </form>
                <Link to="/sign_up">New User?</Link>
            </div>
        )
    }
}

export default Login;