import React from 'react';

class WorkoutRows extends React.Component {
    
    render() {
        var grid = [];
        // display each row in the workout table
        for(let i = 0; i < this.props.preRows.length; i++){
            
            // number of columns to produce for sets/reps/weight
            let numSRW = this.props.preRows[i].srw.length ? this.props.preRows[i].srw.length : 0;
            let srwGrid = [];
            let offsetCols = 3;
            for(let j = 0; j < numSRW; j++){
                offsetCols -= 1;
                // HAVE TO CHANGE THE HANDLECHANGE FUNCTION
                srwGrid.push(
                    <div key={j} className="col-sm-2">
                        <input onChange={(event) => this.props.handleChange("sets",i,j,event)} className="setAndRep"
                                    type="number" name="sets" value={this.props.preRows[i].srw[j].sets ? this.props.preRows[i].srw[j].sets : 0}/>
                        <input onChange={(event) => this.props.handleChange("reps",i,j,event)} className="setAndRep" 
                                    type="number" name="reps" value={this.props.preRows[i].srw[j].reps ? this.props.preRows[i].srw[j].reps : 0}/>

                        <input className="weight" onChange={(event) => this.props.handleChange("weight",i,j,event)} 
                                    type="number" name="weight" value={this.props.preRows[i].srw[j].weight ? this.props.preRows[i].srw[j].weight : 0}/>                     
                    </div>
                )
                if(numSRW === 0){
                    break;
                }
            }
            

            offsetCols *= 2;
            let offset = "col-sm-" + offsetCols;
            grid.push(                
                <div key={i} className="row">
                    <div className="col-sm-2"><input className="exercise"onChange={(event) => this.props.handleChange("name",i,0,event)} 
                                                            type="text" name="name" value={this.props.preRows[i].name ? this.props.preRows[i].name : ""}/> 
                    </div>
                    {srwGrid}
                    <div className="col-sm-2">
                        <input className="btn btn-success" type="button" onClick={() => this.props.addSRW(i)} value="+" />
                        <input className="btn btn-danger" type="button" onClick={() => this.props.delSRW(i)} value="-" />
                    </div>
                    
                    
                    <div className={offset}></div>
                    <div className="col-sm-2"><input type="button" onClick={() => this.props.removeRow(i)} value="X" /></div>                    
                </div>
            );
        }

        return  (
            <div>
                <div className="row justify-content-center">
                    <div className="col-sm-2 exerciseText rowNames"> Exercise </div>
                    <div className="col-sm-2 setAndRepText rowNames"> Sets / Reps </div>
                    <div className="col-sm-2 rowNames"> Weight </div>
                    <div className="col-sm-2 rowNames"> Total Weight </div>
                    <div className="col-sm-2 rowNames"> Delete Row </div>

                </div>
                {grid}
                <div className="row justify-content-center">
                    <input className="col-sm-2 btn btn-success" type="button" onClick={this.props.addNewRow} value="+"/>
                </div>
            </div>
        );
    }
}

export default WorkoutRows;