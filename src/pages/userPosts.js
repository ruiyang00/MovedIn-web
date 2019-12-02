import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header, Segment, Button, Grid, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';

export default class userPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roommatePosts: [],
      roommateToDelete: '',
    };
  }

  componentDidMount() {
    axios.get('http://http://ec2-52-14-225-128.us-east-2.compute.amazonaws.com:5000/roommates/getroommatepost',
      {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      .then(function (response) {
        console.log(response);
        this.setState({
          roommatePosts: response.data.allRoommates,
        })

      }.bind(this));
  }

  deleteRoommate() {

    axios.delete('http://http://ec2-52-14-225-128.us-east-2.compute.amazonaws.com:5000/roommates/deletetheroommate',
      {
        headers: {
          'Authorization': localStorage.getItem('token'),
          "roommate_id": this.state.roommateToDelete
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

            <Link to='./userProfile'>
              <Button floated='right' color='pink'>Post A New Roommate</Button>
            </Link>
          </Segment>

          <Segment style={{ marginTop: "2em", marginBottom: "2em", marginLeft: "10em", marginRight: "10em" }}>
            <Header as='h3'>
              <Icon name='home' />
              <Header.Content>
                My Posted Roommates
              <Header.Subheader>Manage your posts</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider></Divider>

            <Card.Group itemsPerRow={4} style={{ marginTop: '2em', marginBottom: "2em", marginLeft: "6.5em" }}>
              {this.state.roommatePosts ?
                this.state.roommatePosts.map((roommate) => {
                  return (


                    <Segment padded='very'>

                      <Grid columns={3}>
                        <Grid.Row>
                          <Grid.Column width={4}>
                            <Image
                              src='https://image.flaticon.com/icons/svg/168/168724.svg'
                              wrapped size='medium'
                            />
                          </Grid.Column>
                          <Grid.Column width={6}>

                            <Header as='h3' dividing> {roommate.first_name} {roommate.last_name} </Header>
                            <Header.Subheader>Needs a <strong>{roommate.budget}</strong> room in <strong>{roommate.city}</strong></Header.Subheader>

                            <Header.Subheader><strong>Occupation: </strong>{roommate.occupation || ''}</Header.Subheader>
                            <Header.Subheader><strong>Gender: </strong>   {roommate.gender || ' N/A'}</Header.Subheader>
                            <Header.Subheader><strong>Age: </strong> {roommate.age || ' N/A'}</Header.Subheader>
                            <Header.Subheader><strong>Prefered Room Type: </strong>{roommate.room_type_required || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>MovedIn date: </strong>{roommate.moved_in_date || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>Lease Term: </strong>{roommate.lease_duration || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>Sharing Bathroom: </strong>{roommate.ok_with_shaing_bathroom || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>Party Friendly: </strong>{roommate.party_friendly || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>Pet Friendly: </strong>{roommate.pet_friendly || "Not Answered"}</Header.Subheader>
                            <Header.Subheader><strong>Smoking Friendly: </strong>{roommate.smoking_friendly || "Not Answered"}</Header.Subheader>
                          </Grid.Column>

                          <Grid.Column width={4}>
                            <Grid.Row>
                              <Button floated='right' color='red' onClick={async () => { await this.setState({ roommateToDelete: roommate._id }); this.deleteRoommate() }}>Delete Post</Button>
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
                        <Icon name="user" circular />
                        <Header.Content>No Posted Roommates</Header.Content>
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
