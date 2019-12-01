import React, { Component } from "react";
import {
    Button,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Segment,
  } from 'semantic-ui-react'
  import axios from 'axios';
  import { Redirect } from 'react-router-dom';

  const backgroundStyle = {
    height: "160vh",
    backgroundImage: `url(https://i.ibb.co/dQykXsR/2560x1080-F5-F5-F5.png)`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',
  };




class App extends Component {
    constructor(props) {
        super(props);
        this.state={
          targetUserId:'', //store target user id to see detail user page
          myToken:'',      //store my token to pass into detail user page
          targetUser: {}
        };
      }

    componentDidMount() {

        axios.post('http://localhost:5000/roommates/gettheroommate', {
            roommate_id: this.props.location.state.targetUserId
          },{
            headers: {
                'Authorization': this.props.location.state.myToken
              },
          })
          .then(function (response) {
            console.log(response);

            this.setState({
                targetUser: response.data.roommate,
              });
          }.bind(this));
    }

    setRedirectToMain = () => {
        this.setState({
          redirectToMain: true
        })
      }
      renderRedirectToMain = () => {
          if (this.state.redirectToMain) {
            return <Redirect to='/mainPage' />
          }
      }

    render(){
        return(

            <div style={backgroundStyle}>
                <div style={{marginLeft:"17em", marginBottom:"40em"}}>


                <Grid style={{ marginTop: "5em", marginBottom:"0em"}}>
                    <Grid.Column width={4}>
                        <Image
                            src={'https://image.flaticon.com/icons/svg/168/168729.svg'}
                            wrapped ui={false}
                            as='a'
                            onClick={null}
                            />
                        <Segment>
                            <Header as='h4'>
                                Contact Information
                            </Header>

                            <List>
                                <List.Item>
                                    <List.Icon name='mail' />
                                    <List.Content>
                                       {this.state.targetUser.email}
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='wechat' />
                                    <List.Content>
                                        Alice834
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='facebook' />
                                    <List.Content>
                                        <a href=''>https://www.facebook.com/aliceS</a>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='instagram' />
                                    <List.Content>
                                        <a href=''>instagram.com/aliceS</a>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>

                        <Grid.Column width={9}>
                            <Segment>
                                <Header as='h3' dividing>
                                    {this.state.targetUser.first_name} {this.state.targetUser.last_name}
                                </Header>
                                <Header.Subheader>
                                    Needs a <strong>{this.state.targetUser.budget || ''}</strong> room
                             in <strong>{this.state.targetUser.city}</strong>
                                </Header.Subheader>
                                <Header.Subheader>Gender: {this.state.targetUser.gender || ''}</Header.Subheader>
                                <Header.Subheader>Age Range: {this.state.targetUser.age}</Header.Subheader>

                            </Segment>

                            <Segment.Group>
                                <Segment>
                                    <Header as='h3'> My Preferences </Header>

                                    <Segment.Group horizontal>
                                        <Segment>
                                            <Header as='h4'>
                                                <Icon name='bed' size='large' />
                                                <Header.Content>Room type: {this.state.targetUser.room_type_required}</Header.Content>
                                            </Header>
                                        </Segment>
                                    </Segment.Group>
                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='car' size='large' />
                                            <Header.Content>Parking Available: {this.state.targetUser.parking_needed} </Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='users' size='large' />
                                            <Header.Content>Shared Bathroom: {this.state.targetUser.ok_with_shaing_bathroom}</Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='paw' size='large' />
                                            <Header.Content>Pets Friendly: {this.state.targetUser.pet_friendly}</Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='game' size='large' />
                                            <Header.Content>Party Friendly: {this.state.targetUser.party_friendly}</Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='thumbs up' size='large' />
                                            <Header.Content>Smoking Friendly: {this.state.targetUser.smoking_friendly}</Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='calendar alternate outline' size='large' />
                                            <Header.Content>Prefered Lease Term: {this.state.targetUser.lease_duration}</Header.Content>
                                        </Header>
                                    </Segment>

                                </Segment>
                            </Segment.Group>

                            <Segment.Group >
                                <Segment>

                                
                                <Header as='h3'>About</Header>

                                <Segment>
                                    <Header as='h4'>
                                        <Icon name='suitcase' size='large' />
                                        <Header.Content>Occupation: {this.state.targetUser.occupation}</Header.Content>
                                    </Header>
                                </Segment>

                                <Segment>
                                <Header as='h4'>
                                    <Icon name='graduation cap' size='large' />
                                    <Header.Content>School: {this.state.targetUser.school || ''}</Header.Content>
                                </Header>
                                </Segment>


                                <Segment>
                                <Header as='h4'>
                                    <Icon name='book' size='large' />
                                    <Header.Content>Major: {this.state.targetUser.major || ''}</Header.Content>
                                </Header>
                                </Segment>


                                <Segment>
                                <Header as='h4'>
                                    <Icon name='history' size='large' />
                                    <Header.Content>School Grade: {this.state.targetUser.year_in_school || ''}</Header.Content>
                                </Header>
                                </Segment>
                                </Segment>
                            </Segment.Group>

                            {this.renderRedirectToMain()}
                            <Button floated='right'
                                    onClick={this.setRedirectToMain}>
                                <Icon name='arrow left'/>
                                Back
                             </Button>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>//---
        );
    }
}

export default App;
