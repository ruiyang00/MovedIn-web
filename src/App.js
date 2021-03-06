//React import
import React, { Component } from "react";
import {
  Button,
  Container,
  Dropdown,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Message,
  Menu,
  Modal,
  Segment,
} from "semantic-ui-react";

//Page import
import userProfile from './pages/userProfile';
import './App.css';
import * as actions from './actions';
import SignUpModule from './pages/modules/SignUpModule';
import LogInModule from './pages/modules/LogInModule';
import RoomProfile from './pages/roomProfile';
import pubMainPage from './pages/pubMainPage';
import UserDetail from './pages/userDetail';
import RoomDetail from './pages/roomDetail';
import welcomePage from "./pages/welcomePage";
import userPosts from './pages/userPosts';
import roomPosts from './pages/roomPosts';


//redux import
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";


//const----------------------------------------------------------------------------------
const genderOptions = [
  { key: 'Male', text: 'Male', value: 'Male' },
  { key: 'Female', text: 'Female', value: 'Female' },
  { key: 'Other', text: 'Other', value: 'Other' }
]

const roomOptions = [
  { key: 'Apartment', value: 'Apartment', text: 'Apartment' },
  { key: 'House', value: 'House', text: 'House' },
]

const rentOptions = [
  { key: '200', value: '200', text: '$200' },
  { key: '400', value: '400', text: '$400' },
  { key: '600', value: '600', text: '$600' },
  { key: '800', value: '800', text: '$800' },
  { key: '1000', value: '1000', text: '$1000' },
  { key: '1200', value: '1200', text: '$1200' },
  { key: '1400', value: '1400', text: '$1400' },
  { key: '1600', value: '1600', text: '$1600' },
  { key: '1800', value: '1800', text: '$1800' },
  { key: '2000', value: '2000', text: '$2000+' },
]

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      redirectToWel: false,
      signupModalisOpen: false,
      childModalisOpen: false
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount(dispatch) {
    if (localStorage.getItem('token')) {

      var userInfo = { email: localStorage.getItem('user'), password: localStorage.getItem('password') };
      if(localStorage.getItem('user'))
        this.props.signIn(userInfo);

    }
  }

  //Modal windows------------------------------------------------------------------------
  showLogin = (dimmer) => () => this.setState({ dimmer, loginModalisOpen: true })
  closeLogin = () => this.setState({ loginModalisOpen: false })

  showSignup = (dimmer) => () => this.setState({ dimmer, signupModalisOpen: true })
  closeSignup = () => this.setState({ signupModalisOpen: false })

  showChildModal = (dimmer) => () => this.setState({ dimmer, childModalisOpen: true })
  closeChildModal = () => this.setState({ childModalisOpen: false })

  //Event handle-------------------------------------------------------------------------
  handleSignout() {
    if (localStorage.getItem('user')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('password');
    }

    //fb auth signout
    if(localStorage.getItem('token'))
      localStorage.removeItem('token');

    this.props.signOut();

    window.location.href = 'http://http://ec2-52-14-225-128.us-east-2.compute.amazonaws.com:3000/';

  }

  handleToLogin = () => {
    this.setState({
      loginModalisOpen: true,
      signupModalisOpen: false
    });
  }

  handleToSignup = () => {
    this.setState({
      signupModalisOpen: true,
      loginModalisOpen: false
    });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (formData) => {
    console.log(this.state.signupEmail);
    console.log(this.state.signupPassword);
    this.props.signUp(formData);
    console.log('submitted');
  }

  //Redirect-----------------------------------------------------------------------------
  setRedirectToWel = () => {
    this.setState({
      redirectToWel: true
    })
  }
  renderRedirectToWel = () => {
    if (this.state.redirectToWel) {
      return <Redirect to='/' />
    }
  }

  setRedirectToUserPro = () => {
    this.setState({
      redirectToUserPro: true
    })
  }
  renderRedirectToUserPro = () => {
    if (this.state.redirectToUserPro && this.props.isAuth) {
      this.state.redirectToUserPro = false;
      return <Redirect to='/userProfile' />
    }
  }


  setRedirectToRoomPro = () => {
    this.setState({
      redirectToRoomPro: true
    })
  }
  renderRedirectToRoomPro = () => {
    if (this.state.redirectToRoomPro && this.props.isAuth) {
      this.state.redirectToRoomPro = false;
      return <Redirect to='/roomProfile' />
    }
  }

  setRedirectToRoomPosts = () => {
    this.setState({
      redirectToRoomPosts: true
    })
  }
  renderRedirectToRoomPosts = () => {
    if (this.state.redirectToRoomPosts && this.props.isAuth) {
      this.state.redirectToRoomPosts = false;
      return <Redirect to='/roomPosts' />
    }
  }

  setRedirectToUserPosts = () => {
    this.setState({
      redirectToUserPosts: true
    })
  }
  renderRedirectToUserPosts = () => {
    if (this.state.redirectToUserPosts && this.props.isAuth) {
      this.state.redirectToUserPosts = false;
      return <Redirect to='/userPosts' />
    }
  }

  //-------------------------------------------------------------------------------------
  render() {
    const { dimmer } = this.state;



    const auth = this.props.isAuth;
    const { handleSubmit } = this.props;

    const userProfileTrigger = (
      <span>
        <Icon name='user circle outline' />
      </span>
    )

    const userProfileOptions = [
      { key: 'user profile', text: 'User Profile', onClick: this.setRedirectToUserPro },
      { key: 'room profile', text: 'Post New Room', onClick: this.setRedirectToRoomPro },
      { key: 'room posts', text: 'View My Room List', onClick: this.setRedirectToRoomPosts },
      { key: 'room posts', text: 'View My Roommate List', onClick: this.setRedirectToUserPosts },
      { key: 'sign-out', text: 'Sign Out', onClick: this.handleSignout },
    ]


    const MenuWithoutAuth = () => {
      return (
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header onClick={this.setRedirectToWel}>
              {this.renderRedirectToWel()}
              <Image src='https://i.ibb.co/jkvv96c/home-30-C5-FF.png'
                style={{ marginRight: "0.5em" }}
                size='mini'
                onClick={this.setRedirectToWel} />
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
            <Menu.Item as='a' header onClick={this.setRedirectToWel}>
              {this.renderRedirectToWel()}
              <Image src='https://i.ibb.co/jkvv96c/home-30-C5-FF.png'
                style={{ marginRight: "0.5em" }}
                size='mini'
                onClick={this.setRedirectToWel} />
              MovedIn
          </Menu.Item>

            <Menu.Item position='right'>
              {this.renderRedirectToUserPro()}
              {this.renderRedirectToRoomPro()}
              {this.renderRedirectToRoomPosts()}
              {this.renderRedirectToUserPosts()}
              <Dropdown trigger={userProfileTrigger} options={userProfileOptions} />
            </Menu.Item>
          </Container>
        </Menu>
      );
    };

    return (
      <div>
        {!this.props.isAuth ?
          <div><div>  (<MenuWithoutAuth />)</div>

            <Switch>
              <Route exact path={'/'} component={welcomePage} />
              <Route path={'/welcomePage'} component={welcomePage} />
              <Route path="/mainPage" component={pubMainPage} />

            </Switch></div>
          :
          <div><div>(<MenuWithAuth />)</div>
            <Switch>
              <Route exact path={'/'} component={welcomePage} />
              <Route path={'/welcomePage'} component={welcomePage} />
              <Route path="/mainPage" component={pubMainPage} />
              <Route path="/userProfile" component={userProfile} />
              <Route path="/roomProfile" component={RoomProfile} />
              <Route path="/userDetail" component={UserDetail} />
              <Route path="/roomDetail" component={RoomDetail} />
              <Route path="/userPosts" component={userPosts} />
              <Route path="/roomPosts" component={roomPosts} />
            </Switch></div>

        }

        <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
          <Segment>
            <LogInModule
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
            <SignUpModule />
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

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

//<<<dev-ziqi
export default connect(mapStateToProps, actions)(App)
