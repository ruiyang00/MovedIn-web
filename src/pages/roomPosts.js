import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Divider,Select,Header,Segment,Dropdown, Modal,Button, Form,Grid, Card, Message,Icon,Popup,Tab,Input,Image} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import * as moment from 'moment';
import {connect} from 'react-redux';
import HomeLogo from './../images/home #30C5FF.png';

export default class roomPosts extends Component{

  constructor(props){
    super(props);
    this.state={
      roomPosts:[],
      roomToDelete:''
};
  }

  componentDidMount(){

    axios.get('http://localhost:5000/rooms/getroompost',
    {
          headers: {
            'Authorization': localStorage.getItem('token')
          }})
      .then(function(response){
           console.log(response);
           this.setState({
           roomPosts:response.data.allRooms,
         })

    }.bind(this));




    }


    deleteRoom(){

      axios.delete('http://localhost:5000/rooms/deletetheroom',
      {
            headers: {
              'Authorization': localStorage.getItem('token'),
              "room_id": this.state.roomToDelete
            }})
        .then(function(response){
             console.log(response);

      }.bind(this));
      window.location.reload(true);

    }


  render(){
    return(
      <div>
        <Segment secondary style={{ marginTop: "4em", marginBottom:"0em",marginLeft:"0em"}}>


        <h3>View My</h3>
        <Button.Group>
        <Link to='./userPosts'>
        <Button onClick={()=>{this.forceUpdate()}} color="olive" size="small">Roommate Posts</Button>
        </Link>
        <Button.Or />
        <Link to='./roomPosts'>
        <Button onClick={()=>{this.forceUpdate()}} color="twitter"size="small">Room Posts</Button>
        </Link>
        </Button.Group>

        <h1>My Room Posts</h1>

        <Link to='./roomProfile'>
        <Button color='pink'>Post A New Room</Button>
        </Link>
        <p></p>
      <Divider horizontal></Divider>

      <Card.Group itemsPerRow={4} style={{marginLeft:"6.5em"}}>
       { this.state.roomPosts ?
       this.state.roomPosts.map((room)=>{
           return(
             <Segment padded ='very'>

                   <Grid columns={3}>
                   <Grid.Row>

                       <Grid.Column width={5}>
                       <Image
                        src={HomeLogo}
                        wrapped size='medium'
                               />
                       </Grid.Column>

                       <Grid.Column width={7}>
                                <Header as='h2'>
                                  {room.city}, ${room.price}
                                </Header>

                                <Header as = 'h3'>
                                <div>
                                <Icon name='bullhorn' />
                                <i>Move_In_Month:</i>{" "+room.move_in_date || " N/A"}
                                </div>
                                <div>
                                <Icon name='bed' />
                                {room.room_type || " N/A"}
                                </div>
                                <div>
                                <Icon name='history'/>
                                <i>Minimum Lease Duration:</i>{" "+room.min_lease_duration || ' N/A'}
                                </div>
                                </Header>

                                <Header as='h4'>
                                <p>
                                <Icon name="users" />
                                <i>Shared Bathroom:</i> {room.bathroom || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="tint" />
                                <i>Cooking Allowed:</i> {room.cooking || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="plug" />
                                <i>Utility Included:</i> {room.utility_include || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="thumbs up" />
                                <i>Furnished:</i> {room.furniture || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="transgender" />
                                <i>Gender Preferred:</i> {room.gender_preferred || "Not Answered"}
                                </p>
                                </Header>

                                <Header as='h4'>

                                </Header>

                              </Grid.Column>


                              <Grid.Column width={4}>
                                <Grid.Row>
        <Button color="red" onClick={async()=>{await this.setState({roomToDelete:room._id});this.deleteRoom()}}>Delete Post</Button>

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
      </div>
    )




}
}
