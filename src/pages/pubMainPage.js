import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Form,
  Header,
  Icon,
  Image,
  Menu,
  Message,
  Modal,
  Segment,
  Pagination,
  Popup,
  Divider,
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
  { key: 'San Francisco', text: 'San Francisco', value: 'San Francisco' },
  { key: 'San Jose', text: 'San Jose', value: 'San Jose' },
]


const genderOption = [
  { key: 'Male', value: 'Male', text: 'Male' },
  { key: 'Female', value: 'Female', text: 'Female' },
  { key: 'Other', value: 'Other', text: 'Others' },
]

const lease_durationOptions = [
  { key: '>=12 months', text: '>=12 months', value: '>=12 months' },
  { key: '<12months', text: '<12months', value: '<12months' },
  { key: '< OR >= 12 months', text: '< OR >= 12 months', value: '< OR >= 12 months' }
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
      modalisOpon: false,

      target: '',
      city: '',
      budgetRange: '',
      movedInMonth: '',
      lease_duration: '',
      gender: '',
      parking: '',
      sharedBath: '',
      pet: '',
      smoking: '',
      party: '',
      room_type_required: '',
      utility_include: '',

      targetUserId: '', //store target user id to see detail user page
      targetRoomId: '',
      myToken: '',      //store my token to pass into detail user page

      roommatestoDisplay: [],
      filteredRoommates: [],
      copyOfRoommates: [],
      roomstoDisplay: [],
      filteredRooms: [],
      copyOfRooms: [],

      showRooms: false,
      showRoommates: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBasicFilterChange = this.handleBasicFilterChange.bind(this);
  }

  //modal
  showModal = (dimmer) => () => this.setState({ dimmer, modalisOpon: true })
  closeModal = () => this.setState({ modalisOpon: false })

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.targetGroup === "new place to MovedIn")
        this.setState({
          showRoommates: false,

        });
      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/roommates/getroommates',
        {
          withCredentials: true,
          headers: {
            'Authorization': this.props.location.state.targetCity
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            filteredRoommates: response.data.allRoommatesWithinLocation,
          })

        }.bind(this));
      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/roommates/getroommates',
        {
          withCredentials: true,
          headers: {
            'Authorization': ""
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            roommatestoDisplay: response.data.allRoommatesWithinLocation,
            copyOfRoommates: response.data.allRoommatesWithinLocation,
          })

        }.bind(this));


      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/rooms/getrooms',

        {
          withCredentials: true,
          headers: {
            'Authorization': this.props.location.state.targetCity
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            filteredRooms: response.data.allRoomsWithinLocation,
          })

        }.bind(this));
      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/rooms/getrooms',
        {
          withCredentials: true,
          headers: {
            'Authorization': ""
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            roomstoDisplay: response.data.allRoomsWithinLocation,
            copyOfRooms: response.data.allRoomsWithinLocation
          })

        }.bind(this));

      this.props.history.push({
        pathname: './mainPage',
        state: undefined
      });
    }

    else {
      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/roommates/getroommates',
        {
          withCredentials: true,
          headers: {
            "Authorization": ""
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            roommatestoDisplay: response.data.allRoommatesWithinLocation,
            filteredRoommates: response.data.allRoommatesWithinLocation,
            copyOfRoommates: response.data.allRoommatesWithinLocation,
          })

        }.bind(this));


      axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/rooms/getrooms',
        {
          withCredentials: true,
          headers: {
            "Authorization": ""
          }
        })
        .then(function (response) {
          console.log(response);
          this.setState({
            roomstoDisplay: response.data.allRoomsWithinLocation,
            filteredRooms: response.data.allRoomsWithinLocation,
            copyOfRooms: response.data.allRoomsWithinLocation
          })
        }.bind(this));
    }

  }//end of componentDidMount

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleDateChange = date => {
    this.setState({ date });
  };

  handleBasicFilterChange = () => {
    this.forceUpdate();
    this.setState({
      city: document.getElementById('city').innerText,
      budgetRange: document.getElementById('budgetRange').innerText,
      movedInMonth: document.getElementById('movedInMonth').innerText,
      lease_duration: document.getElementById('lease_duration').innerText,


    });
  }

  handleSecFilterChange() {
    if (!this.state.showRoommates) {
      this.setState({
        gender: document.getElementById('gender').innerText,
        parking: document.getElementById('parking').innerText,
        room_type_required: document.getElementById('room_type_required').innerText,
        pet: document.getElementById('pet').innerText,
        sharedBath: document.getElementById('sharedBath').innerText,
        smoking: document.getElementById('smoking').innerText,
        party: document.getElementById('party').innerText,
      });
    }

    else {
      this.setState({
        gender: document.getElementById('gender').innerText,
        age: document.getElementById('age').innerText,
        room_type_required: document.getElementById('room_type_required').innerText,
        pet: document.getElementById('pet').innerText,
        sharedBath: document.getElementById('sharedBath').innerText,
        smoking: document.getElementById('smoking').innerText,
        party: document.getElementById('party').innerText,
      });

    }

  }

  handleUserDetail() {
    const { targetUserId, myToken } = this.state;

    console.log(targetUserId);
    console.log(myToken);

    this.props.history.push({
      pathname: './userDetail',
      state: {
        targetUserId,
        myToken,
      }
    });
    this.setState({
      redirectToUserDetail: true
    });
  }

  handleRoomDetail() {
    const { targetRoomId, myToken } = this.state;

    console.log(targetRoomId);
    console.log(myToken);

    this.props.history.push({
      pathname: './roomDetail',
      state: {
        targetRoomId,
        myToken,
      }
    });
    this.setState({
      redirectToRoomDetail: true
    });
  }



  //Redirect-------------------------------------------------------------------
  setRedirectToUserDetail = () => {
    this.setState({
      redirectToUserDetail: true
    })
  }

  renderRedirectToUserDetail = () => {
    if (this.props.isAuth && this.state.redirectToUserDetail)
      return <Redirect to='/userDetail' />

  }

  setRedirectToRoomDetail = () => {
    this.setState({
      redirectToRoomDetail: true
    })
  }

  renderRedirectToRoomDetail = () => {
    if (this.props.isAuth && this.state.redirectToRoomDetail)
      return <Redirect to='/roomDetail' />
  }

  doPrimaryFilter = async () => {
    await this.handleBasicFilterChange();
    await this.setState({
      filteredRooms: [],
      filteredRoommates: []
    });
    var i;
    for (i = 0; i < this.state.roommatestoDisplay.length; i++) {
      //console.log('hello');
      var roommate = this.state.roommatestoDisplay[i];
      //console.log(roommate._id);
      if (roommate.city === this.state.city && roommate.budget === this.state.budgetRange
        && roommate.moved_in_date === this.state.movedInMonth && roommate.lease_duration === this.state.lease_duration) {
        this.state.filteredRoommates.push(roommate);
      }
    }

    for (i = 0; i < this.state.roomstoDisplay.length; i++) {
      var room = this.state.roomstoDisplay[i];
      console.log(room.move_in_date === this.state.movedInMonth);
      if (room.city === this.state.city && room.price_range === this.state.budgetRange
        && room.move_in_date === this.state.movedInMonth && room.min_lease_duration === this.state.lease_duration) {
        this.state.filteredRooms.push(room);
      }
    }
    this.setState({
      copyOfRooms: this.state.filteredRooms,
      copyOfRoommates: this.state.filteredRoommates
    })
  }

  doSecondaryFilter = async () => {

    await this.handleSecFilterChange();
    await this.setState({
      filteredRooms: [],
      filteredRoommates: []
    })
    var i;
    for (i = 0; i < this.state.copyOfRoommates.length; i++) {
      var roommate = this.state.copyOfRoommates[i];
      if (roommate.gender === this.state.gender && roommate.age === this.state.age
        && roommate.room_type_required === this.state.room_type_required && roommate.pet_friendly === this.state.pet
        && roommate.ok_with_shaing_bathroom === this.state.sharedBath && roommate.smoking_friendly === this.state.smoking
        && roommate.party_friendly === this.state.party
      ) {
        this.state.filteredRoommates.push(roommate);
      }
    }

    for (i = 0; i < this.state.copyOfRooms.length; i++) {
      var room = this.state.copyOfRooms[i];
      if (room.gender_prefered === this.state.gender && room.parking === this.state.parking
        && room.room_type === this.state.room_type_required && room.pet === this.state.pet
        && room.bathroom === this.state.sharedBath && room.smoking === this.state.smoking
        && room.party === this.state.party
      ) {
        this.state.filteredRooms.push(room);
      }
    }
    this.forceUpdate();
  }

  onSubmit = () => {
    // event.preventDefault();

    console.log(this.state.city);
    //this.props.signIn(formData);
    axios.get('http://ec2-18-217-162-8.us-east-2.compute.amazonaws.com/roommates/getroommates',
      {

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


    const ageOptions = [
      { key: '0-18 years old', text: '0-18 years old', value: '0-18 years old' },
      { key: '18-30 years old', text: '18-30 years old', value: '18-30 years old' },
      { key: '30-40 years old', text: '30-40 years old', value: '30-40 years old' },
      { key: '40-50 years old', text: '40-50 years old', value: '40-50 years old' },
      { key: '50-60 years old', text: '50-60 years old', value: '50-60 years old' },
    ]

    const booleanOptions = [
      { key: 'Yes', text: 'Yes', value: 'Yes' },
      { key: 'No', text: 'No', value: 'No' },
    ]

    const roomTypeOptions = [
      { key: 'Single Room', text: 'Single Room', value: 'Single Room' },
      { key: 'Double Room', text: 'Double Room', value: 'Double Room' },
      { key: 'Multiperson Room', text: 'Multiperson Room', value: 'Multiperson Room' }
    ]

    const { dimmer } = this.state;

    return (
      <div><div style={backgroundStyle}>
        <Menu stackable style={{ marginTop: "3em", marginBottom: "0em" }}>
          <Form style={{ marginTop: '1em', marginLeft: "12em", marginRight: "12em" }}>
            <Button.Group>
              <Button onClick={() => { this.state.showRoommates = true; this.forceUpdate() }} color="olive" size="small">Search Roommates</Button>
              <Button.Or />
              <Button onClick={() => { this.state.showRoommates = false; this.forceUpdate() }} color="twitter" size="small">Search Rooms</Button>
            </Button.Group>

            <Form.Group widths='equal' style={{ marginTop: '1em' }}>
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
                defaultValue="<12months"
                id="lease_duration"
                label='Lease Term'
                options={lease_durationOptions}
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
              </Form.Button>
            </Form.Group>
          </Form>
        </Menu>

        <Menu stackable secondary style={{ marginLeft: '0em' }}>
          <Form style={{ marginTop: '1em', marginLeft: '12.5em' }}>
            <Header as='h2'>
              Are you looking for people who is ...
              </Header>
            <Form.Group>
              <Form.Select
                clearable
                label='Gender'
                id="gender"
                fluid selection
                options={genderOption}
                onChange={null} />

              {!this.state.showRoommates ?
                <Form.Select
                  clearable
                  label='Parking Option'
                  id="parking"
                  fluid
                  selection
                  options={booleanOptions} />
                :
                <Form.Select
                  clearable
                  label='Age Range'
                  id="age"
                  fluid
                  selection
                  options={ageOptions} />
              }

              <Form.Select
                clearable
                label='Room Type'
                id="room_type_required"
                fluid
                selection
                options={roomTypeOptions} />

              <Form.Select
                clearable
                label='Shared Bathroom'
                id="sharedBath"
                fluid
                selection
                options={booleanOptions} />

              <Form.Select
                clearable
                label='Pets Friendly'
                id="pet"
                fluid selection
                options={booleanOptions} />

              <Form.Select
                clearable
                label='Smoking Friendly'
                id="smoking"
                fluid selection
                options={booleanOptions} />

              <Form.Select
                clearable
                label='Party Friendly'
                id="party"
                fluid
                selection
                options={booleanOptions} />

            </Form.Group>
            <Button disabled={!this.props.isAuth}
              onClick={this.doSecondaryFilter}
              color='twitter'
              content='Go' />
          </Form>
        </Menu>

        <Divider />

        <Modal dimmer={dimmer} size={"tiny"} open={this.state.modalisOpon} onClose={this.closeModal}>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://image.flaticon.com/icons/svg/145/145664.svg' />
            <Modal.Description>
              <Header style={{ marginTop: '2em' }}>Join us today for free!</Header>
              <p>It only takes a few minutes to sign up, then you can discover more matches!</p>
              <p>Already have an account? Please sign in to view more information.</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        {!this.props.isAuth ?
          <div>
            <Card.Group onClick={this.showModal()}
              itemsPerRow={4} style={{ marginLeft: "7.25em" }}>
              {this.renderRedirectToUserDetail()}
              {this.state.showRoommates ?
                this.state.filteredRoommates.map((roommate) => {
                  return (
                    <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                      <Image
                        src='https://image.flaticon.com/icons/svg/172/172163.svg' wrapped ui={false}
                        as='a'
                        onClick={
                          () => {
                            if (this.props.isAuth) {
                              this.state.targetUserId = roommate._id;
                              this.state.myToken = localStorage.getItem('token');
                              this.handleUserDetail();
                            }
                          }

                          //localStorage.getItem('token'), roommate._id
                        } //should get user id, token. redirect to userDetail page
                      />
                      <Card.Content>
                        <Card.Header>
                          {roommate.first_name}
                        </Card.Header>
                        <Card.Meta> Needs a {roommate.budget || 'N/A'}  </Card.Meta>
                        <Card.Meta> {roommate.room_type_required} </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                        <Icon name='point' />
                        {roommate.city}
                      </Card.Content>
                    </Card>

                  )
                })


                :

                this.state.filteredRooms.map((room) => {
                  return (

                    <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                      <Image
                        src={'https://image.flaticon.com/icons/svg/609/609803.svg'} wrapped ui={false}
                        as='a'
                        onClick={
                          () => {
                            if (this.props.isAuth) {
                              this.state.targetRoomId = room._id;
                              this.state.myToken = localStorage.getItem('token');
                              this.handleRoomDetail();
                            }
                          }
                        }
                      />
                      <Card.Content>
                        <Card.Header>
                          {room.room_type}
                        </Card.Header>
                        <Card.Meta>Rent: <strong>${room.price}</strong>/mo </Card.Meta>
                        <Card.Meta>Available in: {room.move_in_date} </Card.Meta>

                      </Card.Content>
                      <Card.Content extra>
                        <Icon name='point' />
                        {room.city}
                      </Card.Content>
                    </Card>

                  )
                })
              }
            </Card.Group>
          </div>
          ://this is the middle of isAuth
          <Card.Group
            itemsPerRow={4} style={{ marginLeft: "7.25em" }}>
            {this.renderRedirectToUserDetail()}
            {this.state.showRoommates ?
              this.state.filteredRoommates.map((roommate) => {
                return (
                  <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                    <Image
                      src='https://image.flaticon.com/icons/svg/172/172163.svg' wrapped ui={false}
                      as='a'
                      onClick={
                        () => {
                          if (this.props.isAuth) {
                            this.state.targetUserId = roommate._id;
                            this.state.myToken = localStorage.getItem('token');
                            this.handleUserDetail();
                          }
                        }

                        //localStorage.getItem('token'), roommate._id
                      } //should get user id, token. redirect to userDetail page
                    />
                    <Card.Content>
                      <Card.Header>
                        {roommate.first_name} {roommate.last_name}
                      </Card.Header>
                      <Card.Meta> Needs a {roommate.budget || 'N/A'}  </Card.Meta>
                      <Card.Meta> {roommate.room_type_required} </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='point' />
                      {roommate.city}
                    </Card.Content>
                  </Card>

                )
              })


              :

              this.state.filteredRooms.map((room) => {
                return (

                  <Card style={{ width: '15em', marginTop: '2em', marginLeft: '5em' }}>
                    <Image
                      src={'https://image.flaticon.com/icons/svg/609/609803.svg'} wrapped ui={false}
                      as='a'
                      onClick={
                        () => {
                          if (this.props.isAuth) {
                            this.state.targetRoomId = room._id;
                            this.state.myToken = localStorage.getItem('token');
                            this.handleRoomDetail();
                          }
                        }
                      }
                    />
                    <Card.Content>
                      <Card.Header>
                        {room.room_type}
                      </Card.Header>
                      <Card.Meta>Rent: <strong>${room.price}</strong>/mo </Card.Meta>
                      <Card.Meta>Available in: {room.move_in_date} </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='point' />
                      {room.city}
                    </Card.Content>
                  </Card>

                )
              })
            }
          </Card.Group>

        }

        <Divider />

        <Pagination
          style={{ marginTop: "1em", marginBottom: "2em", marginLeft: "43em" }}
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={5}
        />
      </div></div>//--------
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
