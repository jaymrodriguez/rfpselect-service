/* eslint  react/jsx-filename-extension: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import './css/main.css';
import './css/style.css';
import App from './components/App';
import { registerServiceWorker, unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
