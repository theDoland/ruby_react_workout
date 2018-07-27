import React from 'react';
import "./styles/Exercises.css";
import axios from 'axios';
import DaysOfWeek from './DaysOfWeek.js'
import WorkoutRows from './WorkoutRows.js'
import Footer from './Footer.js';
// on double enter, add a new row
// TODO: Weight will be replaced by set(X)

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

        if(field === "name"){
            saveField[saveIndex][field] = event.target.value;
        }
        else {
            // it's a srw field
            saveField[saveIndex].srw[varIndex][field] = event.target.value;
        }

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
        return this.state.currentDay === dayIndex ? "active" : "";
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
            if(response.data.length !== 0){
                // parse the response data
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
            <div className="Exercise">
                <div className="Exercise-layer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-10">
                                <h1 className="Exercise-title" align="left"> <strong>My Gym Goals: A minimalist workout tracker</strong> </h1>
                            </div>
                            <div className="col-sm-2">
                                <input type="button" className="btn btn-primary Exercise-top-button" onClick={this.getProfile.bind(this)} value="Profile"/>
                                <input type="button" className="btn btn-warning Exercise-top-button" onClick={this.logoutUser.bind(this)} value="Logout"/>
                            </div>
                        </div>
                    </div>

                    <br/>

                    <div className="container Exercise-container">
                        <div className="row Exercise-tab-title">
                            <div className="col-sm-11">
                                <div className="Exercise-tab">
                                    <DaysOfWeek onClick={this.changeDay.bind(this)} activeDay={this.activeDay.bind(this)}/>
                                </div>
                            </div>
                            <div className="col-sm-1">
                                <input className="btn btn-success float-right Exercise-save-button" type="submit" value="Save Workouts" onClick={this.saveRows.bind(this)}/>
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
                <Footer />
            </div>
        )
    }

}