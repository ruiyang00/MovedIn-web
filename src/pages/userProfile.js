import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Button, Form,Grid, Card} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';

export default class UserProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      nameToDisplay:'',
      city:'',
      allUsers:[],
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  componentDidMount=()=>{
    axios.post('http://localhost:5000/users/homePage')
    .then(function(response){
         console.log(response.data.allusers);
         this.setState({allUsers:response.data.allusers})

 }.bind(this));

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
    window.alert(response.data);
  });


     console.log('submitted');

}


  render(){
   const {handleSubmit} = this.props;
  //
    const {allUsers}=this.state;
    console.log(allUsers);
      return(
    allUsers.map((user)=>{

      return(

      <Card>
        <Card.Content>
           {user.city}
        </Card.Content>
      </Card>

)

// <Grid centered columns={3}>
//
//
//
//             <Form onSubmit={this.onSubmit}>
//             <Form.Input
//             icon="user"
//             iconPosition="left"
//             type="text"
//             name='nameToDisplay'
//             value={this.state.nameToDisplay}
//             onChange={this.handleInputChange}
//             required
//             />
//
//
//             <Form.Input
//             icon="building"
//             iconPosition="left"
//             type="text"
//             name='city'
//             value={this.state.city}
//             onChange={this.handleInputChange}
//             required
//             />
//
//             <Button
//               color="pink"
//               fluid
//               size="large"
//               type="submit">Submit
//             </Button>
//
//             </Form>
//         </Grid>
//






})
)
  }


}
