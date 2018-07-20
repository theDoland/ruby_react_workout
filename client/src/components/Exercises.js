import React from 'react';
import "./Exercises.css";
import axios from 'axios';
import {Link} from 'react-router-dom'
import DaysOfWeek from './DaysOfWeek.js'
import WorkoutRows from './WorkoutRows.js'

// on double enter, add a new row
// TODO: Weight will be replaced by set(X)

export class WorkoutBox extends React.Component {
    constructor(props){
        super(props);
        var date = new Date();

        this.state = {
            exerciseRows: [{
                name: "",
                sets: 0,
                reps: 0,
                weight: 0,
                dayofweek: date.getDay()-1, // not sure about this
            }],
            // automatically go to the current day
            currentDay: date.getDay()-1,
            saveFunct: null,
        };
        // bind the context of this to the workout box object
        this.saveRows = this.saveRows.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.activeDay = this.activeDay.bind(this);
        this.changeDay = this.changeDay.bind(this);
    }
    handleChange(field,saveIndex,event){
        // when text or numbers inputed, change values in state variable
        var saveField = this.state.exerciseRows.slice();
        saveField[saveIndex][field] = event.target.value;

        this.setState({
            exerciseRows: saveField,
        });
        sessionStorage.setItem(this.state.currentDay, JSON.stringify(saveField));
    }

    addNewRow(){
        // capping the number of rows to 10
        var exerciseRows = this.state.exerciseRows.slice();
        if(this.state.exerciseRows.length === 10){
            return;
        }
        else{
            this.setState({ 
                exerciseRows: exerciseRows.concat([{
                    name: "",
                    sets: 0,
                    reps: 0,
                    weight: 0,
                    dayofweek: this.state.currentDay,
                }]),
            });
            sessionStorage.setItem(this.state.currentDay, JSON.stringify(this.state.exerciseRows))
        }
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
        // loop for every potential day of the week
        for(let i = 0; i < 7; i++){
            if(sessionStorage.getItem(i)){
                let data = {
                    exercise: JSON.parse(sessionStorage.getItem(i)),
                    day: i,
                }
                axios.patch('/api/v1/update_exercise', data, config)
                .then(response => {
                    if(response.status === 401){
                        this.props.history.push("/");
                    }
                    else{
                        sessionStorage.setItem(i, sessionStorage.getItem(i))
                    }
                })
            }
        }
    }
    logoutUser(){
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
    }
    activeDay(dayIndex){
        return this.state.currentDay === dayIndex ? "active" : "";
    }
    changeDay(day){
        // if currentday has changes, save them and cache
        if(sessionStorage.getItem(this.state.currentDay) !== JSON.stringify(this.state.exerciseRows)){
            sessionStorage.setItem(this.state.currentDay, JSON.stringify(this.state.exerciseRows));
        }

        // change the current day
        this.setState({
            currentDay: day,
        })

        // fetch the new day either in storage or server call
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
                this.setState({
                    exerciseRows: response.data
                })
            
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
            if(response.data.length !== 0){
                this.setState({
                    exerciseRows: response.data,
                })
                // store the current day as this for quick response (don't have to go to server)
                sessionStorage.setItem(this.state.currentDay, JSON.stringify(response.data));

            }
        })
    }
    render(){
        return (
            <div className="container bordered">
                <Link to="/" onClick={this.logoutUser}>Logout</Link> <br/>
                <Link to="/profile" >Profile</Link>
                <DaysOfWeek onClick={this.changeDay} activeDay={this.activeDay}/>
                <WorkoutRows onChange={this.handleChange} removeRow={this.removeRow} 
                addNewRow={this.addNewRow}
                handleChange={this.handleChange}
                preRows={this.state.exerciseRows}/>
                <input type="submit" value="Save Workouts" onClick={this.saveRows}/>
            </div>
        )
    }

}