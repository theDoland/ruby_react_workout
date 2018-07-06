import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    render() {
        return(
            <div>
                <h1>Log in</h1>
                <form>
                    Email: <input type="text" name="email"/> <br/>
                    Password: <input type="password" name="password"/><br/>
                </form>
                <Link to="/signup">New User?</Link>
            </div>
        )
    }
}

export default Login;