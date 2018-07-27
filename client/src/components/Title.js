import React, {Component} from 'react';
import './styles/App.css';
import './styles/Title.css';

class Title extends Component {
    render() {
        return(
            <div className="row ">
                <div className="col-sm-10">
                    <h1 className="Title-size" align="left"> <strong>My Gym Goals: A minimalist workout tracker</strong> </h1> <br/>
                </div>
                <div className="col-sm-2 App-login">
                    <input type="button" id="login" className="btn btn-primary btn-lg float-right App-login-button" onClick={() => this.props.onClick(this.props.titleLink)} value={this.props.titleName}/>
                </div>
            </div>
        )}
}

export default Title;