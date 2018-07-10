import React from 'react';
import "./Exercises.css";
import axios from 'axios';
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
        for(let i = 0; i < this.props.numRows; i++){
            grid.push(                
                <div key={i} className="row justify-content-center">
                    <div className="col-lg-2 table"><input className="exercise"onChange={(event) => this.props.handleChange("exercise",i,event)} 
                                                            type="text" name="exercise" value={this.props.preRows[i].exercise}/> 
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
                exercise: "",
                sets: 0,
                reps: 0,
                weight: 0,

            }],
            numDays: 0,              // integer to keep track of the number of day tabs to render
            numRows: 1,
        };
        // bind the context of this to the workout box object
        this.addNewRow = this.addNewRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveRows = this.saveRows.bind(this);

    }
    handleChange(field,saveIndex,event){
        // when text or numbers inputed, change values in state variable
        var saveField = this.state.exerciseRows.slice();
        saveField[saveIndex][field] = event.target.value;

        this.setState({
            exerciseRows: saveField,
        });
    }

    addNewRow(currRows){
        // capping the number of rows to 10
        var exerciseRows = this.state.exerciseRows.slice();
        if(currRows === 10){
            return;
        }
        else{
            this.setState({ 
                exerciseRows: exerciseRows.concat([{
                    exercise: "",
                    sets: 0,
                    reps: 0,
                    weight: 0,
                }]),
                numRows: currRows+1, 
            });
        }
    }
    removeRow(index){

        // splice out the removed row (use slice to be nondestructive)
        var exRows = this.state.exerciseRows.slice();
        exRows.splice(index,1);
        var newRows = this.state.numRows;
        this.setState({ 
            exerciseRows: exRows,
            numRows: newRows-1, 
        });
    }
    saveRows(event){
        event.preventDefault();
        // send the rows to api 
        // PLACEHOLDER
        var config = {
            headers: {}
        };
        config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem("jwt");
        axios.get('/api/v1/save', config)
        .then(response => console.log(response));
        // i guess the idea is that you get the user and then you just do a post request since you have the user verified

        /*fetch('/api/v1/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exercise: this.state.exerciseRows
            })
        });*/
    }
    render(){
        return (
            <div className="container bordered">
                <DaysOfWeek />
                <WorkoutRows onChange={this.handleChange} numRows={this.state.numRows} removeRow={this.removeRow} 
                addNewRow={() => this.addNewRow(this.state.numRows)}
                handleChange={this.handleChange}
                preRows={this.state.exerciseRows}/>
                <input type="submit" value="Save Workout" onClick={this.saveRows}/>
            </div>
        )
    }

}