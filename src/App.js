//React import
import React, { Component } from "react";
import {  Button,
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
        } from "semantic-ui-react";

//Page import
import Login from './pages/login';
import SignUp from './pages/signup';
import Welcome from './pages/welcome';
import mainPage from './pages/mainPage';
import searchPage from './pages/searchPage';
import userProfile from './pages/userProfile';
import './App.css';
import * as actions from './actions';
import SignUpModule from './pages/modules/SignUpModule';
import LogInModule from './pages/modules/LogInModule';

//redux import
import { connect } from 'react-redux';
import {compose} from 'redux';
import {InputField} from 'react-semantic-redux-form';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import * as ROUTES from "./logistics/routes";
import { Link,withRouter } from 'react-router-dom';
import {Switch,BrowserRouter as Router, Route} from "react-router-dom";

//Other import
import HomeLogo from './images/home #30C5FF.png';

//const----------------------------------------------------------------------------------
const genderOptions=[
  {key:'Male', text:'Male', value: 'Male'},
  {key:'Female', text:'Female', value: 'Female'},
  {key:'Other', text:'Other', value: 'Other'}
]

const roomOptions =[
  {key: 'Apartment', value: 'Apartment', text:'Apartment'},
  {key: 'House', value: 'House', text:'House'},
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

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state={
      signupModalisOpen:false,
      childModalisOpen: false
      };
    this.handleSignout = this.handleSignout.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
  }

  async componentDidMount(dispatch) {
    if (localStorage.getItem('token')) {

      var userInfo = { email: localStorage.getItem('user'), password: localStorage.getItem('password') };
      this.props.signIn(userInfo);


      //

    }
  }
  
  //Modal windows------------------------------------------------------------------------
  showLogin = (dimmer) => () => this.setState({ dimmer, loginModalisOpen: true })
  closeLogin = () => this.setState({ loginModalisOpen: false })
  
  showSignup = (dimmer) => () => this.setState({dimmer, signupModalisOpen: true})
  closeSignup = () => this.setState({signupModalisOpen: false})

  showChildModal = (dimmer) => () => this.setState({ dimmer,childModalisOpen: true })
  closeChildModal = () => this.setState({ childModalisOpen: false})

  //Event handle-------------------------------------------------------------------------
  handleSignout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('password');
    }
    this.props.signOut();
    window.location.reload(true);
  }
  
  handleToLogin = () => {
    this.setState({
      loginModalisOpen: true,
      signupModalisOpen: false
    });
  }

  handleToSignup= () => {
    this.setState({
      signupModalisOpen: true,
      loginModalisOpen: false
    });
  }

  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }

  onSubmit=(formData)=>{
    console.log(this.state.signupEmail);
    console.log(this.state.signupPassword);
    this.props.signUp(formData);
    console.log('submitted');
  }

  LoginCallbackFunction = (childData) => {
    this.setState({loginModalisOpen: childData})
  }

  //-------------------------------------------------------------------------------------
  render() {   
    const { dimmer, 
            signupEmail, 
            signupPassword,
            loginEmail,
            loginPassword } = this.state;

    

    const auth = this.props.isAuth;
    const {handleSubmit} = this.props;

    const userProfileTrigger = (
      <span>
        <Icon name='user'/>
      </span>
    )

    const userProfileOptions = [
      {
        key: 'user',
        text: (
          <span>
            Signed in as <strong>Name</strong>
          </span>
        ),
        disabled: true,
      },
      { key: 'profile', text: 'View Profile' },
      { key: 'settings', text: 'Settings' },
      { key: 'sign-out', text: 'Sign Out', onClick: this.handleSignout},
    ]
   

    const MenuWithoutAuth = () => {
      return (
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                MovedIn
              </Menu.Item>

              <Menu.Item position='right'>
                <Button onClick={this.showSignup('blurring')}>Sign Up</Button>
                <Button onClick={this.showLogin('blurring')} style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>Log In</Button>
              </Menu.Item>
            </Container>
          </Menu>
      
        );

    };

    const user = localStorage.getItem('user');

    const MenuWithAuth = () => {
      return (
        <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            MovedIn
          </Menu.Item>

          <Menu.Item position='right'>
            <Dropdown trigger={userProfileTrigger} options={userProfileOptions}/>
          </Menu.Item>
        </Container>
      </Menu>
      );
    };

    return (
      <div>
          {!this.props.isAuth ?
            (<MenuWithoutAuth />) : (<MenuWithAuth />)
          }
          
          <Switch>
            <Route exact path={'/'} component={mainPage} />
            <Route path={'/welcome'} component={Welcome} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/searchPage" component={searchPage} />
            <Route path="/userProfile" component={userProfile} />
          </Switch>

          <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
            <Segment>
              <LogInModule
                parentCallback = {this.state.LoginCallbackFunction}
              />
              <Message>
                <Container textAlign='center'>
                  New to us? <a href='#' onClick={this.handleToSignup}>Sign Up</a>
                </Container>
              </Message>
            </Segment>
          </Modal>

        <Modal dimmer={dimmer} size={"tiny"} open={this.state.signupModalisOpen} onClose={this.closeSignup}>
          <Segment>
            <Message>
              <Container textAlign='center'>
                Welcome! Sign up with <a>Google</a> or <a>Facebook</a>
              </Container>
            </Message>
            <Divider horizontal>or</Divider>
            <SignUpModule 
              signupModalisOpen={this.state.signupModalisOpen}
            />
            <Message>
              <Container textAlign='center'>
                Already have an account? <a href='#' onClick={this.handleToLogin}>Log In</a>
              </Container>
            </Message>
          </Segment>
        </Modal>

          <div id="footer">
            <Segment inverted vertical style={{ margin: '0em 0em 0em', padding: '5em 0em' }}>
              <Container textAlign='center'>
                <Grid divided inverted stackable>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='MovedIn' />
                    <List link inverted>
                      <List.Item as='a'>About</List.Item>
                      <List.Item as='a'>News</List.Item>
                      <List.Item as='a'>Policies</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Help & Support' />
                    <List link inverted>
                      <List.Item as='a'>MovedIn guide</List.Item>
                      <List.Item as='a'>FAQs</List.Item>
                      <List.Item as='a'>Contact us</List.Item>
                      <List.Item as='a'>Give us feedback</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Discover' />
                    <List link inverted>
                      <List.Item as='a'>Community</List.Item>
                      <List.Item as='a'>Join us</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <i class="facebook f large icon"></i>
                    <i class="instagram large icon"></i>
                    <i class="twitter large icon"></i>
                    <List link inverted>
                      <List.Item as='a'>Terms</List.Item>
                      <List.Item as='a'>Privacy</List.Item>
                      <List.Item as='a'>Site Map</List.Item>
                    </List>
                  </Grid.Column>
                </Grid>

                <Divider inverted section />

                <List horizontal inverted divided link size='small'>
                  <List.Item as='a' href='#'>
                    © 2019 MovedIn, Inc. All rights reserved
                  </List.Item>
                </List>
              </Container>
            </Segment>
          </div>
        </div>
    );

  }

}

//   <Router>
//      <div>
//        <Route exact path={'/'} component={Welcome}/>
//        <Route path={'/welcome'} component={Welcome}/>
//        <Route path={'/logIn'} component={Login} />
//        <Route path={'/signup'} component={SignUp}/>
//
//      </div>
//   </Router>
// );

function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

//<<<dev-ziqi
export default connect(mapStateToProps, actions)(App)
//===
//export default (connect(mapStateToProps, actions), reduxForm({form:'signup', form:'login'}))(App)
//>>>dev