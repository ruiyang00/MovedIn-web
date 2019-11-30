import React, { Component } from "react";
import {
    Button,
    Card,
    Container,
    Dropdown,
    Form,
    Grid,
    Header,
    Icon,
    Input,
    Image,
    List,
    Menu,
    Message,
    Modal,
    Pagination,
    Select,
    Segment,
  } from 'semantic-ui-react'
  import axios from 'axios';

  const backgroundStyle = {
    height: "100vh",
    backgroundImage: `url(https://i.ibb.co/dQykXsR/2560x1080-F5-F5-F5.png)`,
    backgroundRepeat: "null",
    backgroundSize: 'cover',
    overflow: 'hidden',
  };




class App extends Component {
    constructor(props) {
        super(props);
        this.state={
          budgetRange:'',
          city:'',
          gender:'',
          age:'',

          room_type_required:'',
          parking:'',
          sharedBath:'',
          pet:'',
          party:'',
          smoking:'',

          lease_duration:'',
          movedInMonth:'',

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
                                        Alice.S@gmail.com
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
                            <Header as='h2' dividing>

                            </Header>
                            <Header.Subheader>
                                Needs a <strong></strong> room in <strong>Los Angles</strong> | Female | 26 years old
                        </Header.Subheader>
                        </Segment>

                        <Segment.Group>
                            <Segment>
                                <Header as='h3'> My Preferences </Header>

                                <Segment.Group horizontal>
                                    <Segment>
                                        <Header as='h4'>
                                            <Icon name='bed' size='large' />
                                            <Header.Content>Room type: </Header.Content>
                                        </Header>
                                     </Segment>
                                </Segment.Group>
                                <Segment>
                                <Header as='h4'>
                                    <Icon name='car' size='large' />
                                    <Header.Content>Parking Available: </Header.Content>
                                </Header>
                            </Segment>

                            <Segment>
                                <Header as='h4'>
                                    <Icon name='users' size='large' />
                                    <Header.Content>Shared Bathroom: </Header.Content>
                                </Header>
                            </Segment>

                            <Segment>
                                <Header as='h4'>
                                    <Icon name='paw' size='large' />
                                    <Header.Content>Pets Friendly: </Header.Content>
                                </Header>
                            </Segment>

                            <Segment>
                                <Header as='h4'>
                                    <Icon name='game' size='large' />
                                    <Header.Content>Party Friendly: </Header.Content>
                                </Header>
                            </Segment>

                            <Segment>
                                <Header as='h4'>
                                    <Icon name='thumbs up' size='large' />
                                    <Header.Content>Smoking Friendly: </Header.Content>
                                </Header>
                            </Segment>

                            </Segment>
                        </Segment.Group>


                        </Grid.Column>
                    </Grid>
                </div>
            </div>//---
        );
    }
}

export default App;
