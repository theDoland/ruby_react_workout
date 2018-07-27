import React from 'react';
import './styles/Exercises.css';

class DaysOfWeek extends React.Component {
    render() {
        var daysOfWeek = [ "Sunday", "Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

        // for some reason, () => does not cause an infinite loop, but just the function does
        return (
                daysOfWeek.map((element, i) => 
                    <button id={element} key={i} onClick={() => this.props.onClick(i)} className={this.props.activeDay(i)}>{element}</button>
                ) 
        );
    }
}

export default DaysOfWeek;