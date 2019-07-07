import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/login';
import logo from './logo.svg';
import './App.css';

const App = ()=>  (

  <Router>
     <div>
       <Route path={'/logIn'} component={Login} />
     </div>
  </Router>
);

export default App;
