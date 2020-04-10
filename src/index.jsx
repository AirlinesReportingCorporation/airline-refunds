import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import "./scss/main.scss"; 

var mountNode = document.getElementById('app');

ReactDOM.render(<App />, mountNode);