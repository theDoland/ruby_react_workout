import React from 'react';
import './styles/Exercises.css';

class DaysOfWeek extends React.Component {
    render() {
        var daysOfWeek = [ "Sunday", "Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
        
        
        // for some reason, () => does not cause an infinite loop, but just the function does
        return (
            <div className="dropdown show">
                <button className="btn dropdown-toggle" type="button" id="daycontent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {daysOfWeek[this.props.currDay]}
                </button>
                <div className="dropdown-menu" aria-labelledby="daycontent">
                    
                        {daysOfWeek.map((element, i) => 
                                <a key={i} id={element} onClick={() => this.props.onClick(i)} className={this.props.activeDay(i)}>{element}</a>
                        )} 
                    
                </div>
            </div>
        );
    }
}

export default DaysOfWeek;