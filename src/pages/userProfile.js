import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Button, Form,Grid} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';

export default class UserProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      nameToDisplay:'',
      city:''
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


  onSubmit=()=>{
  // event.preventDefault();
     console.log(this.state.nameToDisplay);
     console.log(this.state.city);
     //this.props.signIn(formData);
     axios.post('http://localhost:5000/users/addUserPro',{
    nameToDisplay: this.state.nameToDisplay,
    city: this.state.city
  }).
  then(function(response){
    window.alert("Profile Completed!");
  });


     console.log('submitted');

}


  render(){
  //  const {handleSubmit} = this.props;
    return (
<Grid centered columns={3}>



            <Form onSubmit={this.onSubmit}>
            <Form.Input
            icon="user"
            iconPosition="left"
            type="text"
            name='nameToDisplay'
            value={this.state.nameToDisplay}
            onChange={this.handleInputChange}
            required
            />


            <Form.Input
            icon="building"
            iconPosition="left"
            type="text"
            name='city'
            value={this.state.city}
            onChange={this.handleInputChange}
            required
            />

            <Button
              color="pink"
              fluid
              size="large"
              type="submit">Submit
            </Button>

            </Form>
        </Grid>






    );
  }


}
