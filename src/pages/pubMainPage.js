import React, { Component } from 'react'
import HomeLogo from './../images/home #30C5FF.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { InputField } from 'react-semantic-redux-form';
import * as actions from '../actions';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from "../logistics/routes";
import axios from 'axios';
import * as moment from 'moment';
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
  Pagination,
  Select,
  Segment,
  ButtonContent,
} from 'semantic-ui-react'

const backgroundStyle = {
  //width: "100%",
  //height: "100vh",
  backgroundImage: `url(https://i.ibb.co/dQykXsR/2560x1080-F5-F5-F5.png)`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};

const cityOptions = [
  { key: 'Los Angeles', text: 'Los Angeles', value: 'Los Angeles' },
  { key: 'Santa Barbara', text: 'Santa Barbara', value: 'Santa Barbara' },
  { key: 'San Deigo', text: 'San Deigo', value: 'San Deigo' },
  { key: 'San Fransico', text: 'San Fransico', value: 'San Fransico' },
  { key: 'San Jose', text: 'San Jose', value: 'San Jose' },
]


const genderOption = [
  { key: 'Male', value: 'Male', text: 'Male' },
  { key: 'Female', value: 'Female', text: 'Female' },
  { key: 'Other', value: 'Other', text: 'Other' },
]

class pubMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      nameToDisplay: '',
      city: '',
      budget: '',
      age: '',
      allUsers: [],

      target: '',
      city: '',
      budgetRange: '',
      movedInMonth: '',
      gender: '',
      parking: '',
      sharedBath: '',
      pet: '',
      smoking: '',
      party: '',

      roommatestoDisplay: [],
      roomstoDisplay: [],

      showRooms: false,
      showRoommates: true,

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const querystring = require('querystring');
    if (this.props.location.state) {
      if (this.props.location.state.targetGroup === "new place to MovedIn")
        this.setState({
          showRoommates: false,

        });
      // axios.get(, querystring.stringify({ foo: 'bar' })
      // )
      axios.get('http://localhost:5000/roommates/getroommates', {
        headers: {
          'Authorization': 'San Jose'
        }
      })
        .then(function (response) {
          console.log(response);
          this.setState({ roommatestoDisplay: response.data.allRoommatesWithinLocation })

        }.bind(this));
      axios.get('http://localhost:5000/rooms/getrooms',
        {
          headers: {
            'Authorization': 'San Jose'
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({ roomstoDisplay: response.data.allRoomsWithinLocation })

        }.bind(this));

      this.props.history.push({
        pathname: './mainPage',
        state: undefined
      });
    }

    else {
      axios.get('http://localhost:5000/roommates/getroommates', {
        headers: {
          'Authorization': 'San Jose'
        }
      })
        .then(function (response) {
          console.log(response);
          this.setState({ roommatestoDisplay: response.data.allRoommatesWithinLocation })

        }.bind(this));

      axios.get('http://localhost:5000/rooms/getrooms', {
        headers: {
          'Authorization': 'San Jose'
        }
      })
        .then(function (response) {
          console.log(response);
          this.setState({ roomstoDisplay: response.data.allRoomsWithinLocation })

        }.bind(this));
    }

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
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  // doPrimaryFilter=()=>{
  //   this.forceUpdate();
  //    this.setState({
  //      target:document.getElementById('target').innerText,
  //      city:document.getElementById('city').innerText,
  //      budgetRange:document.getElementById('budgetRange').innerText,
  //      movedInMonth:document.getElementById('movedInMonth').innerText,
  //
  //    });
  //
  //    //axios post
  // }

  // doSecondaryFilter=()=>{
  //   this.setState({
  //     gender:document.getElementById('gender').innerText,
  //     parking: document.getElementById('parking').innerText,
  //     sharedBath:document.getElementById('sharedBath').innerText,
  //     pet:document.getElementById('pet').innerText,
  //     smoking:document.getElementById('smoking').innerText,
  //     party:document.getElementById('party').innerText,
  //
  //   });
  //   this.printstuff();
  //
  //   //axios post
  // }

  // printstuff(){
  //   console.log(this.state.target);
  //   console.log(this.state.city);
  //   console.log(this.state.budgetRange);
  //   console.log(this.state.movedInMonth);
  //   console.log(this.state.gender);
  //   console.log(this.state.parking);
  //   console.log(this.state.sharedBath);
  //   console.log(this.state.pet);
  //   console.log(this.state.smoking);
  //   console.log(this.state.party);
  //
  // }


  onSubmit = () => {
    // event.preventDefault();
    console.log(this.state.nameToDisplay);
    console.log(this.state.city);
    //this.props.signIn(formData);
    axios.get('http://localhost:5000/roommates/getroommates', {
      nameToDisplay: this.state.nameToDisplay,
      city: this.state.city,
      budget: this.setState.budget,
      gender: this.setState.gender,
      age: this.setState.age,
    }).
      then(function (response) {
        window.alert(response.data);
      });


    console.log('submitted');

  }

  //-------------------------------------------------------------------------------------
  render() {
    var moment = require('moment');
    var currentMonthYear = moment().format("MMMM-YYYY");
    var oneMonthFromNow = moment().add(1, 'months').format('MMMM-YYYY');
    var twoMonthFromNow = moment().add(2, 'months').format('MMMM-YYYY');
    var threeMonthFromNow = moment().add(3, 'months').format('MMMM-YYYY');
    var fourMonthFromNow = moment().add(4, 'months').format('MMMM-YYYY');
    var fiveMonthFromNow = moment().add(5, 'months').format('MMMM-YYYY');
    var sixMonthFromNow = moment().add(6, 'months').format('MMMM-YYYY');
    console.log(sixMonthFromNow);
    const whenToMovedInOptions = [
      { key: currentMonthYear, text: currentMonthYear, value: currentMonthYear },
      { key: oneMonthFromNow, text: oneMonthFromNow, value: oneMonthFromNow },
      { key: twoMonthFromNow, text: twoMonthFromNow, value: twoMonthFromNow },
      { key: threeMonthFromNow, text: threeMonthFromNow, value: threeMonthFromNow },
      { key: fourMonthFromNow, text: fourMonthFromNow, value: fourMonthFromNow },
      { key: fiveMonthFromNow, text: fiveMonthFromNow, value: fiveMonthFromNow },
      { key: sixMonthFromNow, text: sixMonthFromNow, value: sixMonthFromNow },

    ]

    const budgetOptions = [
      { key: '$0-100', text: '$0-100', value: '$0-100' },
      { key: '$100-300', text: '$100-300', value: '$100-300' },
      { key: '$300-500', text: '$300-500', value: '$300-500' },
      { key: '$500-700', text: '$500-700', value: '$500-700' },
      { key: '$700-900', text: '$700-900', value: '$700-900' },
      { key: '$900-1100', text: '$900-1100', value: '$900-1100' },
      { key: '$1100-1300', text: '$1100-1300', value: '$1100-1300' },
      { key: '$1300-1500', text: '$1300-1500', value: '$1300-1500' },
      { key: '$1500-1700', text: '$1500-1700', value: '$1500-1700' },
      { key: '$1700-1900', text: '$1700-1900', value: '$1700-1900' },
      { key: '$1900-2100', text: '$1900-2100', value: '$1900-2100' },
      { key: '$2100-2300', text: '$2100-2300', value: '$2100-2300' },
      { key: '$2300-2500', text: '$2300-2500', value: '$2300-2500' },




    ]

    const booleanOptions = [
      { key: 'Yes', text: 'Yes', value: 'Yes' },
      { key: 'No', text: 'No', value: 'No' },

    ]



    return (
      <div>

      <div style={backgroundStyle}>
        <Segment style={{ marginTop: "3em", marginBottom: "0em", marginLeft:"12em", marginRight:"12em"}}>
          <Form>
            <h3>Looking for...</h3>
            <Button.Group>
              <Button onClick={() => { this.state.showRoommates = true; this.forceUpdate() }} color="olive" size="small">Roommates</Button>
              <Button.Or />
              <Button onClick={() => { this.state.showRoommates = false; this.forceUpdate() }} color="twitter" size="small">Rooms</Button>
            </Button.Group>
            <p></p>
            <Form.Group widths='equal'>


              <Form.Select
                selection
                defaultValue="San Jose"
                id="city"
                label='Search Location'
                options={cityOptions}
                required
              />

              <Form.Select
                selection
                defaultValue={"$500-700"}
                id="budgetRange"
                label='Rent Budget'
                options={budgetOptions}
                required
              />

              <Form.Select
                selection
                defaultValue={oneMonthFromNow}
                id="movedInMonth"
                label='Moved-In Month'
                options={whenToMovedInOptions}
                required
              />


              <Form.Button primary disabled={!this.props.isAuth} size='medium' style={{ marginTop: "1.6em" }} onClick={this.doPrimaryFilter}>
                Search
                <Icon name='right arrow' />
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>

        <Menu size='small' borderless style={{ marginTop: "0em", marginBottom: '0em', marginLeft:"13em", marginRight:"13em"}}>
          <Menu.Item >
            <Form.Select
              clearable
              label='Gender'
              placeholder='Select one'
              id="gender"
              fluid selection
              options={genderOption}
              onChange={null} />
          </Menu.Item>
          <Menu.Item>
            <Form.Select
              clearable
              label='Parking Required'
              placeholder='Select one'
              id="parking"
              fluid 
              selection
              options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>
            <Form.Select
              clearable
              label='Shared Bath'
              placeholder='Select one'
              id="sharedBath"
              fluid 
              selection
              options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>
            <Form.Select
              clearable
              label='Pets'
              placeholder='Select one'
              id="pet"
              fluid selection
              options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>
            <Form.Select
              clearable
              label='Smoking'
              placeholder='Select one'
              id="smoking"
              fluid selection
              options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>
            <Form.Select
              clearable
              label='Party'
              placeholder='Select one'
              id="party"
              fluid 
              selection
              options={booleanOptions} />
          </Menu.Item>
          <Menu.Item position='right' >
            <Button disabled={!this.props.isAuth} onClick={this.doSecondaryFilter} fluid color='twitter'>Update Results</Button>
          </Menu.Item>
        </Menu>

       
          <Card.Group itemsPerRow={4} style={{ marginLeft: "7.25em" }}>
            {this.state.showRoommates ?

              this.state.roommatestoDisplay.map((roommate) => {
                return (

                  <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                    <Image
                      src='https://image.flaticon.com/icons/svg/168/168720.svg' wrapped ui={false}
                      as='a'
                      onClick={null} //should get user id, token. redirect to userDetail page
                    />
                    <Card.Content>
                      <Card.Meta>
                        <span className='status'>{roommate.first_name} {roommate.last_name}</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='user' />
                        {roommate.city}/Budget: ${roommate.budget || "N/A"}
                      </a>
                    </Card.Content>
                  </Card>

                )
              })
              :

              this.state.roomstoDisplay.map((room) => {
                return (

                  <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                    <Image
                      src={'https://image.flaticon.com/icons/svg/1684/1684133.svg'} wrapped ui={false}
                      as='a'
                      onClick={null} //redirect
                    />
                    <Card.Content>
                      <Card.Meta>
                        <span className='status'>{room.room_type}</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <a>
                        <Icon name='home' />
                        {room.city}/Budget: ${room.price}
                      </a>
                    </Card.Content>
                  </Card>

                )
              })



            }

          </Card.Group>


          <Pagination
            style={{ marginTop: "2em", marginBottom:"2em" , marginLeft: "43em"}}
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={5}
          />
        
        </div>
      </div>//--------
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, null)(pubMainPage)
