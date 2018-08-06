import React, {Component} from 'react';
import axios from 'axios';
import "./styles/Login.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Footer from './Footer';
// TODO: REMEMBER ME BOX --> change local storage

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
        };
        this.getUser = this.getUser.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(link){
        this.props.history.push(link);
    }
    getUser(event){
        // prevent the submit form from refreshing page
        event.preventDefault();
        var form = document.forms.loginForm;
        var formData = new FormData(form);

        axios.post('/api/v1/user_token', {
            auth: {
                email: formData.get('email'),
                password: formData.get('password')
            }
        })
        .then(response => {
            // success
            if(response.status === 201){
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("email", formData.get('email'));
                this.props.history.push("/home");
            }    
                
        })
        .catch(error => {
            this.setState({
                hasError: true,
            });
        });
        
    }
    componentDidMount() {
        document.title = "Log in | My Gym Goals";
    }
    render() {
        return(
        <div>
            <div className="Login-Div">
                <nav className="navbar navbar-expand-lg navbar-light Login-bg-custom">
                    <a className="navbar-brand"><FontAwesomeIcon className="dumbbell" icon="dumbbell"/>My Gym Goals</a>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <input type="button" className="btn btn-lg Exercise-top-button" onClick={() => this.onClick("/")} value="Sign up"/>
                        </li>
                    </ul>

                </nav>
                    
                <br/>
                <div className="container-fluid" id="Login-User">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h1>Log in</h1>
                        </div>
                    </div>
                    <form id="loginForm" className="text-center" onSubmit={this.getUser}>
                        {
                            this.state.hasError ? <div id="errorLogin"><b className="errorText">Invalid Email/Password Combination</b></div> : <div></div>
                        }
                        <input type="email" name="email" placeholder="Email" size="22" required/> <br/><br/>
                        <input type="password" name="password" placeholder="Password" size="22" required/><br/><br/>
                        <input type="submit" className="btn btn-lg Login-btnsize" value="Log in"/>
                    </form>
                </div>
            </div>
            <div className="container">
                    <Footer />
            </div>
        </div>
        )
    }
}

export default Login;