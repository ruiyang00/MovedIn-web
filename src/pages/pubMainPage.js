import React, { Component } from 'react'

import HomeLogo from './../images/home #30C5FF.png';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import { Link,withRouter } from 'react-router-dom';
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
  {key: 'new people', value: 'new people', text:'new people'},
  {key: 'new room', value: 'new room', text:'new room'},
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
  {key: false, value: false, text:'Parking Needed'},
  {key: true, value: true, text:'No Parking okay'},
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

const lease_durationOptions=[
  {key:'>=12 months', text:'>=12 months', value: '>=12 months'},
  {key:'<12months', text:'<12months', value: '<12months'},
  {key:'< OR >= 12 months', text:'< OR >= 12 months', value: '< OR >= 12 months'}
]



class pubMainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      date: null,
      nameToDisplay:'',
      city:'',
      budget:'',
      age:'',
      allUsers:[],
      modal1isOpon:false,
      modal2isOpon:false,
      modal3isOpon:false,
      modal4isOpon:false,

      target:'',
      city:'',
      budgetRange:'',
      movedInMonth:'',
      lease_duration:'',
      gender:'',
      parking:'',
      sharedBath:'',
      pet:'',
      smoking:'',
      party:'',
      room_type_required:'',
      utility_include:'',

      roommatestoDisplay:[],
      filteredRoommates:[],
      copyOfRoommates:[],
      roomstoDisplay:[],
      filteredRooms:[],
      copyOfRooms:[],

      showRooms:false,
      showRoommates:true,

    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleBasicFilterChange=this.handleBasicFilterChange.bind(this);
  }

componentDidMount(){
  if(this.props.location.state){
     if(this.props.location.state.targetGroup==="new place to MovedIn")
    this.setState({
       showRoommates:false,

    });
    axios.post('http://localhost:5000/roommates/getroommates',{city:this.props.location.state.targetCity})
      .then(function(response){
           console.log(response);
           this.setState({
           filteredRoommates:response.data.allRoommatesWithinLocation,
         })

    }.bind(this));
    axios.post('http://localhost:5000/roommates/getroommates',{city:''})
      .then(function(response){
           console.log(response);
           this.setState({
             roommatestoDisplay:response.data.allRoommatesWithinLocation,
           copyOfRoommates:response.data.allRoommatesWithinLocation,
         })

    }.bind(this));


    axios.post('http://localhost:5000/rooms/getrooms',{city:this.props.location.state.targetCity})
    .then(function(response){
         console.log(response);
         this.setState({
                        filteredRooms:response.data.allRoomsWithinLocation,
                       })

  }.bind(this));
  axios.post('http://localhost:5000/rooms/getrooms',{city:''})
  .then(function(response){
       console.log(response);
       this.setState({roomstoDisplay:response.data.allRoomsWithinLocation,
                      copyOfRooms:response.data.allRoomsWithinLocation
                     })

}.bind(this));

  this.props.history.push({
    pathname:'./mainPage',
    state:undefined
  });
  }

  else{
  axios.post('http://localhost:5000/roommates/getroommates',{city:""})
    .then(function(response){
         console.log(response);
         this.setState({roommatestoDisplay:response.data.allRoommatesWithinLocation,
           filteredRoommates:response.data.allRoommatesWithinLocation,
           copyOfRoommates:response.data.allRoommatesWithinLocation,
         })

  }.bind(this));

  axios.post('http://localhost:5000/rooms/getrooms',{city:''})
  .then(function(response){
       console.log(response);
       this.setState({roomstoDisplay:response.data.allRoomsWithinLocation,
          filteredRooms:response.data.allRoomsWithinLocation,
          copyOfRooms:response.data.allRoomsWithinLocation
       })

}.bind(this));
}

  }


  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  handleDateChange = date => {
    this.setState({ date });

  };

  handleBasicFilterChange=()=>{
    this.forceUpdate();
    this.setState({
      city:document.getElementById('city').innerText,
      budgetRange:document.getElementById('budgetRange').innerText,
      movedInMonth:document.getElementById('movedInMonth').innerText,
      lease_duration:document.getElementById('lease_duration').innerText,


    });
  }

  handleSecFilterChange(){
    if(!this.state.showRoommates){
    this.setState({
    gender:document.getElementById('gender').innerText,
    parking:document.getElementById('parking').innerText,
    room_type_required:document.getElementById('room_type_required').innerText,
    pet:document.getElementById('pet').innerText,
    sharedBath:document.getElementById('sharedBath').innerText,
    smoking:document.getElementById('smoking').innerText,
    party:document.getElementById('party').innerText,
  });}

    else{this.setState({
    gender:document.getElementById('gender').innerText,
    age:document.getElementById('age').innerText,
    room_type_required:document.getElementById('room_type_required').innerText,
    pet:document.getElementById('pet').innerText,
    sharedBath:document.getElementById('sharedBath').innerText,
    smoking:document.getElementById('smoking').innerText,
    party:document.getElementById('party').innerText,
  });

    }

  }

doPrimaryFilter=async()=>{
    await this.handleBasicFilterChange();
       this.setState({
         filteredRooms:[],
         filteredRoommates:[]
       });
       var i;
       for(i=0;i<this.state.roommatestoDisplay.length;i++){
           //console.log('hello');
           var roommate=this.state.roommatestoDisplay[i];
           // console.log(roommate.lease_duration === this.state.lease_duration);
       if(roommate.city === this.state.city && roommate.budget===this.state.budgetRange
            && roommate.moved_in_date=== this.state.movedInMonth && roommate.lease_duration===this.state.lease_duration){
               this.state.filteredRoommates.push(roommate);
            }
       }

       for(i=0;i<this.state.roomstoDisplay.length;i++){
           var room=this.state.roomstoDisplay[i];
           console.log(room.move_in_date === this.state.movedInMonth);
       if(room.city === this.state.city && room.price_range===this.state.budgetRange
            && room.move_in_date=== this.state.movedInMonth && room.min_lease_duration===this.state.lease_duration){
               this.state.filteredRooms.push(room);
            }
       }
       this.setState({
         copyOfRooms:this.state.filteredRooms,
         copyOfRoommates:this.state.filteredRoommates
       })






  }

doSecondaryFilter=async()=>{

    await this.handleSecFilterChange();
    this.setState({
      filteredRooms:this.state.copyOfRooms,
      filteredRoommates:this.state.copyOfRoommates
    })
    var i;
    for(i=0;i<this.state.filteredRoommates.length;i++){
        var roommate=this.state.filteredRoommates[i];
    if(roommate.gender !== this.state.gender || roommate.age!==this.state.age
         || roommate.room_type_required!== this.state.room_type_required || roommate.pet_friendly!==this.state.pet
         || roommate.ok_with_shaing_bathroom !== this.state.sharedBath || roommate.smoking_friendly !== this.state.smoking
         || roommate.party_friendly !== this.state.party
       ){
            this.state.filteredRoommates.splice(i,1);
         }
    }

    for(i=0;i<this.state.filteredRooms.length;i++){
        var room=this.state.filteredRooms[i];
        if(room.gender_prefered !== this.state.gender || room.parking!==this.state.parking
             || room.room_type!== this.state.room_type_required || room.pet!==this.state.pet
             || room.bathroom !== this.state.sharedBath || room.smoking!== this.state.smoking
             || room.party !== this.state.party
           ) {
            this.state.filteredRooms.splice(i,1);
         }
    }

  }



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
    var moment= require('moment');
    var currentMonthYear=moment().format("MMMM-YYYY");
    var oneMonthFromNow=moment().add(1, 'months').format('MMMM-YYYY');
    var twoMonthFromNow=moment().add(2, 'months').format('MMMM-YYYY');
    var threeMonthFromNow=moment().add(3, 'months').format('MMMM-YYYY');
    var fourMonthFromNow=moment().add(4, 'months').format('MMMM-YYYY');
    var fiveMonthFromNow=moment().add(5, 'months').format('MMMM-YYYY');
    var sixMonthFromNow=moment().add(6, 'months').format('MMMM-YYYY');
    console.log(sixMonthFromNow);
    const whenToMovedInOptions=[
      {key:currentMonthYear, text:currentMonthYear, value: currentMonthYear},
      {key:oneMonthFromNow, text:oneMonthFromNow, value: oneMonthFromNow},
      {key:twoMonthFromNow, text:twoMonthFromNow, value: twoMonthFromNow},
      {key:threeMonthFromNow, text:threeMonthFromNow, value: threeMonthFromNow},
      {key:fourMonthFromNow, text:fourMonthFromNow, value: fourMonthFromNow},
      {key:fiveMonthFromNow, text:fiveMonthFromNow, value: fiveMonthFromNow},
      {key:sixMonthFromNow, text:sixMonthFromNow, value: sixMonthFromNow},

    ]

    const budgetOptions=[
      {key:'$0-100',text:'$0-100',value:'$0-100'},
      {key:'$100-300',text:'$100-300',value:'$100-300'},
      {key:'$300-500',text:'$300-500',value:'$300-500'},
      {key:'$500-700',text:'$500-700',value:'$500-700'},
      {key:'$700-900',text:'$700-900',value:'$700-900'},
      {key:'$900-1100',text:'$900-1100',value:'$900-1100'},
      {key:'$1100-1300',text:'$1100-1300',value:'$1100-1300'},
      {key:'$1300-1500',text:'$1300-1500',value:'$1300-1500'},
      {key:'$1500-1700',text:'$1500-1700',value:'$1500-1700'},
      {key:'$1700-1900',text:'$1700-1900',value:'$1700-1900'},
      {key:'$1900-2100',text:'$1900-2100',value:'$1900-2100'},
      {key:'$2100-2300',text:'$2100-2300',value:'$2100-2300'},
      {key:'$2300-2500',text:'$2300-2500',value:'$2300-2500'},




    ]

    const ageOptions=[
       {key:'0-18 years old',text:'0-18 years old',value:'0-18 years old'},
       {key:'18-30 years old',text:'18-30 years old',value:'18-30 years old'},
       {key:'30-40 years old',text:'30-40 years old',value:'30-40 years old'},
       {key:'40-50 years old',text:'40-50 years old',value:'40-50 years old'},
       {key:'50-60 years old',text:'50-60 years old',value:'50-60 years old'},




    ]

    const booleanOptions=[
      {key:'Yes',text:'Yes',value:'Yes'},
      {key:'No',text:'No',value:'No'},

    ]

    const roomTypeOptions=[
      {key:'Single Room',text:'Single Room',value:'Single Room'},
      {key:'Double Room',text:'Double Room',value:'Double Room'},
      {key:'Multiperson Room',text:'Multiperson Room',value:'Multiperson Room'}
    ]



    return (
      <div>
        <Segment secondary style={{ marginTop: "4em", marginBottom:"0em"}}>
          <Form style={{marginLeft:"11.5em", marginRight:"0em"}}>
          <h3>Looking for...</h3>
          <Button.Group>
          <Button onClick={()=>{this.state.showRoommates=true;this.forceUpdate()}} color="olive" size="small">Roommates</Button>
          <Button.Or />
          <Button onClick={()=>{this.state.showRoommates=false;this.forceUpdate()}} color="twitter"size="small">Rooms</Button>
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

                <Form.Select
                    selection
                    defaultValue="<12months"
                    id="lease_duration"
                    label='Lease Term'
                    options={lease_durationOptions}
                    required
                    />


              <Form.Button primary disabled={!this.props.isAuth} size='medium' style={{marginTop:"1.6em"}} onClick={this.doPrimaryFilter}>
                Search
                <Icon name='right arrow' />
              </Form.Button>
          </Form.Group>
          </Form>
        </Segment>


        <Menu size='small' borderless style={{ marginTop: "0em", marginBottom:'0em' }}>
          <Menu.Item>
            <Segment style={{ marginLeft: "3em" }}>
              Filter by
            </Segment>
          </Menu.Item>
          <Menu.Item >
               <label>Gender Pre</label>
              <Form.Select
                id="gender"
                clearable
                fluid
                options={genderOption}
                onChange={null} />
          </Menu.Item>

     { !this.state.showRoommates ?



          <Menu.Item>
            <label>Parking Required</label>
            <Form.Select
              clearable
              id="parking"
              fluid selection
              options={booleanOptions} />
             </Menu.Item>



        :

        <Menu.Item>
          <label>Age Range</label>
          <Form.Select
            selection
            width={20}
            clearable
            id="age"
            fluid
            options={ageOptions} />
           </Menu.Item>


      }
          <Menu.Item>
          <label>Room Type</label>
          <Form.Select
           clearable
           id="room_type_required"
           fluid selection
           options={roomTypeOptions} />
          </Menu.Item>


          <Menu.Item>
          <label>Shared Bath</label>
              <Form.Select
                clearable
                id="sharedBath"
                fluid selection
                options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>

              <label>Pets</label>
              <Form.Select
                clearable
                id="pet"
                fluid selection
                options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>

              <label>Smoking</label>
              <Form.Select
                clearable
                id="smoking"
                fluid selection
                options={booleanOptions} />
          </Menu.Item>
          <Menu.Item>

              <label>Party</label>
              <Form.Select
                clearable
                id="party"
                fluid selection
                options={booleanOptions} />
          </Menu.Item>
          <Menu.Item position='right' style={{marginRight:"10em"}}>
            <Button disabled={!this.props.isAuth} onClick={this.doSecondaryFilter} fluid color='twitter'>Go</Button>
          </Menu.Item>
        </Menu>





        <Segment style={{marginTop:'0em'}}>
           <Card.Group itemsPerRow={4} style={{marginLeft:"6.5em"}}>
             { this.state.showRoommates ?

          this.state.filteredRoommates.map((roommate)=>{
            return(

            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
            <Image
              src='https://image.flaticon.com/icons/svg/168/168724.svg' wrapped ui={false}
              as='a'
              onClick={this.showModal1('blurring')}
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

        this.state.filteredRooms.map((room)=>{
          return(

          <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
          <Image
            src={HomeLogo} wrapped ui={false}
            as='a'
            onClick={this.showModal1('blurring')}
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



      <Modal dimmer={dimmer} open={this.state.modal1isOpon} onClose={this.closeModal1}>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://image.flaticon.com/icons/svg/168/168724.svg' />
          <Modal.Description>
            <Header>Brain</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>

      </div>//--------
    );
  }
}
function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, null)(pubMainPage)
