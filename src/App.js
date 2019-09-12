import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/login';
import MainPage from './pages/mainPage';
import Search from './pages/search'
import logo from './logo.svg';
import './App.css';

const App = ()=>  (

  <Router>
     <div>
       <Route path={'/logIn'} component={Login} />
       <Route path={'/mainPage'} component={MainPage} />
       <Route path={'/search'} component={Search} />
     </div>
  </Router>
);

export default App;