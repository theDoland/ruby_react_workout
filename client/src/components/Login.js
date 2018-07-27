import React, {Component} from 'react';
import axios from 'axios';
import "./styles/Login.css";
import Title from './Title';
import Footer from './Footer';
// TODO: REMEMBER ME BOX --> change local storage

class Login extends Component {
    constructor(props){
        super(props);
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

        axios.post('api/v1/user_token', {
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
            else if(response.status === 204){
                console.log("Error");
                this.props.history.push("/home");
            }   
        });
        
    }
    componentDidMount() {
        document.title = "Log in | My Gym Goals";
    }
    render() {
        return(
            <div className="Login-Div">
                <div className="Login-Layer">
                    <div className="container-fluid Login-title">
                        <Title onClick={this.onClick} titleLink="/" titleName="Sign Up"/>
                    </div>
                    <br/>
                    <div className="container-fluid" id="Login-User">
                        <div className="row">
                            <div className="col-sm-12 text-center Login-title">
                                <h1>Log in</h1>
                            </div>
                        </div>
                        <form id="loginForm" className="text-center" onSubmit={this.getUser}>
                            <input type="email" name="email" placeholder="Email" size="22" required/> <br/><br/>
                            <input type="password" name="password" placeholder="Password" size="22" required/><br/><br/>
                            <input type="submit" className="btn btn-primary btn-lg Login-btnsize" value="Log in"/>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Login;