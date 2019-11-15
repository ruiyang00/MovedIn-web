import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Dropdown, Button, Form,Grid, Card, Message,Icon,Popup} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import {connect} from 'react-redux';

const genderChoice=[

  {
    key:"Female",
    text:"Female",
    value:"Female"
  },
  {
    key:"Male",
    text:"Male",
    value:"Male"
  },
  {
    key:"Others",
    text:"Others",
    value:"Others"
  },

]
class UserProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      nameToDisplay:'',
      city:'',
      state:'',
      occupation:'',
      company:'',
      gender:'',
      budget:0,
      roomtype:'',
      role:'',
      allUsers:[],
      userPro:{},
      user:'',
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  componentDidMount=()=>{
    this.setState({user:localStorage.getItem('user')});
    axios.post('http://localhost:5000/users/getUserPro',{userEmail:localStorage.getItem('user')})
    .then(function(response){
         if(response.data.error){
           window.alert(response.data.error);
         }
         else{
            console.log(response.data.user);
            this.setState({userPro:response.data.user,
                           nameToDisplay:response.data.user.nameToDisplay,
                           city:response.data.user.city,
                           state:response.data.user.state,
                           occupation:response.data.user.occupation,
                           role:response.data.user.role,
                           roomtype:response.data.user.roomtype,
                           gender:response.data.user.gender,
                           budget:response.data.user.budget,



            })
         }

 }.bind(this));

  }


  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  handleSelectChange= (event) =>{
    const{defaultValue,name}=event.target;
    this.setState({
      [name]:defaultValue
    });
  }


  onSubmit=()=>{
  // event.preventDefault();
     console.log(this.state.nameToDisplay);
     console.log(this.state.user);
     //this.props.signIn(formData);
     axios.post('http://localhost:5000/users/addUserPro',{
    nameToDisplay: this.state.nameToDisplay,
    city: this.state.city,
    state:this.state.state,
    occupation:this.state.occupation,
    gender:this.state.gender,
    budget:this.state.budget,
    roomtype:this.state.roomtype,
    role:this.state.role,
    email:this.state.user,
  }).
  then(function(response){
    window.alert('update successful');
  });


     console.log('submitted');

}


  render(){
   const {handleSubmit} = this.props;
  //
    const {allUsers}=this.state;
    console.log(allUsers);
    const{
       nameToDisplay,
       city,
       state,
       occupation,
       company,
       gender,
       budget,
       roomtype,
       role,

    }=this.state
    const isInvalid =

			nameToDisplay === "" ||
			city === "" ||
			state === "" ||
      occupation === "" ||
      company === ""  ||
      gender !== "Male" && gender !=="Female" && gender!=="Others"   ||
      budget === 0    ||
      budget === ""   ||
      roomtype !== "Single" && roomtype!=="Double" && roomtype!=="Multiperson"  ||
      role !== "Owner" && role !=="Renter"
          ;
      const genderInvalid = gender !== 'Male' && gender !=="Female" && gender !== "Others";
      const budgetInvalid = budget <= 10 || budget === "" || isNaN(budget) || budget.toString().charAt(0)==='0';
      const roomtypeInvalid = roomtype!=="Single" && roomtype !== "Double" && roomtype !=="Multiperson";
      const roleInvalid = role !=="Owner" && role !== "Renter";


      return(
    // allUsers.map((user)=>{
    //
    //   return(
    //
    //   <Card>
    //     <Card.Content>
    //        {user.city}
    //     </Card.Content>
    //   </Card>

//)

<Grid centered columns={3}>



            <Form onSubmit={this.onSubmit}>
         <p>*You Need to Completely Fill Out this Form </p>
         <p>to Optimize Rental Recommendations</p>

            <Icon name="user" size="large" />
            <Popup
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='nameToDisplay'
            placeholder="nameToDisplay"
            value={this.state.nameToDisplay}
            onChange={this.handleInputChange}
            required
            />}
             content="How do you want to idetify yourself on MovedIn?"
             on='focus'
             position="left center"
            />


            <Icon name="building" size="large" />
            <Popup
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='city'
            placeholder="City"
            value={this.state.city}
            onChange={this.handleInputChange}
            required
            />}
            content="In which City will you rent?"
            on='focus'
            position="left center"
            />

            <Icon name="compass" size="large" />
            <Popup
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='state'
            placeholder="State"
            value={this.state.state}
            onChange={this.handleInputChange}
            required
            />}
            content="In which State will you rent"
            on='focus'
            position="left center"
            />

            <Icon name="briefcase" size="large" />
            <Popup
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='occupation'
            placeholder="Occupation"
            value={this.state.occupation}
            onChange={this.handleInputChange}
            required
            />}
            content="What will be your Occupation during the Rental period"
            on="focus"
            position="left center"
            />

            <Icon name="fax" size="large" />
            <Popup
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='company'
            placeholder="Company"
            value={this.state.company}
            onChange={this.handleInputChange}
            required
            />}
            content="Where will you be Working during the Rental period"
            on='focus'
            position="left center"
            />

            <Icon name="transgender" size="large" />
            <Popup
            open={genderInvalid}
            position="right center"
            trigger={
            <Form.Input

            size="large"
            fluid
            type="text"
            placeholder="Gender"
            name="gender"
            value={this.state.gender}
            onChange={this.handleInputChange}
            required
            />}
            content='Please Only Enter "Female", "Male" or "Others"'

            />

            <p></p>
            <Icon name="dollar" size="large" />
            <Popup
            open={budgetInvalid}
            position="left center"
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='budget'
            placeholder="Your Budget per month"
            value={this.state.budget}
            onChange={this.handleInputChange}
            required
            />}
            content="Please enter an expected median integer > 10. For example, if you enter 800, we will recommed rental rooms to you that cost $600-$1000"
            on='focus'
            />

            <Icon name="bed" size="large" />
            <Popup
            open={roomtypeInvalid}
            position="right center"
            trigger={
            <Form.Input
            size="large"
            fluid
            type="text"
            name='roomtype'
            placeholder="RoomType"
            value={this.state.roomtype}
            onChange={this.handleInputChange}
            required
            />}
             content="Please Only Enter 'Single', 'Double' or 'Multiperson'"
             on='focus'
            />

            <Icon name="users" size="large" />
            <Popup
            open={roleInvalid}
            position="left center"
            trigger={
            <Form.Input
            size="large"
            type="text"
            name='role'
            placeholder="Your role in using MovedIn"
            value={this.state.role}
            onChange={this.handleInputChange}
            required
            />}
            content="Please Only Enter 'Renter' or 'Owner'"
            on="focus"
            />


            <Button
              color="pink"
              fluid
              disabled={isInvalid}
              size="large"
              type="submit">Submit Changes

            </Button>


            </Form>
        </Grid>







//})


)
  }


}

function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps,null)
(UserProfile);
