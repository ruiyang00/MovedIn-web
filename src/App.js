//React import
import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
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
import './App.css';
import * as actions from './actions';

//redux import
import { connect } from 'react-redux';
import {InputField} from 'react-semantic-redux-form';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import * as ROUTES from "./logistics/routes"
import { Link } from 'react-router-dom';

//Other import
import HomeLogo from './images/home #30C5FF.png';

//const----------------------------------------------------------------------------------
const genderOptions=[
  {key:'Male', text:'Male', value: 'Male'},
  {key:'Female', text:'Female', value: 'Female'},
  {key:'Other', text:'Other', value: 'Other'}
]

const roomOptions =[
  {key: 'House', value: 'House', text:'House'},
  {key: 'Apartment', value: 'Apartment', text:'Apartment'},
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
      loginEmail:'',
      loginPassword:'',
      signupEmail:'',
      signupPassword:'',
      loginModalisOpen: false,
      signupModalisOpen: false,
      childModalisOpen:false
      };
    this.handleClick = this.handleClick.bind(this);
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
  handleClick() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('password');
    }
    this.props.signOut();
  }

  handleNextStep = () => {
    this.setState({
      childModalisOpen: true,
      signupModalisOpen: false
    });
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

  //-------------------------------------------------------------------------------------
  render() {
    const { dimmer, 
            signupEmail, 
            signupPassword,
            loginEmail,
            loginPassword} = this.state;

    const nextStepisDisabled = signupEmail==="" ||
                               signupPassword==="";

    const auth = this.props.isAuth;
    const {handleSubmit} = this.props;

    const MenuWithoutAuth = () => {
      return (
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                <Image size='mini' src={HomeLogo} style={{ marginRight: '1.5em' }} />
                MovedIn
            </Menu.Item>

              <Menu.Item position='right'>
                <Button onClick={this.showSignup('blurring')}>Sign Up</Button>
                <Button onClick={this.showLogin('blurring')} style={{ marginLeft: '0.5em' }}>Log In</Button>
              </Menu.Item>
            </Container>
          </Menu>
        
        );

    };
    const user = localStorage.getItem('user');
    const MenuWithAuth = () => {
      return (
        <Menu>
          <Menu.Item>
            <Button color="yellow" onClick={this.handleClick}>Sign Out
               </Button>
          </Menu.Item>

          <Menu.Item>
            Welcome!
           </Menu.Item>
        </Menu>
      );
    };
    return (
      <div>
        {!this.props.isAuth ?
          (<MenuWithoutAuth />) : (null)

        }
        {this.props.isAuth ?
          (<MenuWithAuth />) : (null)

        }
        <Switch>
          <Route exact path={'/'} component={mainPage} />
          <Route path={'/welcome'} component={Welcome} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/searchPage" component={searchPage} />
        </Switch>

        <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
            <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' as='form' onSubmit={handleSubmit(this.onSubmit)}>

                    <Field
                      component={InputField}
                      type='text'
                      name='loginEmail'
                      fluid icon='mail'
                      iconPosition='right'
                      placeholder='E-mail address'
                      value={this.state.loginEmail}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Field
                      component={InputField}
                      type='password'
                      name='loginPassword'
                      fluid icon='lock'
                      iconPosition='right'
                      placeholder='Password'
                      value={this.state.loginPassword}
                      onChange={this.handleInputChange}
                      required
                    />
                    <Button color='blue' fluid size='large'>
                      Log In
                    </Button>

                </Form>

                <Button basic 
                        fluid
                        animated 
                        size="large"
                        style={{marginTop:"0.5em"}}
                        onClick={this.handleToSignup}>
                  <Button.Content visible>New to us?</Button.Content>
                  <Button.Content hidden>
                    Sign Up
                  </Button.Content>
                </Button>

              </Grid.Column>
            </Grid>
          </Modal>
          
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.signupModalisOpen} onClose={this.closeSignup}>
            <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form as='form' onSubmit={handleSubmit(this.onSubmit)}>

                  <Field
                    component={InputField}
                    type='text'
                    name='signupEmail'
                    fluid 
                    icon='mail'
                    iconPosition='right'
                    placeholder='E-mail Address'
                    value={this.state.signupEmail}
                    onChange={this.handleInputChange}
                    required
                  />
                  
                  <Field
                      component={InputField}
                      name='signupPassword'
                      fluid
                      icon='lock'
                      iconPosition='right'
                      placeholder='Password'
                      type='password'
                      value={this.state.signupPassword}
                      onChange={this.handleInputChange}
                      required
                  />
                  
                  <Button color='blue' 
                          fluid 
                          size='large'
                          disabled={nextStepisDisabled}
                          onClick={this.handleNextStep}
                          >
                    Next Step <Icon name='right chevron' />
                  </Button>
                </Form>

                <Button basic 
                        fluid
                        animated 
                        size="large"
                        style={{marginTop:"0.5em"}}
                        onClick={this.handleToLogin}>
                  <Button.Content visible>Already have an account?</Button.Content>
                  <Button.Content hidden>
                    Log In
                  </Button.Content>
                </Button>
                
                
              </Grid.Column>
            </Grid>
          </Modal>

          <Modal dimmer={dimmer} size={"tiny"} open={this.state.childModalisOpen} >
              <Modal.Header>
                <Button class="ui facebook button" color="facebook" size="large" fluid >
                  <i class="facebook icon"></i>
                  Sign Up with Facebook
                </Button>

                <Button class="ui google button" color="google plus" size="large" fluid style={{marginTop:"0.5em"}}>
                    <i class="google icon"></i>
                    Sign Up with Google
                  </Button>
              </Modal.Header>
          
              <Modal.Content>
                <Form>
                  <Form.Input
                    width={20}
                    fluid 
                    icon='user'
                    iconPosition='right'
                    type="text"
                    name='First Name'
                    placeholder="First Name"
                    value={null}
                    onChange={null}
                    required
                  />
                  <Form.Input
                    icon='user'
                    iconPosition='right'
                    width={20}
                    fluid
                    type="text"
                    name='Last Name'
                    placeholder="Last Name"
                    value={null}
                    onChange={null}
                    required
                  />
                <Select placeholder='Select gender' icon='' style={{minWidth:"10em"}} options={genderOptions}/>
                <Select placeholder='Select a prefered room type' style={{marginLeft:"0.5em"}} options={roomOptions}/>
                <Select placeholder='Maximum rent budget' style={{marginLeft:"0.5em", minWidth:"10em"}} options={rentOptions}/>
                  

                  
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button icon='check' content='All Done' onClick={this.closeChildModal}/>
              </Modal.Actions>
            </Modal>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
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

export default (connect(mapStateToProps, actions),reduxForm({form:'signup', form:'login'}))(App)

//export default connect(mapStateToProps, actions)(App);


// const App = ()=>  (

//   <Router>
//      <div>
//        <Route path={'/logIn'} component={Login} />
//        <Route path={'/mainPage'} component={MainPage} />
//        <Route path={'/searchPage'} component={searchPage} />

//      </div>
//   </Router>
// );

// export default App;