import React, { Component } from 'react';

class CreateUser extends Component {
    render() {
        return (
            <div className="CreateUser">
                <h1>Sign Up</h1>
                <form action="#">
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