import React from 'react';

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

export default WorkoutRows;