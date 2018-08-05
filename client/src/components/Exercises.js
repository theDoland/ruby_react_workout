import React from 'react';
import "./styles/Exercises.css";
import axios from 'axios';
import DaysOfWeek from './DaysOfWeek.js'
import WorkoutRows from './WorkoutRows.js'
import Footer from './Footer.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


// TODO: better menu bar placement (rework the menu)
// TODO: LINK COLOR WHEN HOLD DOWN DROPDOWN LINKS
export class WorkoutBox extends React.Component {
    constructor(props){
        super(props);
        var date = new Date();

        this.state = {
            exerciseRows: [{
                name: "",
                srw: [{
                    sets: 0,
                    reps: 0,
                    weight: 0,
                }],
                dayofweek: date.getDay(), // not sure about this
            }],
            // automatically go to the current day
            currentDay: date.getDay(),
        };
    }
    handleChange(field,saveIndex,varIndex,event){
        // when text or numbers inputed, change values in state variable
        var saveField = this.state.exerciseRows.slice();
        var val = event.target.value;
        if(field === "name"){
            saveField[saveIndex][field] = val;
        }
        else {
            // it's a srw field, prevent non-alpha
            if(val.charAt(val.length) > 31 && (val.charAt(val.length) < 48 || val.charAt(val.length) > 57)){
                return;
            }
            saveField[saveIndex].srw[varIndex][field] = parseInt(val, 10);
        }
        console.log(saveField);
        this.setState({
            exerciseRows: saveField,
        });
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(saveField));
    }

    addNewRow(){
        // capping the number of rows to 9
        var exRows = this.state.exerciseRows.slice();
        if(exRows.length === 9){
            return;
        }
        else{
            this.setState({ 
                exerciseRows: exRows.concat([{
                    name: "",
                    srw: [{
                        sets: 0,
                        reps: 0,
                        weight: 0,
                    }],
                    dayofweek: this.state.currentDay,
                }]),
            });
            sessionStorage.setItem(this.state.currentDay, JSON.stringify(exRows));
        }
    }
    addSRW(index){
        var exRows = this.state.exerciseRows.slice();
        exRows[index].srw.push({
            sets: 0,
            reps: 0,
            weight: 0,
        });
        this.setState({
            exerciseRows: exRows,
        })
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(exRows));
        
    }
    delSRW(index){
        var exRows = this.state.exerciseRows.slice();
        // must have one srw
        if(exRows[index].srw.length === 1){
            return;
        }
        exRows[index].srw.pop();
        this.setState({
            exerciseRows: exRows,
        })
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(exRows));

    }
    removeRow(index){
        // splice out the removed row (use slice to be nondestructive)
        var exRows = this.state.exerciseRows.slice();
        exRows.splice(index,1);
        this.setState({ 
            exerciseRows: exRows,
        });
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(exRows));
    }
    saveRows(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            },            
        };
        
        let data = {
            exercise: JSON.parse(sessionStorage.getItem(this.state.currentDay)),
            day: this.state.currentDay,
        }
        axios.patch('/api/v1/update_exercise', data, config)
        .then(response => {
            if(response.status === 401){
                this.props.history.push("/");
            }
            else{
                sessionStorage.setItem(this.state.currentDay, sessionStorage.getItem(this.state.currentDay))
            }
        })    
        
    }
    getProfile() {
        this.props.history.push("/profile");
    }
    logoutUser(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        sessionStorage.clear();
        this.props.history.push("/");
    }
    activeDay(dayIndex){
        return this.state.currentDay === dayIndex ? "active dropdown-item" : "dropdown-item";
    }
    changeDay(day){
        // cache current day
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(this.state.exerciseRows));

        // change the current day
        this.setState({
            currentDay: day,
        })

        // fetch the new day either in cache or server call
        if(sessionStorage.getItem(day)){
            this.setState({
                exerciseRows: JSON.parse(sessionStorage.getItem(day))
            })
        }
        else{
            var config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt")
                },
                params: {
                    day: day
                }
            };
            axios.get('/api/v1/index', config)
            .then(response => {
                if(response.data.length !== 0){
                    // parse the response data
                    let recRows = [];
                    for(let i = 0; i < response.data.length; i++){
                        recRows.push(response.data[i][0]);
                    }
                    // need to parse response.data to get correct format
                    this.setState({
                        exerciseRows: recRows,
                    })
                }
                else{
                    this.setState({
                        exerciseRows: [{
                            name: "",
                            srw: [{
                                sets: 0,
                                reps: 0,
                                weight: 0,
                            }],
                            dayofweek: day
                        }]
                    })
                }    
            })
        }
    }
    componentWillMount() {
        if(!localStorage.getItem("jwt")){
            this.props.history.push("/");
        }
    }
    componentDidMount() {
        document.title = "Home | My Gym Goals";
        // set the exercises after component loads
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            },
            params: {
                day: this.state.currentDay
            }
        };
        axios.get('/api/v1/index', config)
        .then(response => {
            console.log(response);
            if(response.status === 401){
                this.props.history.push('/');
            }
            if(response.data.length !== 0){
                // parse the response data
                console.log(response.data);
                let recRows = [];
                for(let i = 0; i < response.data.length; i++){
                    recRows.push(response.data[i][0]);
                }
                this.setState({
                    exerciseRows: recRows,
                })
                sessionStorage.setItem(this.state.currentDay, JSON.stringify(recRows));
            }
            else{
                this.setState({
                    exerciseRows: [{
                        name: "",
                        srw: [{
                            sets: 0,
                            reps: 0,
                            weight: 0,
                        }],
                        dayofweek: this.state.currentDay
                    }]
                })
                sessionStorage.setItem(this.state.currentDay, JSON.stringify(this.state.exerciseRows));
            }

        })
    }
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-custom">
                    <a className="navbar-brand title-color"><FontAwesomeIcon className="dumbbell" icon="dumbbell"/>My Gym Goals</a>
                    <div className="ml-auto hiddeniflarge dropdown show">
                        <button className="btn dropdown-toggle" type="button" id="profileLog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FontAwesomeIcon icon="bars" />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileLog">
                            <a className="dropdown-item" onClick={this.getProfile.bind(this)}>Profile</a>
                            <a className="dropdown-item" onClick={this.logoutUser.bind(this)}>Log out</a>                        
                        </div>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item hiddenifsmall">
                            <input type="button" className="btn btn-sm Exercise-top-button" onClick={this.getProfile.bind(this)} value="Profile"/>
                        </li>
                        <li className="nav-item hiddenifsmall">
                            <input type="button" className="btn btn-sm Exercise-top-button" onClick={this.logoutUser.bind(this)} value="Logout"/>
                        </li>
                        
                    </ul>

                </nav>
                <div className="Exercise">
                    <div className="Exercise-layer">

                        <br/>

                        <div className="container Exercise-container">
                            <div className="row Exercise-tab Exercise-tab-title">
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 Exercise-tab-btn btn-group" role="group">
                                    <DaysOfWeek onClick={this.changeDay.bind(this)} activeDay={this.activeDay.bind(this)} currDay={this.state.currentDay}/>
                                </div>

                                
                                <div className="col-5 col-sm-5 col-md-5 col-lg-5">
                                    <input className="btn float-right Exercise-save-button" type="submit" value="Save" onClick={this.saveRows.bind(this)}/>
                                </div>
                            </div>
                            <WorkoutRows removeRow={this.removeRow.bind(this)} 
                            addNewRow={this.addNewRow.bind(this)}
                            handleChange={this.handleChange.bind(this)}
                            preRows={this.state.exerciseRows}
                            addSRW={this.addSRW.bind(this)}
                            delSRW={this.delSRW.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}