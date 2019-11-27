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
      targetGroup:'new place to MovedIn',
      targetCity:'San Jose',
      redirect: false,
      loginModalisOpen: false,
      signupModalisOpen: false,
      childModalisOpen:false
      };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleDropdownChange=this.handleDropdownChange.bind(this);
  }


handleDropdownChange(){
   this.setState({
       targetGroup:document.getElementById('targetGroup').innerText,
       targetCity:document.getElementById('targetCity').innerText,
    });


}



async onSubmit(){
    await this.handleDropdownChange();
    const {targetGroup,targetCity} =this.state;
    console.log(targetCity);
    console.log(targetGroup);
    this.props.history.push({
      pathname:'./mainPage',
      state:{
        targetGroup,
        targetCity,
      }
    });
    this.setState({
      redirectToMainPage: true,
    });
  }



  // async setRedirectToMainPage(){
  //   await this.handleDropdownChange();
  //   const {targetGroup,targetCity} =this.state;
  //   console.log(targetCity);
  //   console.log(targetGroup);
  //   this.props.history.push({
  //     pathname:'./mainPage',
  //     state:{
  //       targetGroup,
  //       targetCity,
  //     }
  //   });

    // this.setState({
    //   redirectToMainPage: true,
    // });

  //}

  renderRedirectToMainPage = () => {
    if (this.state.redirectToMainPage && this.props.isAuth) {
      return <Redirect to='/mainPage' />

    }
   if(this.state.redirectToMainPage && !this.props.isAuth) {
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
                    id="targetGroup"
                    control={Select}
                    defaultValue="new place to MovedIn"
                    label="I'm looking for"
                    placeholder="Select one"
                    options={searchOptions}
                    onChange={this.handleDropdownChange}
                  />
                  <Form.Field inline
                    id="targetCity"
                    control={Select}
                    defaultValue="San Jose"
                    placeholder="Select your city"
                    label="in"
                    options={cityOptions}
                    onChange={this.handleDropdownChange}
                  />
                  {this.renderRedirectToMainPage()}
                  <Button
                    primary
                    size='normal'
                    onClick={this.onSubmit}>
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
