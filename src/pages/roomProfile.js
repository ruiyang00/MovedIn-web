import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Progress,Select,Dropdown, Button, Form,Grid, Card, Message,Icon,Popup,Tab,Input} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import * as moment from 'moment';
import {connect} from 'react-redux';

var oneMonthFromNow=moment().add(1, 'months').format('MMMM-YYYY');

const backgroundStyle = {
  //width: "100%",
  height: "120vh",
  backgroundImage: `url(https://i.ibb.co/jw6nvh1/living-room-2732939-1920.jpg)`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};

class RoomProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      city:'',
      room_type:'Single Room',
      price:0,
      price_range:'$500-700',
      move_in_date:oneMonthFromNow,
      min_lease_duration:' <12months',

      utility_include:'',
      cooking:'',
      parking:'',
      furniture:'',
      bathroom:'',
      closet:'',

      gender_prefered:'',
      pet:'',
      party:'',
      kidsFriendly:'',
      smoking:'',

      percent:0,



    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleBasicInfoChange=this.handleBasicInfoChange.bind(this);
    this.handleExtraInfoChange=this.handleExtraInfoChange.bind(this);
    this.handleRoomPreChangeANDSumbitAll=this.handleRoomPreChangeANDSumbitAll.bind(this);
    this.incrementOne=this.incrementOne.bind(this);
    this.incrementTwo=this.incrementTwo.bind(this);
    this.incrementThree=this.incrementThree.bind(this);
  }



   incrementOne=()=>{
     this.setState({
       percent:35,
     });
}
  incrementTwo=()=>{
    this.setState({
       percent:70,
    });
  }

   incrementThree=()=>{
     this.setState({
       percent:100,
     })
   }


handleBasicInfoChange=()=>{
          this.incrementOne();
          this.setState({
             room_type:document.getElementById('room_type').innerText,
             price_range:document.getElementById('price_range').innerText,
             move_in_date:document.getElementById('move_in_date').innerText,
             min_lease_duration:document.getElementById('min_lease_duration').innerText
      });

      }


  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }



handleExtraInfoChange=()=>{
  this.incrementTwo();
  this.setState({
     utility_include:document.getElementById('utility_include').innerText,
     cooking:document.getElementById('cooking').innerText,
     parking:document.getElementById('parking').innerText,
     furniture:document.getElementById('furniture').innerText,
     bathroom:document.getElementById('bathroom').innerText,
  });
}

handleRoomPreChangeANDSumbitAll=()=>{
  this.incrementThree();

  this.setState({
      gender_prefered:document.getElementById('gender_prefered').innerText,
      pet:document.getElementById('pet').innerText,
      smoking:document.getElementById('smoking').innerText,
      party:document.getElementById('party').innerText,
      kidsFriendly:document.getElementById('kids').innerText
  });

  //axios submit, toUpperCase()


}

  // printSelectedIndex(){
  //   document.getElementById("budget").value="$100-300";
  // }





 async onSubmit(formData){
  // event.preventDefault();


     console.log('submitted');

}



     render(){

       var budget='';
       var oldBudget='';
       var move_in_date='';
       var oldmove_in_date='';
       var min_lease_duration= '';
       var oldmin_lease_duration='';
       var gender_prefered ='';
       var age='';

       var currentMonthYear=moment().format("MMMM-YYYY");
       var oneMonthFromNow=moment().add(1, 'months').format('MMMM-YYYY');
       var twoMonthFromNow=moment().add(2, 'months').format('MMMM-YYYY');
       var threeMonthFromNow=moment().add(3, 'months').format('MMMM-YYYY');
       var fourMonthFromNow=moment().add(4, 'months').format('MMMM-YYYY');
       var fiveMonthFromNow=moment().add(5, 'months').format('MMMM-YYYY');
       var sixMonthFromNow=moment().add(6, 'months').format('MMMM-YYYY');
       console.log(sixMonthFromNow);
       const whenToMovedInOptions=[
         {key:currentMonthYear, text:currentMonthYear, value: currentMonthYear},
         {key:oneMonthFromNow, text:oneMonthFromNow, value: oneMonthFromNow},
         {key:twoMonthFromNow, text:twoMonthFromNow, value: twoMonthFromNow},
         {key:threeMonthFromNow, text:threeMonthFromNow, value: threeMonthFromNow},
         {key:fourMonthFromNow, text:fourMonthFromNow, value: fourMonthFromNow},
         {key:fiveMonthFromNow, text:fiveMonthFromNow, value: fiveMonthFromNow},
         {key:sixMonthFromNow, text:sixMonthFromNow, value: sixMonthFromNow},

       ]
       const priceRangeOptions=[
         {key:'$0-100',text:'$0-100',value:'$0-100'},
         {key:'$100-300',text:'$100-300',value:'$100-300'},
         {key:'$300-500',text:'$300-500',value:'$300-500'},
         {key:'$500-700',text:'$500-700',value:'$500-700'},
         {key:'$700-900',text:'$700-900',value:'$700-900'},
         {key:'$900-1100',text:'$900-1100',value:'$900-1100'},
         {key:'$1100-1300',text:'$1100-1300',value:'$1100-1300'},
         {key:'$1300-1500',text:'$1300-1500',value:'$1300-1500'},
         {key:'$1500-1700',text:'$1500-1700',value:'$1500-1700'},
         {key:'$1700-1900',text:'$1700-1900',value:'$1700-1900'},
         {key:'$1900-2100',text:'$1900-2100',value:'$1900-2100'},
         {key:'$2100-2300',text:'$2100-2300',value:'$2100-2300'},
         {key:'$2300-2500',text:'$2300-2500',value:'$2300-2500'},




       ]
       const leaseTermOptions=[
         {key:'>=12 months', text:'>=12 months', value: '>=12 months'},
         {key:'<12months', text:'<12months', value: '<12months'},
         {key:'< OR >= 12 months', text:'< OR >= 12 months', value: '< OR >= 12 months'}
       ]

       const genderOptions=[
           {key:'Male',text:'Male',value:'Male'},
           {key:'Female',text:'Female',value:'Female'},
           {key:'Other',text:'Other',value:'Other'},


       ]

       const roomTypeOptions=[
         {key:'Single Room',text:'Single Room',value:'Single Room'},
         {key:'Double Room',text:'Double Room',value:'Double Room'},
         {key:'Multiperson Room',text:'Multiperson Room',value:'Multiperson Room'}
       ]

       const booleanOptions=[
         {key:'Yes',text:'Yes',value:'Yes'},
         {key:'No',text:'No',value:'No'},

       ]



       const panes =[
          {menuItem:'Basic Information',render:()=> <Tab.Pane>

          <Form as='form'>



                 <Icon name="building" size="large"/><font size="+0.5"><i>City</i></font>
                  <p></p>
                <Popup
                trigger={
                 <Form.Input
                 width={10}
                 type="text"
                 placeholder="Where is your Property located?"
                 name="city"
                 value={this.state.city}
                 onChange={this.handleInputChange}
                 required>
                 </Form.Input>
                  }
                  content="Need to be less than 15 characters"
                  on='focus'
                  position="right center"

                 />


                  <Icon name="bed" size="large"/><font size="+0.5"><i>Room Type</i></font>
                   <p></p>
                  <Form.Select
                  onClose={()=>{this.forceUpdate();}}
                  id="room_type"
                  search
                  selection
                  width={10}
                  defaultValue={this.state.room_type}
                  options={roomTypeOptions}
                  name="room_type"
                  required
                  >
                   </Form.Select>


                   <Icon name="dollar" size="large"/><font size="+0.5"><i>Price Range</i></font>
                    <p></p>
                   <Form.Select
                   onClose={()=>{this.forceUpdate();}}
                   id="price_range"
                   search
                   selection
                   width={10}
                   defaultValue={this.state.price_range}
                   options={priceRangeOptions}
                   name="price_range"
                   required
                   >
                    </Form.Select>

                    <Icon name="money" size="large"/><font size="+0.5"><i>Price</i></font>
                     <p></p>
                   <Popup
                   trigger={
                    <Form.Input
                    width={10}
                    type="text"
                    placeholder="How much is your Expected Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    required>
                    </Form.Input>
                     }
                     content="You must enter an number >10 here"
                     on='focus'
                     position="right center"

                    />







                   <Icon name="bullhorn" size="large"/><font size="+0.5"><i>Available Month for Move In</i></font>
                    <p></p>
                    <Popup
                      trigger={
                   <Form.Select
                   onClose={()=>{this.forceUpdate();}}
                   id='move_in_date'
                   selection
                   search
                   defaultValue={this.state.move_in_date}
                   options={whenToMovedInOptions}
                   width={10}
                   name="move_in_date"
                   required
                   >
                    </Form.Select>
                  }
                  content ="We only allow you to Post Rooms Available within the next 6 Months"
                  on='focus'
                  position='right center'
                  />

                   <Icon name="calendar alternate" size="large"/><font size="+0.5"><i>Lease Term</i></font>
                    <p></p>

                    <Form.Select
                    onClose={()=>{this.forceUpdate();}}
                    id="min_lease_duration"
                    selection
                    search
                    defaultValue={this.state.min_lease_duration}
                    options={leaseTermOptions}
                    width={10}
                    name="min_lease_duration"
                    required
                    >
                     </Form.Select>
                     <Button color='olive'  disabled={partOneNotComplete} attached size="large" animated onClick={this.handleBasicInfoChange}>
                        <Button.Content visible>SAVE</Button.Content>
                        <Button.Content hidden>
                           <Icon name="paper plane" size="large" />
                        </Button.Content>

                     </Button>

       </Form>



          </Tab.Pane>},




         {menuItem:'Extra About the Room',render:()=> <Tab.Pane>

         <Form>



              <Icon name="plug" size="large"/><font size="+0.5"><i>Utility Included</i></font>
               <p></p>
              <Form.Select
              clearable
              selection
              id="utility_include"
              onClose={()=>{this.forceUpdate()}}
              defaultValue={this.state.utility_include}
              options={booleanOptions}
              width={10}
              name="firstName"
              required
              >
               </Form.Select>


                <Icon name="tint" size="large"/><font size="+0.5"><i>Cooking Allowed</i></font>
                 <p></p>

                <Form.Select
                clearable
                onClose={()=>{this.forceUpdate()}}
                id='cooking'
                selection
                defaultValue={this.state.cooking}
                options={booleanOptions}
                width={10}
                name="cooking"
                required
                />


                 <Icon name="car" size="large"/><font size="+0.5"><i>Parking Available</i></font>
                  <p></p>

                 <Form.Select
                 clearable
                 onClose={()=>{this.forceUpdate()}}
                 id='parking'
                 selection
                 defaultValue={this.state.parking}
                 options={booleanOptions}
                 width={10}
                 name="parking"
                 required
                 >
                  </Form.Select>


                  <Icon name="thumbs up" size="large"/><font size="+0.5"><i>Furniture Available</i></font>
                   <p></p>

                  <Form.Select
                  clearable
                  onClose={()=>{this.forceUpdate()}}
                  id='furniture'
                  selection
                  defaultValue={this.state.furniture}
                  options={booleanOptions}
                  width={10}
                  name="furniture"
                  required
                  >
                   </Form.Select>

                   <Icon name="bath" size="large"/><font size="+0.5"><i>Share Bathroom</i></font>
                    <p></p>

                   <Form.Select
                   clearable
                   onClose={()=>{this.forceUpdate()}}
                   id='bathroom'
                   selection
                   defaultValue={this.state.bathroom}
                   options={booleanOptions}
                   width={10}
                   name="bathroom"
                   required
                   >
                    </Form.Select>


 <Button size="large" color="olive" disabled={partOneNotComplete} fluid animated onClick={this.handleExtraInfoChange}>
   <Button.Content visible>SAVE</Button.Content>
   <Button.Content hidden>
      <Icon name="paper plane" size="large" />
   </Button.Content>

</Button>
         </Form>









          </Tab.Pane>},
          {menuItem:'Room Preferences',render:()=> <Tab.Pane>


          <Form onSubmit={this.onSubmit}>



                <Icon name="transgender" size="large"/><font size="+0.5"><i>Gender Preferrred</i></font>
                 <p></p>
                <Form.Select
                clearable
                onClose={()=>{this.forceUpdate()}}
                id="gender_prefered"
                selection
                search
                width={10}
                name="gender_prefered"
                defaultValue={this.state.gender}
                options={booleanOptions}
                required
                >
                 </Form.Select>


                 <Icon name="paw" size="large"/><font size="+0.5"><i>Pets Friendly</i></font>
                  <p></p>

                  <Form.Select
                  clearable
                  onClose={()=>{this.forceUpdate()}}
                  id="pet"
                  selection
                  search
                  defaultValue={this.state.pet}
                  options={booleanOptions}
                  width={10}
                  name="pet"
                  required
                  >
                   </Form.Select>

                   <Icon name="game" size="large"/><font size="+0.5"><i>Party Friendly</i></font>
                    <p></p>

                    <Form.Select
                    clearable
                    onClose={()=>{this.forceUpdate()}}
                    id="party"
                    selection
                    search
                    options={booleanOptions}
                    defaultValue={this.state.party}
                    width={10}
                    name="party"
                    required
                    >
                     </Form.Select>

                     <Icon name="flag" size="large"/><font size="+0.5"><i>Kids Friendly</i></font>
                      <p></p>
                     <Form.Select
                     clearable
                     onClose={()=>{this.forceUpdate()}}
                     id="kids"
                     selection
                     search
                     options={booleanOptions}
                     defaultValue={this.state.kidsFriendly}
                     width={10}
                     name="kids"
                     required
                     >
                      </Form.Select>



                     <Icon name="thumbs up" size="large"/><font size="+0.5"><i>Smoking Friendly</i></font>
                      <p></p>

                      <Form.Select
                      clearable
                      onClose={()=>{this.forceUpdate()}}
                      id="smoking"
                      selection
                      search
                      options={booleanOptions}
                      defaultValue={this.state.smoking}
                      width={10}
                      name="smoking"
                      required
                      >
                       </Form.Select>






                       <p></p>

                       <Button size="large" color="olive" disabled={partOneNotComplete} fluid animated onClick={this.handleRoomPreChangeANDSumbitAll}>
                         <Button.Content visible>SAVE & SUBMIT</Button.Content>
                         <Button.Content hidden>
                            <Icon name="paper plane" size="large" />
                         </Button.Content>

                       </Button>

          </Form>




          </Tab.Pane>},
            ]

            const partOneNotComplete =
             this.state.city === "" ||
             this.state.city.length > 15 ||
             this.state.price === 0 ||
             this.state.price == "" ||
             this.state.price <= 10 ||
             isNaN(this.state.price) || this.state.price.toString().charAt(0) === '0';

            //
            //  const partTwoNotComplete =
            //  this.state.firstName=== '' ||
            //  this.state.firstName.length >15 ||
            //  this.state.lastName=== '' ||
            //  this.state.lastName.length >15 ||
            //  this.state.occupation=== '' ||
            //  this.state.occupation.length >15 ;





        return(
          <div style={backgroundStyle}>
       <Grid>


            <p></p><p></p><p></p>
            <Grid.Row></Grid.Row><Grid.Row></Grid.Row><Grid.Row></Grid.Row>

      <Grid.Row columns={8}>
           <Grid.Column width={4}></Grid.Column>
           <Grid.Column width={8}>
               <Message attached>

            <Icon name="edit outline" size="big" color="yellow" />
           <font size="+2.5"><b><i>We Want to Help Your Room Stand Out</i></b></font>
           <p>* <b>Location & Price</b>  are REQUIRED to continue, and we encourage you to fill
           out as much Info as possible to Optimize our Room Recommendation decisions</p>
          <p>* Please Make sure to SAVE before proceed,otherwise you will lose your data entered*</p>

             <p></p>

           <Tab panes={panes} />
           <p></p>
             <Progress size="large" color="green"  percent={this.state.percent} progress />
           </Message>
           </Grid.Column>

      </Grid.Row>



        </Grid>
        </div>


        );
     }

}


function mapStateToProps(state){
  return {
    isAuth:state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps,null)(RoomProfile)
