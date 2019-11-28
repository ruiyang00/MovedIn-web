import React, { Component } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
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
} from 'semantic-ui-react'

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
      age:'',
      allUsers:[],

    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.doPrimaryFilter=this.doPrimaryFilter.bind(this);
    this.printstuff=this.printstuff.bind(this);
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

  doPrimaryFilter=()=>{
    this.forceUpdate();
     this.setState({
       target:document.getElementById('target').innerText,
       city:document.getElementById('city').innerText,
       budgetRange:document.getElementById('budgetRange').innerText,
       movedInMonth:document.getElementById('movedInMonth').innerText,

     });

     //axios post
  }

  doSecondaryFilter=()=>{
    this.setState({
      gender:document.getElementById('gender').innerText,
      parking: document.getElementById('parking').innerText,
      sharedBath:document.getElementById('sharedBath').innerText,
      pet:document.getElementById('pet').innerText,
      smoking:document.getElementById('smoking').innerText,
      party:document.getElementById('party').innerText,

    });
    this.printstuff();

    //axios post
  }

  printstuff(){
    console.log(this.state.target);
    console.log(this.state.city);
    console.log(this.state.budgetRange);
    console.log(this.state.movedInMonth);
    console.log(this.state.gender);
    console.log(this.state.parking);
    console.log(this.state.sharedBath);
    console.log(this.state.pet);
    console.log(this.state.smoking);
    console.log(this.state.party);

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
  //-------------------------------------------------------------------------------------
  render() {
    const {date, dimmer} = this.state;
    const {allUsers}=this.state;
    console.log(allUsers);
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

    const booleanOptions=[
      {key:'Yes',text:'Yes',value:'Yes'},
      {key:'No',text:'No',value:'No'},

    ]



    return (
      <div>
        <Segment secondary style={{ marginTop: "4em", marginBottom:"0em"}}>
          <Form style={{marginLeft:"11.5em", marginRight:"0em"}}>
           <Form.Group widths='equal'>
            <Form.Select
                selection
                id="target"
                defaultValue="new people"
                label='MovedIn with ...'
                options={searchOptions}
                required
                />

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


              <Form.Button primary size='medium' style={{marginTop:"1.6em"}} onClick={this.doPrimaryFilter}>
                Search
                <Icon name='right arrow' />
              </Form.Button>
          </Form.Group>
          </Form>
        </Segment>

        <Menu size='small' borderless style={{ marginTop: "0em", marginBottom:'0em' }}>
          <Menu.Item>
            <Segment style={{ marginLeft: "11.5em" }}>
              Filter by
            </Segment>
          </Menu.Item>
          <Menu.Item >
               <label>Gender Preferred</label>
              <Form.Select
                id="gender"
                clearable
                fluid selection
                options={genderOption}
                onChange={null} />
          </Menu.Item>
          <Menu.Item>
            <label>Parking Required</label>
            <Form.Select
              clearable
              id="parking"
              fluid selection
              options={booleanOptions} />
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
            <Button onClick ={this.doSecondaryFilter} fluid color='twitter'>Update Now</Button>
          </Menu.Item>
        </Menu>



        <Segment style={{marginTop:'0em'}}>
         <Card.Group itemsPerRow={4} style={{marginLeft:"6.5em"}}>
            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
              <Image
                src='https://image.flaticon.com/icons/svg/168/168724.svg' wrapped ui={false}
                as='a'
                onClick={this.showModal1('blurring')}
                />
              <Card.Content>
                <Card.Meta>
                  <span className='status'>Need a $940 room in San Jose</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  1 occupant
                  </a>
              </Card.Content>
            </Card>
            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
              <Image
                src='https://image.flaticon.com/icons/svg/168/168728.svg' wrapped ui={false}
                as='a'
                href='null'
                />
              <Card.Content>
                <Card.Header></Card.Header>
                <Card.Meta>
                  <span className='status'>Need a $1300 room in San Jose</span>
                </Card.Meta>

              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  2 occupants
                  </a>
              </Card.Content>
            </Card>
            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
              <Image
                src='https://image.flaticon.com/icons/svg/168/168730.svg' wrapped ui={false}
                as='a'
                href='null'
                />
              <Card.Content>
                <Card.Header></Card.Header>
                <Card.Meta>
                  <span className='status'>Need a $800 room in San Jose</span>
                </Card.Meta>

              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  1 occupant
                  </a>
              </Card.Content>
            </Card>
            <Card style={{ width: '15em' , marginTop:'2em' , marginLeft:'5em'}}>
              <Image
                src='https://image.flaticon.com/icons/svg/168/168729.svg' wrapped ui={false}
                as='a'
                href='null'
                />
              <Card.Content>
                <Card.Header></Card.Header>
                <Card.Meta>
                  <span className='status'>Need a $1000 room in San Jose</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  1 occupant
                  </a>
              </Card.Content>
            </Card>

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
