import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header, Segment, Button, Grid, Card, Icon, Image, Menu, Message } from 'semantic-ui-react';
import axios from 'axios';

export default class roomPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roomPosts: [],
      roomToDelete: ''
    };
  }

  componentDidMount() {

    axios.get('http://localhost:5000/rooms/getroompost',
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(function (response) {
        console.log(response);
        this.setState({
          roomPosts: response.data.allRooms,
        })

      }.bind(this));
  }


  deleteRoom() {

    axios.delete('http://localhost:5000/rooms/deletetheroom',
      {
        headers: {
          'Authorization': localStorage.getItem('token'),
          "room_id": this.state.roomToDelete
        }
      })
      .then(function (response) {
        console.log(response);

      }.bind(this));
    window.location.reload(true);
  }


  render() {
    return (
      <div>
        <Segment secondary style={{ marginTop: "2em", marginBottom: "0em", marginLeft: "0em" }}>

          <Segment style={{ marginTop: "2em", marginBottom: "0em", marginLeft: "10em", marginRight: "10em" }}>
            <Button.Group>
              <Link to='./userPosts'>
                <Button onClick={() => { this.forceUpdate() }} color="olive" size="small">View My Roommate Posts</Button>
              </Link>
              <Button.Or />
              <Link to='./roomPosts'>
                <Button onClick={() => { this.forceUpdate() }} color="twitter" size="small">View My Room Posts</Button>
              </Link>
            </Button.Group>

            <Link to='./roomProfile'>
              <Button floated='right' color='pink'>Post A New Room</Button>
            </Link>
          </Segment>


          <Segment style={{ marginTop: "2em", marginBottom: "2em", marginLeft: "10em", marginRight: "10em" }}>
            <Header as='h3'>
              <Icon name='home' />
              <Header.Content>
                My Posted Rooms
              <Header.Subheader>Manage your rooms</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider></Divider>

            <Card.Group itemsPerRow={4} style={{ marginTop: '2em', marginBottom: "2em", marginLeft: "6.5em" }}>
              {this.state.roomPosts ?
                this.state.roomPosts.map((room) => {
                  return (
                    <Segment padded='very'>
                      <Grid columns={3}>
                        <Grid.Row>
                          <Grid.Column width={5}>
                            <Image
                              src={'https://image.flaticon.com/icons/svg/609/609803.svg'}
                              wrapped size='medium'
                            />
                          </Grid.Column>
                          <Grid.Column width={7}>
                            <Header as='h3'> {room.street}, {room.city} </Header>

                            <Divider/>

                            <Segment basic>
                                <Header as='h3' dividing>
                                    {room.room_type || " N/A"}
                                </Header>

                                <Header.Subheader><strong>Rent: </strong> ${room.price}/mo</Header.Subheader>
                                <Header.Subheader><strong>Available in: </strong> {room.move_in_date}</Header.Subheader>
                                <Header.Subheader><strong>Lease Term: </strong> {room.min_lease_duration}</Header.Subheader>
                                <Header.Subheader><strong>Private Bathroom: </strong> {room.bathroom || "Not Answered"}</Header.Subheader>
                                <Header.Subheader><strong>Preferred Gender: </strong>{room.gender_prefered || "Not Answered"}</Header.Subheader>
                                <Header.Subheader><strong>Utilities Included: </strong>{room.utility_include || "Not Answered"}</Header.Subheader>
                                <Header.Subheader><strong>Cooking Allowed: </strong>{room.cooking || "Not Answered"}</Header.Subheader>
                                <Header.Subheader><strong>furniture Included: </strong>{room.furniture || "Not Answered"}</Header.Subheader>
                                
                            </Segment> 
                          </Grid.Column>


                          <Grid.Column width={4}>
                            <Grid.Row>
                              <Button floated='right' color="red" onClick={async () => { await this.setState({ roomToDelete: room._id }); this.deleteRoom() }}>Delete Post</Button>
                            </Grid.Row>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  )
                })
                :
                <Grid>
                  <p></p>
                  <p></p>
                  <Grid.Row>
                    <p></p>
                    <Segment size="large" placeholder padded="very">
                      <Header as="h2" icon textAlign="center">
                        <Icon name="home" circular />
                        <Header.Content>No Posted Rooms</Header.Content>
                      </Header>
                    </Segment>
                  </Grid.Row>
                </Grid>
              }
            </Card.Group>

          </Segment>
        </Segment>
      </div>
    )
  }
}
