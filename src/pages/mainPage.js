import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import * as ROUTES from "./../logistics/routes"
import BackGroundImage from './../images/home.png';
import HomeLogo from './../images/home #30C5FF.png';
import SignUpModule from './modules/SignUpModule';
import LogInModule from './modules/LogInModule';

import {
  Button,
  Container,
  Dropdown,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Message,
  Menu,
  Modal,
  Segment,
  Search
} from 'semantic-ui-react'

const backgroundStyle = {
  // width: "100%",
  height: "100vh",
  backgroundImage: `url(${BackGroundImage})`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};

const searchOptions=[
  {
    key: 'I need a room',
    text: 'I need a room',
    value: 'I need a room',
  },
  {
    key: 'I have a room',
    text: 'I have a room',
    value: 'I have a room',
  },
]

class App extends Component {
  //Authtication-------------------------------------------------------------------------
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      email2:'',
      password2:''
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

  onSubmit=(formData)=>{
    console.log(this.state.email2);
    console.log(this.state.password2);
    this.props.signUp(formData);
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
    const { open, dimmer} = this.state;
    const {handleSubmit} = this.props;

    return (
      <div>
        //Moved To App.js

        <div style={backgroundStyle}>
          <Container text style={{ marginTop: '7em' }}>
            <Header as='h1' inverted style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '3em',
            }}>
              MovedIn
        </Header>
            <Header
              as='h2'
              content='Find your perfect match'
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop: '0.5em',
              }}
            />
            <div class='col'>
              <Dropdown
                placeholder="I need a room"
                fluid
                selection
                options={searchOptions}
              />

            </div>

            <div class='col'>
              <Search style={{ marginLeft: '0.5em', marginTop: '3em' }}> </Search>
            </div>

            <div class='col'>
              <Button primary size='normal' style={{ marginLeft: '0.5em', marginTop: '0.2em' }}>
                Let's Go
            <Icon name='right arrow' />
              </Button>
            </div>
          </Container>

        </div>
             //Footer moved to App.js
              //two modals moved to App.js
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
connect(mapStateToProps, actions),
reduxForm({form:'login'})
) (App)
//export default App;
