import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Button, Form, Grid, Message} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"

export default class LogIn extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    };
  }

  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  onSubmit = (event)=>{
    event.preventDefault();
    alert('Authentication coming soon!');
  }

  render(){
    return (
<Grid centered columns={3}>

            <Form onSubmit={this.onSubmit}>
            <p></p>
            <h1>Log In</h1>

            <h4>Not Onboard yet? Go <Link to={ROUTES.SIGN_UP}>Sign Up</Link></h4>

            <Form.Input
            icon="user"
            iconPosition="left"
            type="text"
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />


            <Form.Input
            icon="lock"
            iconPosition="left"
            type="text"
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />

            <Button
              color="pink"
              fluid
              size="large"
              type="submit">
              <h3><i>Unlock My Journey</i></h3>
            </Button>

            </Form>

            </Grid>



    );
  }
}
