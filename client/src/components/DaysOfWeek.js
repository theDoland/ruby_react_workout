import React from 'react';
import './Exercises.css';

class DaysOfWeek extends React.Component {
    render() {
        var daysOfWeek = ["Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // for some reason, () => does not cause an infinite loop, but just the function does
        return (
            <div className="row justify-content-center">
                { daysOfWeek.map((element, i) => 
                    <div className="col" id={element} key={i}> <button onClick={() => this.props.onClick(i)} className={this.props.activeDay(i)}>{element}</button> </div>) 
                }
            </div>
        );
    }
}

export default DaysOfWeek;