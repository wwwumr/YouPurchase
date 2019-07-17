import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import Axios from 'axios';
import * as serviceWorker from './serviceWorker';

Axios.defaults.crossDomain = true
Axios.defaults.withCredentials = true;
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
