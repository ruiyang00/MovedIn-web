import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import {Button, Form, Grid, Message, Image, Icon} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"

 class LogIn extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }


  onSubmit=(formData)=>{
  // event.preventDefault();
     console.log(this.state.email);
     console.log(this.state.password);
     this.props.signIn(formData);
     //console.log(formData)
     console.log('submitted');
  // this.userPostFetch();
  // console.log(myEmail);
  // console.log(myPassword);

}

  render(){
    const {handleSubmit} = this.props;
    return (
<Grid centered columns={3}>

            <Form as='form' onSubmit={handleSubmit(this.onSubmit)}>
            <p></p>
            <h1>Log In</h1>

            <h4>Not Onboard yet? Go <Link to={ROUTES.SIGN_UP}>Sign Up</Link></h4>

            <Field
            component={InputField}
            icon="user"
            iconPosition="left"
            type="text"
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />


            <Field
            component={InputField}
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

            <Grid.Row></Grid.Row>
            <Grid.Row>


             <Grid columns={2}>



              <Grid.Column>
              <Button
              color="green"
              size="large"
              fluid
              type="submit"
              icon
              labelPosition="left"
              >
                <i>Sign  In</i>

                <Icon name='google' size="large" />
                < /Button>
              </Grid.Column>

              <Grid.Column>
              <Button
              color="yellow"
              size="large"
              fluid
              type="submit"
              icon
              labelPosition="left"
              >
                <i>Sign  In</i>

                <Icon name='facebook' size="large" />
                < /Button>
              </Grid.Column>

          </Grid>
            </Grid.Row>

            </Grid>






    );
  }
}

export default compose(
  connect(null,actions),
  reduxForm ({form:'signin'})
)(LogIn)
