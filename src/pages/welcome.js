import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Button, Form, Grid, Message, Select} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"

const roles=[
  {key: 'student', value:'student', text:'Student'},
  {key: 'non-Student', value:'non-student', text:' Non-Student'}
]
export default class Welcome extends Component{
  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
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
        <Grid.Row>
         <h1>MovedIn</h1>
         </Grid.Row>
         <h3><i>We're Striving to Get You Moved to a New Place & Connect You with New People!</i></h3>
              <Grid.Row>
              <Form onSubmit={this.onSubmit}>
              <Select placeholder="You're A..." options={roles} />

              <Form.Input
              type="text"
              name='location'
              placeholder='Location'
              value={this.state.password}
              onChange={this.handleInputChange}
              required
              />

              <Button
                color="yellow"
                fluid
                size="large"
                type="submit">
                Check it out!
              </Button>

              </Form>
                </Grid.Row>
          <Message>
          <h4>Not Onboard yet? Go <Link to={ROUTES.SIGN_UP}>Sign Up</Link> to Unlock more!</h4>
          <h4>Already Registered? <Link to={ROUTES.SIGN_IN}>Sign In</Link> to View what U have from us!</h4>
          </Message>

  </Grid>

    )
  }
}
