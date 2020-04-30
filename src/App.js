import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import Main from './components/Main.js';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
      <Router>
        <Main/>
      </Router>
    </div>
  );
}

export default App;