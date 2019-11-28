import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../../actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
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
import Axios from 'axios';

 class LogInModule extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      loginModalisOpen:false,
      isAuthenticated: false, user: null, token: ''
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
};

    facebookResponse = (e) => {};
    googleResponse = (e) => {};
    onFailure = (error) => {
      alert(error);
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
     window.location.href = 'http://localhost:3000/mainPage';
     console.log('submitted');
}

closeLogin = () => this.setState({ loginModalisOpen: false })

  render(){
    const {handleSubmit} = this.props;
    const { open, dimmer} = this.state;

    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (

      <div>
        <Form size='large' as='form' onSubmit={handleSubmit(this.onSubmit)}>
          <Modal.Header>
          <Segment size="large" fluid >
            <FacebookLogin
                  size='medium'
                  appId="430563460963841" //need to store it in another file
                  fields="name,email,picture"
                  callback={responseFacebook}
                />
            <GoogleLogin
                clientId="343939675754-s1d2uieeguhlssp11gv4hnuskfeod5o2.apps.googleusercontent.com" ////need to store it in another file
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </Segment>
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
            <Button color='blue'
                    fluid
                    size='large'
                    onClick={this.closeLogin}>
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
