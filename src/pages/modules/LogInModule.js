import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../../actions';
import {
  Button,
  Container,
  Dropdown,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Message,
  Menu,
  Modal,
  Segment,
  Search
} from 'semantic-ui-react'
import * as ROUTES from "../../logistics/routes"

 class LogInModule extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
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


 async onSubmit(formData){
  // event.preventDefault();
     console.log(this.state.email);
     console.log(this.state.password);
     await this.props.signIn(formData);
     //console.log(formData
     window.location.reload(true);
     console.log('submitted');

}


  render(){
    const {handleSubmit} = this.props;
    const { open, dimmer} = this.state;
    return (

      <div>
        <Form size='large' as='form' onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Header>
            <Button class="ui facebook button" color="facebook" size="large" fluid >
              <i class="facebook icon"></i>
              Log In with Facebook
              </Button>

            <Button class="ui google button" color="google plus" size="large" fluid style={{ marginTop: "0.5em" }}>
              <i class="google icon"></i>
              Log In with Google
              </Button>
          </Modal.Header>

          <Divider horizontal>or</Divider>

          <Modal.Content>
            <Field
              component={InputField}
              type='text'
              name='email'
              fluid
              icon='mail'
              iconPosition='right'
              style={{ marginTop: "0.5em" }}
              placeholder='E-mail address'
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />

            <Field
              component={InputField}
              type='password'
              name='password'
              fluid
              icon='lock'
              iconPosition='right'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <Button color='blue' fluid size='large'>
              Log In
              </Button>
          </Modal.Content>
          </Form>

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}



export default compose(
  connect(mapStateToProps,actions),
  reduxForm ({form:'login'})
)(LogInModule)
