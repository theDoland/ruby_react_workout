import React from 'react';
import "./Exercises.css";
import axios from 'axios';
import {Link} from 'react-router-dom'
/* 4 main columns 
 * Weight is the only one that can expand into more columns (we have one for now) 
 * Add functionality to add a new row */

// tabs for the days of the week (should start with one)
class DaysOfWeek extends React.Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col"> <button> Monday </button></div>
                <div className="col"> <button> Tuesday </button></div>
                <div className="col"> <button> Wednesday </button></div>
                <div className="col"> <button> Thursday </button></div>
                <div className="col"> <button> Friday </button></div>
                <div className="col"> <button> Saturday </button></div>
                <div className="col"> <button> Sunday </button></div>
            </div>
        );
    }
}
// the row has the main affects, but can have a dynamic number of weight columns (one for now)
// on double enter, add a new row
// TODO: Weight will be replaced by set(X)
class WorkoutRows extends React.Component {
    render() {
        var grid = [];
        // display each row in the workout table
        for(let i = 0; i < this.props.preRows.length; i++){
            console.log(this.props.preRows[i]);
            grid.push(                
                <div key={i} className="row justify-content-center">
                    <div className="col-lg-2 table"><input className="exercise"onChange={(event) => this.props.handleChange("name",i,event)} 
                                                            type="text" name="name" value={this.props.preRows[i].name}/> 
                    </div>

                    <div className="col-lg-2 table"><input onChange={(event) => this.props.handleChange("sets",i,event)} className="setAndRep" 
                                                            type="number" name="sets" value={this.props.preRows[i].sets}/>x
                                                    <input onChange={(event) => this.props.handleChange("reps",i,event)} className="setAndRep" 
                                                            type="number" name="reps" value={this.props.preRows[i].reps}/>
                    </div>
                    <div className="col-lg-2 table"><input className="weight" onChange={(event) => this.props.handleChange("weight",i,event)} 
                                                            type="number" name="weight" value={this.props.preRows[i].weight}/> 
                    </div>
                    <div className="col-lg-2 table"><input className="weight" type="number" name="totalweight"/> </div>
                    <div className="col-lg-2 table"><input type="button" onClick={() => this.props.removeRow(i)} value="X" /></div>                    
                </div>
            );
        }

        return  (
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-2 exerciseText rowNames"> Exercise </div>
                    <div className="col-lg-2 setAndRepText rowNames"> Sets / Reps </div>
                    <div className="col-lg-2 rowNames"> Weight </div>
                    <div className="col-lg-2 rowNames"> Total Weight </div>
                    <div className="col-lg-2 rowNames"> Delete Row </div>

                </div>
                {grid}
                <div className="row justify-content-center">
                    <input className="col-lg-2" type="button" onClick={this.props.addNewRow} value="+"/>
                </div>
            </div>
        );
    }
}

export class WorkoutBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            exerciseRows: [{
                name: "",
                sets: 0,
                reps: 0,
                weight: 0,

            }],
            numDays: 0,              // integer to keep track of the number of day tabs to render
        };
        // bind the context of this to the workout box object
        this.addNewRow = this.addNewRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveRows = this.saveRows.bind(this);
        this.logoutUser = this.logoutUser.bind(this);

    }
    handleChange(field,saveIndex,event){
        // when text or numbers inputed, change values in state variable
        var saveField = this.state.exerciseRows.slice();
        saveField[saveIndex][field] = event.target.value;

        this.setState({
            exerciseRows: saveField,
        });
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
                }]),
            });
        }
    }
    removeRow(index){
        // splice out the removed row (use slice to be nondestructive)
        var exRows = this.state.exerciseRows.slice();
        exRows.splice(index,1);
        console.log(exRows);
        this.setState({ 
            exerciseRows: exRows,
        });
    }
    saveRows(event){
        event.preventDefault();
        // send the rows to api 
        // PLACEHOLDER
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            },            
        };
        var data = {
            exercise: this.state.exerciseRows
        }
        axios.patch('/api/v1/update_exercise',data,config)
        .then(response => console.log(response));

    }
    logoutUser(){
        localStorage.removeItem("jwt");
    }
    componentWillMount() {
        if(!localStorage.getItem("jwt")){
            this.props.history.push("/");
        }
    }
    componentDidMount() {
        // set the exercises after component loads
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt")
            }
        };
        axios.get('/api/v1/index', config)
        .then(response => {
            console.log(response);
            this.setState({
                exerciseRows: response.data
            })
        
        })
    }
    render(){
        return (
            <div className="container bordered">
                <Link to="/" onClick={this.logoutUser}>Logout</Link>
                <DaysOfWeek />
                <WorkoutRows onChange={this.handleChange} removeRow={this.removeRow} 
                addNewRow={this.addNewRow}
                handleChange={this.handleChange}
                preRows={this.state.exerciseRows}/>
                <input type="submit" value="Save Workout" onClick={this.saveRows}/>
            </div>
        )
    }

}