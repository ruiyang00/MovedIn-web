import React, { Component } from 'react'
import BackGroundImage from './../images/home.png';
import HomeLogo from './../images/home #30C5FF.png';

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

const genderOptions=[
  {
    key: 'Male',
    text: 'Male',
    value: 'Male',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Female',
    text: 'Female',
    value: 'Female',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Other',
    text: 'Other',
    value: 'Other',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
]

class App extends Component {
 
 
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
    const { open, dimmer} = this.state

    return (
      <div>
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
            <Image centered size='mini' src={HomeLogo} />
            <List horizontal inverted divided link size='small'>
              <List.Item as='a' href='#'>
              © 2019 MovedIn, Inc. All rights reserved
               </List.Item>
            </List>
          </Container>
        </Segment>

        <div>
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.loginModalisOpen} onClose={this.closeLogin}>
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <form action="" method="get" class="ui large form">
                  <div class="ui stacked secondary segment">
                    <div class="field">
                      <div class="ui right icon input">
                        <i class="mail icon"></i>
                        <input type="text" name="email" placeholder="E-mail address"></input>
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui right icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password"></input>
                      </div>
                    </div>

                    <div class="ui fluid large blue submit button">Log in</div>

                  </div>
                </form>
                <div class="ui message">
                  New to us? <a href="">Sign Up</a>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <Modal dimmer={dimmer} size={"tiny"} open={this.state.signupModalisOpen} onClose={this.closeSignup}>
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <form class="ui form">
                <div class="ui stacked secondary segment">
                  <div class="two fields">
                    <div class="field">
                      <label>Name</label>
                      <div class="two fields">
                        <div class="field">
                          <input type="text" name="name[first]" placeholder="First Name"></input>
                        </div>
                        <div class="field">
                          <input type="text" name="name[last]" placeholder="Last Name"></input>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <label>Gender</label>
                      <Dropdown
                        placeholder="select gender"
                        fluid
                        selection
                        options={genderOptions}
                      />
                    </div>
                  </div>
                  <div class="two fields">
                    <div class="required field">
                      <label>Email</label>
                      <div class="ui icon input">
                        <input type="text" name="Email" placeholder="Email address"></input>
                        <i class="mail icon"></i>
                      </div>
                    </div>
                    <div class="required field">
                      <label>Password</label>
                      <div class="ui icon input">
                        <input type="password" name="password"></input>
                        <i class="lock icon"></i>
                      </div>
                    </div>
                  </div>
                  <div class="ui submit button">Submit</div>
                  </div>
                </form>
                
                <div class="ui message">
                  Already have an account? <a href="" onClick={(this.closeSignup)}>Log In</a>
                </div>
              </div>
            </div>
          </Modal>
        </div>

      </div>
    );
  }
}
export default App;