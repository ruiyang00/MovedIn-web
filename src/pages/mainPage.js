import React, { Component } from 'react'
import BackGroundImage from './../images/home.png';
import HomeLogo from './../images/home #30C5FF.png';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Modal,
  Segment,
  Search·
} from 'semantic-ui-react'

const backgroundStyle = {
  // width: "100%",
  height: "100vh",
  backgroundImage: `url(${BackGroundImage})`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};

class App extends Component {
  state = { open: false }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

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
              <Button onClick={this.show('blurring')}>Sign Up</Button>
              <Button onClick={this.show('blurring')} style={{ marginLeft: '0.5em' }}>Log In</Button>
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
              <select class="ui dropdown" style={{ marginLeft: '6em' }}>
                <option value="">I need a room</option>
                <option value="1">I have a room</option>
              </select>
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

        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container textAlign='center'>
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Group 1' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Group 2' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Group 3' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as='h4' content='Footer Header' />
                <p>
                  Extra space
            </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <Image centered size='mini' src={HomeLogo} />
            <List horizontal inverted divided link size='small'>
              <List.Item as='a' href='#'>
                Site Map
          </List.Item>
              <List.Item as='a' href='#'>
                Contact Us
          </List.Item>
              <List.Item as='a' href='#'>
                Terms and Conditions
          </List.Item>
              <List.Item as='a' href='#'>
                Privacy Policy
          </List.Item>
            </List>
          </Container>
        </Segment>

        <div>
          <Modal dimmer={dimmer} size={"tiny"} open={open} onClose={this.close}>
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <form action="" method="get" class="ui large form">
                  <div class="ui stacked secondary segment">
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address"></input>
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
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

      </div>
    );
  }
}
export default App;