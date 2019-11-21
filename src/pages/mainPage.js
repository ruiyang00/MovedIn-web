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
  ButtonContent,
} from 'semantic-ui-react'

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

const parkingOptions =[
  {key: false, value: false, text:'No car'},
  {key: true, value: true, text:'Have car'},
]

const genderOption =[
  {key: 'Male', value: 'Male', text:'Male'},
  {key: 'Female', value: 'Female', text:'Female'},
  {key: 'Other', value: 'Other', text:'Other'},
]

const bathroomOpotion =[
  {key: false, value: false, text:'Need private bathroom'},
  {key: true, value: true, text:'Share bathroom ok'},
]

const petOpotion =[
  {key: false, value: false, text:'No pets'},
  {key: true, value: true, text:'Have pets'},
]

const smokingOpotion =[
  {key: false, value: false, text:'No smoking'},
  {key: true, value: true, text:'Smoking ok'},
]

const partyOpotion =[
  {key: false, value: false, text:'No party'},
  {key: true, value: true, text:'Party ok'},
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
      modal1isOpon:false,
      modal2isOpon:false,
      modal3isOpon:false,
      modal4isOpon:false,
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
    axios.get('http://localhost:5000/roommates/getroommates',{
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

  showModal1 = (dimmer) => () => this.setState({ dimmer, modal1isOpon: true })
  closeModal1 = () => this.setState({ modal1isOpon: false })

  showModal2 = (dimmer) => () => this.setState({ dimmer, modal2isOpon: true })
  closeModal2 = () => this.setState({ modal2isOpon: false })

  showModal3 = (dimmer) => () => this.setState({ dimmer, modal3isOpon: true })
  closeModal3 = () => this.setState({ modal3isOpon: false })

  showModal4 = (dimmer) => () => this.setState({ dimmer, modal4isOpon: true })
  closeModal1 = () => this.setState({ modal1isOpon: false })
  //-------------------------------------------------------------------------------------
  render() {
    const {date, dimmer} = this.state;
    const {allUsers}=this.state;
    console.log(allUsers);
    

    return (
      <div>
        <Segment secondary style={{ marginTop: "4em", marginBottom:"0em"}}>
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
        
        <Menu size='small' borderless style={{ marginTop: "0em", marginBottom:'0em' }}>
          <Menu.Item>
            <Segment style={{ marginLeft: "11.5em" }}>
              Filter people by
            </Segment>
          </Menu.Item>
          <Menu.Item >
            <Dropdown clearable
              placeholder='Gender'
              fluid selection
              options={genderOption} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown clearable
              placeholder='Have car?'
              fluid selection
              options={parkingOptions} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown clearable
              placeholder='Share bathroom'
              fluid selection
              options={bathroomOpotion} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown clearable
              placeholder='Pet'
              fluid selection
              options={petOpotion} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown clearable
              placeholder='Smoking'
              fluid selection
              options={smokingOpotion} />
          </Menu.Item>
          <Menu.Item>
            <Dropdown clearable
              placeholder='Party'
              fluid selection
              options={partyOpotion} />
          </Menu.Item>
          <Menu.Item position='right' style={{marginRight:"10em"}}>
            <Button fluid color='twitter'>Update Results</Button>
          </Menu.Item>
        </Menu>


       
        <Segment style={{marginTop:'0em'}}>
         <Card.Group itemsPerRow={4} style={{marginLeft:"6.5em"}}>
          {
            allUsers.map((user)=>{
              return(
                <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
                <Image 
                  src={user.pic} wrapped ui={false} 
                  as='a'
                  onClick={this.showModal1('blurring')}
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
                        1 occupant
                        </a>
                    </Card.Content>
                  </Card>        
                )})
          }
        </Card.Group>
        
    
        <Pagination
          style={{marginTop:"2em" , marginLeft:"42em"}}
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={5}
        />
      </Segment>

      </div>//--------
    );
  }
}
export default App;
