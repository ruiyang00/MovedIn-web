import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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


            <form onSubmit={this.onSubmit}>
            <h1>Login</h1>
            <input
            type="text"
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleInputChange}
            required
            />


            <input
            type="text"
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            />
            <input type="submit" value="Submit"/>
            </form>



    );
  }
}
