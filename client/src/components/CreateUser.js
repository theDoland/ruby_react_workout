import React, { Component } from 'react';

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
        fetch('api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    password_confirmation: formData.get('password_confirmation')   
                } 
            })
        })
        .then(response => {
            // success
            if(response.status === 201){
                this.props.history.push("/");
            }    
            else if(response.status === 204){
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