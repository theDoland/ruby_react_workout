import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

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
                    this.props.history.push("/home")
                })
            }    
            else if(response.status === 204){
                // print error message (flash) on the screen
                console.log("Error");
            }
        });

    }
    render() {
        return (
            <div className="CreateUser">
                <h1>Sign Up</h1>
                <form id="createForm" onSubmit={this.submitForm}>
                    Name:                 <input type="text" name="name"/><br/>
                    Email:                <input type="text" name="email"/><br/>
                    Password:             <input type="password" name="password"/><br/> 
                    Password Confirmation:<input type="password" name="password_confirmation"/><br/> 
                                          <input type="submit" value="Create my account!"/><br/>
                </form>
            </div>
        )
    }
}

export default CreateUser;