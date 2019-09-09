import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/signup';
import Welcome from './pages/welcome';
import logo from './logo.svg';
import './App.css';

const App = ()=>  (

  <Router>
     <div>
       <Route exact path={'/'} component={Welcome}/>
       <Route path={'/welcome'} component={Welcome}/>
       <Route path={'/logIn'} component={Login} />
       <Route path={'/signup'} component={SignUp}/>

     </div>
  </Router>
);

export default App;
