import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './components/App';
import CreateUser from './components/CreateUser';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CreateUser />, document.getElementById('root'));
registerServiceWorker();
