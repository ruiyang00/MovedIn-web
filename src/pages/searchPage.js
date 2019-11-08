import React, { Component } from 'react'
// import HomeLogo from './../images/home #30C5FF.png';
// import profile1 from './../images/profile1.png';
// import profile2 from './../images/profile2.png';
// import profile3 from './../images/profile3.png';
// import profile4 from './../images/profile4.png';
// import profile5 from './../images/profile5.png';
// import profile6 from './../images/profile6.png';

import { Link,withRouter } from 'react-router-dom';
import { Form} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Pagination,
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

class App extends Component {

  constructor(props){
    super(props);
    this.state={
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





  render() {
    const {allUsers}=this.state;
    console.log(allUsers);
    return (

      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' style={{ marginRight: '1.5em' }} />
              MovedIn
                </Menu.Item>

            <Menu.Item position='right'>
              <Button as='a' >
                Log in
                </Button>
              <Button as='a' style={{ marginLeft: '0.5em' }}>
                Sign Up
                </Button>
            </Menu.Item>
          </Container>
        </Menu>

        <Grid columns={5} stackable>
          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '13em' }}>
            Search location
            <select class="ui search dropdown">
              <option value="">State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Members who
            <select class="ui search dropdown">
              <option value="">Have a room</option>
              <option value="1">Need a room</option>
            </select>
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Range of rent
            <select class="ui dropdown">
              <option value="">Less than $500</option>
              <option value="1">$500-$1000</option>
              <option value="2">$1000-$1500</option>
            </select>
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '2em', marginLeft: '0.0em' }}>
            Moved-in Date
            <select class="ui dropdown">
              <option value="">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </Grid.Column>

          <Grid.Column width={2} style={{ marginTop: '3.5em', marginLeft: '0.0em' }}>
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
      </div>//--------
    );
  }
}
export default App;
