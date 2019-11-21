//React import
import React, { Component } from 'react'
import { Link,withRouter, Redirect } from 'react-router-dom';

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
  Input,
  Image,
  List,
  Message,
  Menu,
  Modal,
  Segment,
  Select,
  Search,
  Popup,
  ButtonContent
} from 'semantic-ui-react'

//Redux import
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {InputField} from 'react-semantic-redux-form';
import * as actions from '../actions';
import * as ROUTES from "../logistics/routes"


//const----------------------------------------------------------------------------------
const backgroundStyle = {
  // width: "100%",
  height: "100vh",
  backgroundImage: `url(https://i.ibb.co/HPDKrC0/home.png)`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};

const searchOptions=[
  {
    key: 'new people to MovedIn',
    text: 'new people to MovedIn',
    value: 'new people to MovedIn',
  },
  {
    key: 'new place to MovedIn',
    text: 'new place to MovedIn',
    value: 'new place to MovedIn',
  },
]

const cityOptions=[
  { key: 'Los Angeles', text: 'Los Angeles', value: 'Los Angeles'},
  { key: 'Santa Barbara', text: 'Santa Barbara', value: 'Santa Barbara'},
  { key: 'San Deigo', text: 'San Deigo', value: 'San Deigo'},
  { key: 'San Fransico', text: 'San Fransico', value: 'San Fransico'},
  { key: 'San Jose', text: 'San Jose', value: 'San Jose'},
]


//class App------------------------------------------------------------------------------
class App extends Component {
  //Authtication-------------------------------------------------------------------------
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      loginModalisOpen: false,
      signupModalisOpen: false,
      childModalisOpen:false
      };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  setRedirectToMainPage = () => {
    this.setState({
      redirectToMainPage: true
    })
  }

  renderRedirectToMainPage = () => {
    if (this.state.redirectToMainPage) {
      return <Redirect to='/mainPage' />
    }
  }

  //Event handle-------------------------------------------------------------------------
  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  onSubmit=(formData)=>{
    this.props.signUp(formData);
    console.log('submitted');
  }

  //-------------------------------------------------------------------------------------
  render() {

    const {handleSubmit} = this.props;

    return (
      <div>
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
              content='Improve your living experience with new friends'
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
                marginTop: '0.5em',
                marginBottom:'2em'
              }}
            />

            <Segment secondary>
              <Form>
                <Form.Group>
                  <Form.Field inline
                    control={Select}
                    label="I'm looking for"
                    placeholder="Select one"
                    options={searchOptions}
                  />
                  <Form.Field inline
                    control={Select}
                    placeholder="Select your city"
                    label="in"      
                    options={cityOptions}
                  />
                  {this.renderRedirectToMainPage()}
                  <Button 
                    primary 
                    size='normal'
                    onClick={this.setRedirectToMainPage}>
                    Let's Go <Icon name='right arrow' />
                  </Button>
                </Form.Group>
              </Form>

            </Segment>
        
              
          </Container>

        </div>
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

export default connect(mapStateToProps, actions)(App)
//export default App;