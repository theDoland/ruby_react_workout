import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    getUser(event){
        // prevent the submit form from refreshing page
        event.preventDefault();

        var form = document.forms.loginForm;
        var formData = new FormData(form);
        console.log(formData.get('email'));
        console.log(formData.get('password'));
        fetch('api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session: {
                    email: formData.get('email'),
                    password: formData.get('password'),
                } 
            })
        })
        .then(response => console.log(response));
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