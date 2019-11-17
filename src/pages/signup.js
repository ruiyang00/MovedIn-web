import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import * as actions from '../actions';
import {Button, Form, Grid, Message} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"



class SignUp extends Component{
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
    return (
<Grid centered columns={5}>
            <Form as='form' onSubmit={handleSubmit(this.onSubmit)}>
            <p></p>
            <h1><i>Come SignUp to Join Us</i></h1>
            <h4>Already Registered? <Link to={ROUTES.SIGN_IN}>Sign In</Link></h4>
            <p></p>



            <div>
            <label><h3> Email: </h3> </label>

            <Field
            component='input'
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

            <Field
            component='input'
            type="text"
            name='password'
            placeholder='abc123'
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


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}
//export default connect(null, actions)(SignUp);
export default compose(
  connect(null,actions),
  reduxForm ({form:'signup'})
)(SignUp)
