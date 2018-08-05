import React,{Component} from 'react';
import './styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <a className="center-icon float-left" rel="noopener noreferrer" href="https://github.com/theDoland" target="_blank"><FontAwesomeIcon className="icons" icon={['fab', 'github']}/></a>
                <a className="center-icon float-left" rel="noopener noreferrer" href="https://linkedin.com/in/donald-nguyen-a59180161" target="_blank"><FontAwesomeIcon className="icons" icon={['fab', 'linkedin']}/></a>
                <div className="float-right"> Website by Donald Nguyen</div> 

            </div>
        )
    }
}

export default Footer;