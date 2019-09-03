import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Button, Form, Grid, Message} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"

export default class SignUp extends Component{
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
<Grid centered columns={5}>
            <Form onSubmit={this.onSubmit}>
            <p></p>
            <h1><i>Come SignUp to Join Us</i></h1>
            <h4>Already Registered? <Link to={ROUTES.SIGN_IN}>Sign In</Link></h4>
            <p></p>
            <div>
              <label><h3> FirstName:</h3> </label>
            <input
            type="text"
            name='firstname'
            placeholder='Angela'
            value={this.state.firstname}
            onChange={this.handleInputChange}
            required
            />
            </div>
            <div>
            <label><h3> LastName:</h3> </label>
            <input
            type="text"
            name='lastname'
            placeholder='yuan'
            value={this.state.lastname}
            onChange={this.handleInputChange}
            required
            />
            </div>

            <div>
            <label><h3> Email: </h3> </label>
            <input
            type="text"
            name='email'
            placeholder='whatisup@gmail.com'
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />
            </div>
            <div>
            <label><h3> Password:</h3> </label>
            <input
            type="text"
            name='password'
            placeholder='abc123'
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />
            </div>

            <div>
            <label><h3> Confirm Password:</h3> </label>
            <input
            type="text"
            name='confirm psw'
            placeholder='password again plz'
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />
            </div>

<p></p>
            <Button
              color="green"
              fluid
              size="large"
              type="submit">
              <h2><i>Let's Get You MovedIn</i></h2>
            </Button>

            </Form>
  </Grid>



    );
  }
}
