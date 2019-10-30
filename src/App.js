import React, {Component} from "react";
import {Switch,BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/signup';
import Welcome from './pages/welcome';
import UserProfile from './pages/userProfile';
import logo from './logo.svg';
import './App.css';
import * as actions from './actions';
import {connect} from 'react-redux';
import {Menu,Button} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import * as ROUTES from "./logistics/routes"

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
  }

  render(){
     const auth= this.props.isAuth;
     const MenuWithoutAuth =()=>{
        return(
       <Menu>

          <Menu.Item>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
           </Menu.Item>

           <Menu.Item>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </Menu.Item>

            </Menu>

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
              ( <MenuWithoutAuth />):( null)

          }
          {this.props.isAuth ?
          ( <MenuWithAuth />):( null)

         }
            <Switch>
                <Route exact path={'/'} component={Welcome}/>
                <Route path={'/welcome'} component={Welcome}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
                <Route path="/userProfile" component={UserProfile}/>
            </Switch>

           </div>


     );
   }

  }



function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated
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

export default connect(mapStateToProps,actions) (App);
