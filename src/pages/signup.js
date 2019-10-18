import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import * as actions from '../actions';
import {Button, Form, Grid, Message} from "semantic-ui-react";
import * as ROUTES from "./../logistics/routes"
// import SignUp from './signup';


// const loginUser = userObj => ({
//   type: 'LOGIN_USER',
//   payload: {}
// })
//
//
// var myEmail=" ";
// var myPassword=" ";



class SignUp extends Component{
 constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',

    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    //window.postfetch= this.userPostFetch;
}

  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
    // myEmail=this.state.email;
    // myPassword= this.state.password;

}

  //
    onSubmit=(formData)=>{
    // event.preventDefault();
       console.log(this.state.email);
       console.log(this.state.password);
       this.props.signUp(formData);


       //console.log(formData)
       console.log('submitted');
    // this.userPostFetch();
    // console.log(myEmail);
    // console.log(myPassword);

  }

  // onSubmit (formData){
  //   this.props.signUp(formData);
  // }



  userPostFetch = () =>{
    fetch('http://localhost:5000/users/signup',{
      method:"POST",
      mode:'cors',
      headers:{
        "Access-Control-Allow-Origin":"*",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password:this.state.password
      })
    })

    .then(resp=> resp.json())
    .then(function (data){
      console.log(data);
      console.log(data.token);
      if(data.token){
        localStorage.setItem("token", data.token);


    }


    })

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
const mapDispatchToProps= (dispatch)=>
//promise function
{
   return dispatch({
    type:'SIGNUP_USER',
    payload: { email:'',
      passoword: ''}
             })
}
// const mapDispatchToProps= dispatch=>({
//
//     userPost: ()=>
//     dispatch ({
//     type:'SIGNUP_USER',
//     payload: { email:myEmail,
//       passoword: myPassword}
//
//              })
//
//
//
// })
// const mapDispatchToProps = dispatch => ({
//
//   userPostFetch: userInfo =>dispatch(userPostFetch(userInfo))
// }
// )
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