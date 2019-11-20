import React, { Component } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import HomeLogo from './../images/home #30C5FF.png';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import { Link,withRouter } from 'react-router-dom';
import * as ROUTES from "../logistics/routes";
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Menu,
  Message,
  Modal,
  Pagination,
  Select,
  Segment,
} from 'semantic-ui-react'

const PaginationCompact = () => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={10}
  />
)

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

const cityOptions=[
  { key: 'Los Angeles', text: 'Los Angeles', value: 'Los Angeles'},
  { key: 'Santa Barbara', text: 'Santa Barbara', value: 'Santa Barbara'},
  { key: 'San Deigo', text: 'San Deigo', value: 'San Deigo'},
  { key: 'San Fransico', text: 'San Fransico', value: 'San Fransico'},
  { key: 'San Jose', text: 'San Jose', value: 'San Jose'},
]

const searchOptions =[
  {key: 'People', value: 'People', text:'new people'},
  {key: 'room', value: 'room', text:'new room'},
]

const rentOptions =[
  {key: '200', value: '200', text:'$200'},
  {key: '400', value: '400', text:'$400'},
  {key: '600', value: '600', text:'$600'},
  {key: '800', value: '800', text:'$800'},
  {key: '1000', value: '1000', text:'$1000'},
  {key: '1200', value: '1200', text:'$1200'},
  {key: '1400', value: '1400', text:'$1400'},
  {key: '1600', value: '1600', text:'$1600'},
  {key: '1800', value: '1800', text:'$1800'},
  {key: '2000', value: '2000', text:'$2000+'},
]

const AppWithBasic = ({ onChange }) => (
  <SemanticDatepicker onChange={onChange} />
);



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      date: null,
      nameToDisplay:'',
      city:'',
      budget:'',
      gender:'',
      age:'',
      allUsers:[],
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  componentDidMount=()=>{
    axios.post('http://localhost:5000/users/homePage',{email:localStorage.getItem('user')})
    .then(function(response){
         console.log(response.data.allusers);
         this.setState({allUsers:response.data.allusers})

  }.bind(this));

  }

  // componentDidUpdate=()=>{
    // window.location.reload(true);
  //   axios.post('http://localhost:5000/users/homePage',{email:localStorage.getItem('user')})
  //   .then(function(response){
  //        console.log(response.data.allusers);
  //        this.setState({allUsers:response.data.allusers})
  //
  // }.bind(this));

  // }

  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  handleDateChange = date => {
    this.setState({ date });
  };


  onSubmit=()=>{
  // event.preventDefault();
     console.log(this.state.nameToDisplay);
     console.log(this.state.city);
     //this.props.signIn(formData);
    axios.post('http://localhost:5000/users/addUserPro',{
    nameToDisplay: this.state.nameToDisplay,
    city: this.state.city,
    budget: this.setState.budget,
    gender: this.setState.gender,
    age: this.setState.age,
  }).
  then(function(response){
    window.alert(response.data);
  });


     console.log('submitted');

  }

  //-------------------------------------------------------------------------------------
  render() {
    const {date, dimmer} = this.state;
    const {allUsers}=this.state;
    console.log(allUsers);

    return (
      <div>
        <Segment secondary style={{ marginTop: "4em" }}>
          <Form style={{marginLeft:"11.5em", marginRight:"0em"}}>
           <Form.Group widths='equal'>
            <Form.Field control={Select}
                label='MovedIn with ...'
                placeholder='Select one'
                options={searchOptions}
                onChange={null} />

              <Form.Field control={Select}
                label='Search location'
                placeholder='Select your city'
                options={cityOptions}
                onChange={null} />

              <Form.Field control={Select}
                label='Rent budget'
                placeholder='$2000+'
                options={rentOptions} />

              <SemanticDatepicker
                label='Moved-in Date'
                onDateChange={this.handleDateChange} />

              <Form.Button primary size='medium' style={{marginTop:"1.6em"}}>
                Search
                <Icon name='right arrow' />
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>



       <Segment>
         <Card.Group>

        
        {
          allUsers.map(
            (user) => {
            return (
            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
              <Image 
                src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} 
                as='a'
                href='null'
                />
              <Card.Content>
                <Card.Header>{user.nameToDisplay}</Card.Header>
                <Card.Meta>
                  <span className='status'>Need a ${user.budget} room in {user.city}</span>
                </Card.Meta>
                <Card.Description>
                  {user.gender}, {user.age} years old
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  2 occupants
                  </a>
              </Card.Content>
            </Card>
            )
          }
          )
        } 
        </Card.Group>
        </Segment>
       
        <div class="ui centered grid">
          <div aria-label="Pagination Navigation" role="navigation" class="ui pagination menu">
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="1"
              aria-label="Previous item"
              type="prevItem"
              class="item"
            >
            ⟨
            </a>
            <a
              aria-current="true"
              aria-disabled="false"
              tabindex="0"
              value="1"
              type="pageItem"
              class="active item"
            >
              1
        </a>
            <a aria-current="false" aria-disabled="false" tabindex="0" value="2" type="pageItem" class="item">
              2
        </a>
            <a aria-current="false" aria-disabled="false" tabindex="0" value="3" type="pageItem" class="item">
              3
        </a>
            <a
              aria-current="false"
              aria-disabled="false"
              tabindex="0"
              value="2"
              aria-label="Next item"
              type="nextItem"
              class="item"
            >
              ⟩
        </a>
          </div>
        </div>




      </div>//--------
    );
  }
}
export default App;
