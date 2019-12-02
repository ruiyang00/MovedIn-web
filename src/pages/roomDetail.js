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
          targetRoomId:'',
          myToken:'',      
          targetRoom: {}
        };
      }

      componentDidMount() {

        axios.post('http://http://ec2-52-14-225-128.us-east-2.compute.amazonaws.com:5000/rooms/gettheroom', {
            room_id: this.props.location.state.targetRoomId
          },{
            headers: {
                'Authorization': this.props.location.state.myToken
              },
          })
          .then(function (response) {
            console.log(response);

            this.setState({
                targetRoom: response.data.room,
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
                            src={'https://image.flaticon.com/icons/svg/609/609803.svg'}
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
                                       {this.state.targetRoom.email}
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
                                    <strong>Type: </strong> {this.state.targetRoom.room_type || ''}
                                </Header>
                                <Header.Subheader>
                                    <strong>Location: </strong>{this.state.targetRoom.street || ''}, {this.state.targetRoom.city || ''}
                                </Header.Subheader>
                                <Header.Subheader><strong>Rent:</strong> {this.state.targetRoom.price}/mo</Header.Subheader>
                                <Header.Subheader><strong>Available in:</strong> {this.state.targetRoom.move_in_date}</Header.Subheader>
                                <Header.Subheader><strong>Lease Term:</strong> {this.state.targetRoom.min_lease_duration}</Header.Subheader>
                            </Segment>

                            <Segment.Group>
                                <Segment>
                                    <Header as='h3'>About</Header>

                                    <Segment.Group horizontal>
                                        <Segment>
                                            <Header as='h4'>
                                                <Icon name='plug' size='large' />
                                                <Header.Content>Utilities Included: {this.state.targetRoom.utility_include}</Header.Content>
                                            </Header>
                                        </Segment>
                                    </Segment.Group>
                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='car' size='large' />
                                            <Header.Content>Parking Available: {this.state.targetRoom.parking} </Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='bath' size='large' />
                                            <Header.Content>Private Bathroom: {this.state.targetRoom.bathroom}</Header.Content>
                                        </Header>
                                    </Segment>

                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='bed' size='large' />
                                            <Header.Content>Basic Furniture: {this.state.targetRoom.furniture}</Header.Content>
                                        </Header>
                                    </Segment>
                                </Segment>
                            </Segment.Group>

                            <Segment.Group >
                                <Segment>

                                
                                <Header as='h3'>Room Preferences</Header>
                                <Segment>
                                    <Header as='h4'>
                                        <Icon name='transgender' size='large' />
                                        <Header.Content>Preferred Gender: {this.state.targetRoom.gender_prefered}</Header.Content>
                                    </Header>
                                </Segment>

                                <Segment>
                                <Header as='h4'>
                                    <Icon name='paw' size='large' />
                                    <Header.Content>Pets Friendly: {this.state.targetRoom.pet || ''}</Header.Content>
                                </Header>
                                </Segment>

                                <Segment>
                                <Header as='h4'>
                                    <Icon name='food' size='large' />
                                    <Header.Content>Cooking Allowed: {this.state.targetRoom.cooking || ''}</Header.Content>
                                </Header>
                                </Segment>

                                <Segment>
                                <Header as='h4'>
                                    <Icon name='thumbs up' size='large' />
                                    <Header.Content>Smoking Friendly: {this.state.targetRoom.smoking || ''}</Header.Content>
                                </Header>
                                </Segment>

                                <Segment>
                                <Header as='h4'>
                                    <Icon name='game' size='large' />
                                    <Header.Content>Party Friendly: {this.state.targetRoom.party || ''}</Header.Content>
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

    }// end of render
}//end of class App

export default App;
