import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// user profile page
class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
        }
        this.deleteAccount = this.deleteAccount.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }
    deleteAccount(){
        if(window.confirm("Are you sure you want to delete your account?")){
            axios.delete('/api/v1/delete_user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt")
                },
                data: {
                    email: localStorage.getItem("email")
                }
            })
            .then(response => {
                this.props.history.push("/");
                localStorage.removeItem("jwt");
                localStorage.removeItem("email");
                localStorage.removeItem("name");
            });
        }
    }
    getUsername(){
        if(localStorage.getItem("name")){
            return;
        }
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt"),
            },
            params: {
                email: localStorage.getItem("email")
            }
        }
        axios.get('api/v1/user', config)
        .then( response => {
            this.setState({
                name: response.data.name
            })
            localStorage.setItem("name", response.data.name);
        })
        // if 401 returned, log in again
        
    }
    componentWillMount(){
        if(!localStorage.getItem("jwt")){
            // probably render some error message
            this.props.history.push("/");
        }
    }
    componentDidMount(){
        this.getUsername();
        document.title = "Profile | My Gym Goals";
    }
    render(){
        
        return (
            <div>
                <Link to="/home">Back to Workouts</Link> <br/>
                Profile <br/>
                Name: <strong>{localStorage.getItem("name") ? localStorage.getItem("name") : this.state.name}</strong> <br/>
                Email: <strong>{localStorage.getItem("email")}</strong> <br/>
                <button onClick={this.deleteAccount}>Delete Account</button>
            </div>
        )
    }
}

export default Settings;