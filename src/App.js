import React, {Component} from "react";
import { Link,withRouter } from 'react-router-dom';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {Switch,BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/signup';
import Welcome from './pages/welcome';
import mainPage from './pages/mainPage';
import searchPage from './pages/searchPage';
import './App.css';
import * as actions from './actions';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as ROUTES from "./logistics/routes";
import SignUpModule from './pages/modules/SignUpModule';
import LogInModule from './pages/modules/LogInModule';
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

//line 92, 173 Image deleted

class App extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.handleClick=this.handleClick.bind(this);

  }

  async componentDidMount(dispatch){
    if(localStorage.getItem('token')){

        var userInfo={email:localStorage.getItem('user'),password:localStorage.getItem('password')};
        this.props.signIn(userInfo);


         //

 }


}

  handleClick(){
     if(localStorage.getItem('user')){
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       localStorage.removeItem('password');
     }
     this.props.signOut();
     window.location.reload(true);
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

  render(){
     const auth= this.props.isAuth;
     const { open, dimmer} = this.state;
     const {handleSubmit} = this.props;
     const MenuWithoutAuth =()=>{
        return(

           <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                //Image deleted
                MovedIn
            </Menu.Item>

              <Menu.Item position='right'>
                <Button onClick={this.showSignup('blurring')}>Sign Up</Button>
                <Button onClick={this.showLogin('blurring')} style={{ marginLeft: '0.5em' }}>Log In</Button>
              </Menu.Item>
            </Container>
          </Menu>

          <div>
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
            <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>

                     <LogInModule />

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


                   <SignUpModule />

                   <Message>
                     Already have an account? <a href="" onClick={(this.closeSignup)}>Log In</a>
                   </Message>

                 </Grid.Column>
               </Grid>
             </Modal>
          </div>
</div>



     );

   };
     const user= localStorage.getItem('user');
    const MenuWithAuth=()=>{
      return(
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
              (
                  <MenuWithoutAuth />


              ):( <MenuWithAuth />)

          }

          //Footer-------------------------------------------------
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
              //
              <List horizontal inverted divided link size='small'>
                <List.Item as='a' href='#'>
                © 2019 MovedIn, Inc. All rights reserved
                 </List.Item>
              </List>
            </Container>
          </Segment>
</div>



          //--------------------------------------------------

            <Switch>
                <Route exact path={'/'} component={mainPage}/>
                <Route path={'/welcome'} component={Welcome}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
                <Route path="/searchPage" component={searchPage}/>
            </Switch>

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

export default connect(mapStateToProps, actions)(App)
