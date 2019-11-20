import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Dropdown, Button, Form,Grid, Card, Message,Icon,Popup,Tab} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import {connect} from 'react-redux';


class UserProfile extends Component{

     render(){
       const panes =[
          {menuItem:'General Information',render:()=> <Tab.Pane>Tab 1 Content</Tab.Pane>},
          {menuItem:'Personal Details',render:()=> <Tab.Pane>Tab 2 Content</Tab.Pane>},
          {menuItem:'Special Interest',render:()=> <Tab.Pane>Tab 3 Content</Tab.Pane>},
            ]
        return(
          <p>Hello World</p>


        );
     }
}

export default connect(null)
(UserProfile);
