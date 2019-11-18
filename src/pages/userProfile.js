import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Dropdown, Button, Form,Grid, Card, Message,Icon,Popup} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import {connect} from 'react-redux';

const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>Bob Smith</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'profile', text: 'Your Profile' },
    { key: 'stars', text: 'Your Stars' },
    { key: 'explore', text: 'Explore' },
    { key: 'integrations', text: 'Integrations' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' },
  ]

  const trigger = (
    <span>
      <Icon name='user' /> Hello, Bob
    </span>
  )

class UserProfile extends Component{

    render(){
        return(
            <Dropdown trigger={trigger} options={options}/>
        );
    }
}

export default connect(null)
(UserProfile);