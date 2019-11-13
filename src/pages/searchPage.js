import React, { Component } from 'react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import HomeLogo from './../images/home #30C5FF.png';
// import profile1 from './../images/profile1.png';
// import profile2 from './../images/profile2.png';
// import profile3 from './../images/profile3.png';
// import profile4 from './../images/profile4.png';
// import profile5 from './../images/profile5.png';
// import profile6 from './../images/profile6.png';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import { Link,withRouter } from 'react-router-dom';
import * as ROUTES from "./../logistics/routes";
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
  Image,
  Menu,
  Message,
  Modal,
  Pagination,
  Select,
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

const stateOptions = [
  { key:'AL', value:'AL', text: 'Alabama' },
	{ key:'AK' , value:'AK', text: 'Alaska' },
	{ key:'AZ' , value:'AZ', text: 'Arizona' },
	{ key:'AR' , value:'AR', text: 'Arkansas' },
	{ key:'CA' , value:'CA', text: 'California' },
	{ key:'CO' , value:'CO', text: 'Colorado' },
	{ key:'CT' , value:'CT', text: 'Connecticut' },
	{ key:'DE' , value:'DE', text: 'Delaware' },
	{ key:'DC' , value:'DC', text: 'D.C.' },
	{ key:'FL' , value:'FL', text: 'Florida' },
	{ key:'GA' , value:'GA', text: 'Georgia' },
	{ key:'HI' , value:'HI', text: 'Hawaii' },
	{ key:'ID' , value:'ID', text: 'Idaho' },
	{ key:'IL' , value:'IL', text: 'Illinois' },
	{ key:'IN' , value:'IN', text: 'Indiana' },
	{ key:'IA' , value:'IA', text: 'Iowa' },
	{ key:'KS' , value:'KS', text: 'Kansas' },
	{ key:'KY' , value:'KY', text: 'Kentucky' },
	{ key:'LA' , value:'LA', text: 'Louisiana' },
	{ key:'ME' , value:'ME', text: 'Maine' },
	{ key:'MD' , value:'MD', text: 'Maryland' },
	{ key:'MA' , value:'MA', text: 'Massachusetts' },
	{ key:'MI' , value:'MI', text: 'Michigan' },
	{ key:'MN' , value:'MN', text: 'Minnesota' },
	{ key:'MS' , value:'MS', text: 'Mississippi' },
	{ key:'MO' , value:'MO', text: 'Missouri' },
	{ key:'MT' , value:'MT', text: 'Montana' },
	{ key:'NE' , value:'NE', text: 'Nebraska' },
	{ key:'NV' , value:'NV', text: 'Nevada' },
	{ key:'NH' , value:'NH', text: 'New Hampshire' },
	{ key:'NJ' , value:'NJ', text: 'New Jersey' },
	{ key:'NM' , value:'NM', text: 'New Mexico' },
	{ key:'NY' , value:'NY', text: 'New York' },
	{ key:'NC' , value:'NC', text: 'North Carolina' },
	{ key:'ND' , value:'ND', text: 'North Dakota' },
	{ key:'OH' , value:'OH', text: 'Ohio' },
	{ key:'OK' , value:'OK', text: 'Oklahoma' },
	{ key:'OR' , value:'OR', text: 'Oregon' },
	{ key:'PA', value:'PA', text: 'Pennsylvania' },
	{ key:'RI' , value:'RI', text: 'Rhode Island' },
	{ key:'SC' , value:'SC', text: 'South Carolina' },
	{ key:'SD' , value:'SD', text: 'South Dakota' },
	{ key:'TN' , value:'TN', text: 'Tennessee' },
	{ key:'TX' , value:'TX', text: 'Texas' },
	{ key:'UT', value:'UT', text: 'Utah' },
	{ key:'VT' , value:'VT', text: 'Vermont' },
	{ key:'VA' , value:'VA', text: 'Virginia' },
	{ key:'WA' , value:'WA', text: 'Washington' },
	{ key:'WV' , value:'WV', text: 'West Virginia' },
	{ key:'WI' , value:'WI', text: 'Wisconsin' },
	{ key:'WY', value:'WY', text: 'Wyoming' }
]

const roomOptions =[
  {key: 'have', value: 'have', text:'Have a room'},
  {key: 'need', value: 'need', text:'Need a room'},
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
    city: this.state.city
  }).
  then(function(response){
    window.alert(response.data);
  });


     console.log('submitted');

  }

 //Modal windows------------------------------------------------------------------------
  state = {
    loginModalisOpen: false,
    signupModalisOpen: false
  }
  showLogin = (dimmer) => () => this.setState({ dimmer, loginModalisOpen: true })
  closeLogin = () => this.setState({ loginModalisOpen: false })
  showSignup = (dimmer) => () => this.setState({dimmer, signupModalisOpen: true})
  closeSignup = () => this.setState({signupModalisOpen: false})

  //-------------------------------------------------------------------------------------
  render() {
    const {date, dimmer} = this.state;
    const {allUsers}=this.state;
    console.log(allUsers);
  
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src={HomeLogo} style={{ marginRight: '1.5em' }} />
              MovedIn
            </Menu.Item>

            <Menu.Item position='right'>
              <Button onClick={null}>Sign Up</Button>
              <Button onClick={null} style={{ marginLeft: '0.5em' }}>Log In</Button>
            </Menu.Item>
          </Container>
        </Menu>

        <Grid columns={5} stackable>
          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '13em' }}>
            Search location
            <Select placeholder='State' style={{minWidth:"10em"}} options={stateOptions}/>
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Members who
            <Select placeholder='Have a room' style={{minWidth:"10em"}} options={roomOptions} />
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Max rent
            <Select placeholder='$2000+' style={{minWidth:"10em"}} options={rentOptions} />
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Moved-in Date
            <SemanticDatepicker onDateChange={this.handleDateChange} />
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '3.5em', marginLeft: '3.0em' }}>
            <Button primary size='small'>
              Search
            <Icon name='right arrow' />
            </Button>
          </Grid.Column>
        </Grid>

        <Header as='h2' content='Search Result' style={style.h2, { marginLeft: '7.5em', marginBottom: '0em' }} textAlign='Left' />
        <Header as='h4' content='Only take one minute to Sign Up, become a memeber today and see more!'
          style={style.h4, { marginLeft: '12em', marginTop: '0.2em' }} textAlign='Left' />
        <Header as='h4' content='Found 208 matches!'
          style={style.h4, { marginLeft: '12em', marginTop: '0.2em' }} textAlign='Left' />


       <Grid columns={4} doubling style={{ marginLeft: '12em', marginRight: '12em' }}>
          <Grid.Row>
          {
            allUsers.map((user)=>{
              return(
            <Card style={{ width: '15em' }}>
              <Image  wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user.nameToDisplay}</Card.Header>
                <Card.Meta>
                  <span className='status'>Have a $3100 Apartment in California</span>
                </Card.Meta>
                <Card.Description>
                  Male, 32 years old
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
         })


          }
          </Grid.Row>

        </Grid>


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

        <div>
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
            <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' as='form' onSubmit={null}>

                    <Field
                      component={InputField}
                      type='text'
                      name='email'
                      fluid icon='mail'
                      iconPosition='right'
                      placeholder='E-mail address'
                      value={null}
                      onChange={null}
                      required
                    />
                    <Field
                      component={InputField}
                      type='password'
                      name='password'
                      fluid icon='lock'
                      iconPosition='right'
                      placeholder='Password'
                      value={null}
                      onChange={null}
                      required
                    />
                    <Button color='blue' fluid size='large'>
                      Log In
                    </Button>

                </Form>
                <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Modal>
        </div>

        <div>
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.signupModalisOpen} onClose={this.closeSignup}>
            <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form as='form' onSubmit={null}>

                  <Field
                    component={InputField}
                    type='text'
                    name='email2'
                    fluid icon='mail'
                    iconPosition='right'
                    placeholder='E-mail Address'
                    value={null}
                    onChange={null}
                    required
                  />
                  <Field
                      component={InputField}
                      name='password2'
                      fluid
                      icon='lock'
                      iconPosition='right'
                      placeholder='Password'
                      type='password'
                      value={null}
                      onChange={null}
                      required
                  />
                  <Button color='blue' fluid size='large'>
                      Sign Up
                  </Button>
                </Form>

                <Message>
                  Already have an account? <a href="" onClick={(this.closeSignup)}>Log In</a>
                </Message>

              </Grid.Column>
            </Grid>
          </Modal>
        </div>


      </div>//--------
    );
  }
}
export default App;
