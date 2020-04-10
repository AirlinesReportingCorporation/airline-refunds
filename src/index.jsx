import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import "./scss/main.scss";

var mountNode = document.getElementById('app');

ReactDOM.render(<App />, mountNode);