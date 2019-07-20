import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

/* 设置跨域 */
axios.defaults.crossDomain = true
axios.defaults.withCredentials = true;
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
