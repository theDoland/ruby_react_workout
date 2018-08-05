import React, { Component } from 'react';
import "./styles/CreateUser.css";

class CreateUser extends Component {

    componentDidMount() {
        document.title = "Sign up | My Gym Goals";
    }
    render() {
        return (
            <div className="CreateUser">
                <div className="row Create-title">
                    <div className="col-sm-12">
                        <h1 align="center">Sign Up</h1>
                    </div>
                </div>
                
                <form id="createForm" onSubmit={this.props.onSubmit}>
                    {this.props.hasError ? <div id="errorLogin"><b className="errorText">Email already taken!</b></div> : <div></div>}
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="text" name="name" placeholder="Name" required size="22"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="email" name="email" placeholder="Email" required size="22"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="password" name="password" placeholder="Password" required minLength="6" size="22"/> 
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <input type="password" name="password_confirmation" placeholder="Password Confirmation" required size="22"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <input className="btn btn-create btn-lg" type="submit" value="Create my account!"/><br/>
                        </div>
                    </div>
                </form>                
            </div>
        )
    }
}

export default CreateUser;