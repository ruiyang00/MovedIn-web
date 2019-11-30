import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Divider,Header,Select,Segment,Dropdown, Modal,Button, Form,Grid, Card, Message,Icon,Popup,Tab,Input,Image} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import * as moment from 'moment';
import {connect} from 'react-redux';
import HomeLogo from './../images/home #30C5FF.png';

export default class userPosts extends Component{

  constructor(props){
    super(props);
    this.state={
      roommatePosts:[],
      roommateToDelete:'',
};
  }

  componentDidMount(){
    axios.get('http://localhost:5000/roommates/getroommatepost',
    {
          headers: {
            'Authorization': localStorage.getItem('token')
          }})
      .then(function(response){
           console.log(response);
           this.setState({
           roommatePosts:response.data.allRoommates,
         })

    }.bind(this));
}

    deleteRoommate(){

      axios.delete('http://localhost:5000/roommates/deletetheroommate',
      {
            headers: {
              'Authorization': localStorage.getItem('token'),
              "roommate_id": this.state.roommateToDelete
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

        <h1>My Roommate Posts</h1>

        <Link to='./userProfile'>
        <Button color='pink'>Post A New Roommate</Button>
        </Link>

        <p></p>
        <Divider horizontal></Divider>


      <Card.Group itemsPerRow={4} style={{marginLeft:"6.5em"}}>
       { this.state.roommatePosts ?
       this.state.roommatePosts.map((roommate)=>{
           return(


             <Segment padded ='very'>

                   <Grid columns={3}>
                   <Grid.Row>

                       <Grid.Column width={4}>
                       <Image
                        src='https://image.flaticon.com/icons/svg/168/168724.svg'
                        wrapped size='medium'
                               />
                       </Grid.Column>



                       <Grid.Column width={6}>
																<Header as='h2'>
																	{roommate.first_name}, {roommate.last_name}
																</Header>

                                <Header as = 'h3'>
                                <div>
                                <Icon name='building' />
																{roommate.city}
                                <Icon name='briefcase' />
                                {roommate.occupation}
                                </div>
                                <div>
                                <Icon name='history'/>
                                {roommate.age || ' N/A'}
                                <Icon name='transgender' />
                                {roommate.gender || ' N/A'}
                                </div>

                                <div>
                                <Icon name="book" />
                                {roommate.major || ' N/A'}
                                <Icon name="graduation cap" />
                                {roommate.school || ' N/A'}
                                </div>
                                </Header>


                                <Header></Header>




                                <Header as='h4'>
                                <p>
                                <Icon name="money" />
                                <i>Budget:</i> {roommate.budget || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="calendar" />
                                <i>Lease Term:</i> {roommate.lease_duration || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="bullhorn" />
                                <i>Moved-In Month:</i> {roommate.moved_in_date || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="bed" />
                                <i>RoomType Required:</i> {roommate.room_type_required || "Not Answered"}
                                </p>
																</Header>
                                </Grid.Column>

                                <Grid.Column width={6}>
                                <Header as='h4'>
                                <p>
                                <Icon name="users" />
                                <i>SharedBath:</i> {roommate.ok_with_shaing_bathroom || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="game" />
                                <i>Party Friendly:</i> {roommate.party_friendly || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="paw" />
                                <i>Pet Friendly:</i> {roommate.pet_friendly || "Not Answered"}
                                </p>
                                <p>
                                <Icon name="thumbs up" />
                                <i>Smoking Friendly:</i> {roommate.smoking_friendly || "Not Answered"}
                                </p>
                                <p></p>
                                <Grid.Row></Grid.Row>
                                <Grid.Row>

                                <Button color='red' onClick={async()=>{await this.setState({roommateToDelete:roommate._id});this.deleteRoommate()}}>Delete Post</Button>
                                </Grid.Row>
																</Header>

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
      </div>
    )




}
}
