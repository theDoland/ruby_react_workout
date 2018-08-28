import React from 'react';
import "./styles/WorkoutRows.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WorkoutRows extends React.Component {
    
    render() {
        var grid = [];
        // display each row in the workout table
        for(let i = 0; i < this.props.preRows.length; i++){
            
            // number of columns to produce for sets/reps/weight
            let numSRW = this.props.preRows[i].srw.length ? this.props.preRows[i].srw.length : 0;
            let srwGrid = [];
            for(let j = 0; j < numSRW; j++){
                
                srwGrid.push(
                    <div key={j} className="col-5 col-sm-3 col-md-2 col-lg-2 WorkoutRow-SrwDiv">
                        <div className="row mx-auto">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 WorkoutRow-Srw input-group">
                                <input className="form-control" onChange={(event) => this.props.handleChange("sets",i,j,event)} size="2"
                                            type="text" name="sets" placeholder="Set" value={this.props.preRows[i].srw[j].sets ? this.props.preRows[i].srw[j].sets : ""} />        
                                
                                <input className="form-control" onChange={(event) => this.props.handleChange("reps",i,j,event)} size="2" 
                                            type="text" name="reps" placeholder="Rep" value={this.props.preRows[i].srw[j].reps ? this.props.preRows[i].srw[j].reps : ""} />
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 input-group">
                                <input className="WorkoutRow-Weight form-control" size="4" placeholder="Weight" onChange={(event) => this.props.handleChange("weight",i,j,event)} 
                                            type="text" name="weight" value={this.props.preRows[i].srw[j].weight ? this.props.preRows[i].srw[j].weight : ""} />                     
                            </div>
                        </div>
                        
                    </div>
                )
                if(numSRW === 0){
                    break;
                }
            }
            
            grid.push(                
                <div key={i} className="row WorkoutRow-Center">
                    <div className="col-7 col-sm-5 col-md-3 col-lg-3">
                        <div className="row">
                            <div className="col-2">    
                                <div className="pull-left dropdown show">
                                    <button className="btn wrench dropdown-toggle" type="button" id="optioncontent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon="wrench" />
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="optioncontent">
                                        <a className="dropdown-item WorkoutRow-Button WorkoutRow-SrwButton" onClick={() => this.props.addSRW(i)}>Add Column</a>
                                        <a className="dropdown-item WorkoutRow-Button WorkoutRow-SrwButton" onClick={() => this.props.delSRW(i)}>Delete Column</a>                        
                                        <a className="dropdown-item WorkoutRow-Delete" onClick={() => this.props.removeRow(i)} >Delete Row</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="input-group">
                                    <input className="WorkoutRow-Name form-control" onChange={(event) => this.props.handleChange("name",i,0,event)} 
                                                                type="text" name="name" placeholder="Exercise" value={this.props.preRows[i].name ? this.props.preRows[i].name : ""} /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    

                    {srwGrid}
                </div>
            );
        }

        return  (
            <div>
                {grid}
                <div className="row WorkoutRow-bottom">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <input className="btn WorkoutRow-addRow" type="button" onClick={this.props.addNewRow} value="+"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkoutRows;