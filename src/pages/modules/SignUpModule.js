import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import * as actions from '../../actions/';
import {InputField} from 'react-semantic-redux-form';
import {Button,
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
Select,
Search} from "semantic-ui-react";
import * as ROUTES from "../../logistics/routes"

class SignUpModule extends Component{
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

  //
    onSubmit=(formData)=>{
    // event.preventDefault();
       console.log(this.state.email);
       console.log(this.state.password);
       this.props.signUp(formData);
       console.log('submitted');


  }

  render(){
    const {handleSubmit} = this.props;
    const { dimmer,
            email,
            password} = this.state;

    const createAccountisDisabled = email===''||password==='';

    return (
      <div>
                <Form as='form' onSubmit={handleSubmit(this.onSubmit)}>
                  
                  <Field
                    component={InputField}
                    size="large"
                    type='text'
                    name='email'
                    fluid
                    icon='mail'
                    iconPosition='right'
                    placeholder='E-mail address'
                    value={this.state.signupEmail}
                    onChange={this.handleInputChange}
                    required
                  />

                  <Field
                    component={InputField}
                    size="large"
                    name='password'
                    fluid
                    icon='lock'
                    iconPosition='right'
                    placeholder='Password'
                    type='password'
                    value={this.state.signupPassword}
                    onChange={this.handleInputChange}
                    required
                  />

                  <Button color='blue'
                    fluid
                    size='large'
                    disabled={createAccountisDisabled}
                    onClick={this.handleNextStep}
                  >
                    Create Account
                  </Button>
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
connect(mapStateToProps, actions),
reduxForm({form:'signup'})
) (SignUpModule)
