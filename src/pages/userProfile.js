import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {Progress,Select,Dropdown, Button, Form,Grid, Card, Message,Icon,Popup,Tab,Input} from 'semantic-ui-react';
import * as ROUTES from "./../logistics/routes";
import axios from 'axios';
import * as moment from 'moment';
import {connect} from 'react-redux';

const backgroundStyle = {
  //width: "100%",
  height: "180vh",
  backgroundImage: `url(https://i.ibb.co/72fb7sj/living-room-2569325-1920.jpg)`,
  backgroundRepeat: "null",
  backgroundSize: 'cover',
  overflow: 'hidden',
};


var oneMonthFromNow=moment().add(1, 'months').format('MMMM-YYYY');

class UserProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      city:'',
      budget:'$500-700',
      moved_in_date:oneMonthFromNow,
      lease_duration:' <12months',
      first_name:'',
      last_name:'',
      occupation:'',
      school:'',
      major:'',
      year_in_school:'',
      gender:'',
      age:'',
      room_type_required:'',
      parking_needed:'',
      ok_with_shaing_bathroom:'',
      pet_friendly:'',
      smoking_friendly:'',
      party_friendly:'',
      percent:0,
      value:'0',
      loaded:'',



    };
    this.onSubmit=this.onSubmit.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleGeneralInfoChange=this.handleGeneralInfoChange.bind(this);
    this.handlePersonalInfoChange=this.handlePersonalInfoChange.bind(this);
    this.handleRoomPreChangeANDSumbitAll=this.handleRoomPreChangeANDSumbitAll.bind(this);
    this.incrementOne=this.incrementOne.bind(this);
    this.incrementTwo=this.incrementTwo.bind(this);
    this.incrementThree=this.incrementThree.bind(this);
  }



   incrementOne=()=>{
     this.setState({
       percent:27,
     });
}
  incrementTwo=()=>{
    this.setState({
       percent:67,
    });
  }

   incrementThree=()=>{
     this.setState({
       percent:100,
     })
   }


handleGeneralInfoChange=()=>{
          this.incrementOne();
          this.setState({
             budget:document.getElementById('budget').innerText,
             moved_in_date:document.getElementById('moved_in_date').innerText,
             lease_duration:document.getElementById('lease_duration').innerText
      });

      }


  handleInputChange = (event) => {
    const {value,name}=event.target;
    this.setState({
      [name]:value
    });
  }



handlePersonalInfoChange=()=>{
  this.incrementTwo();
  this.setState({
     gender:document.getElementById('gender').innerText,
     age:document.getElementById('age').innerText,
     year_in_school:document.getElementById('year_in_school').innerText
  });
}

handleRoomPreChangeANDSumbitAll=()=>{
  this.incrementThree();

  this.setState({
      parking_needed:document.getElementById('parking').innerText,
      ok_with_shaing_bathroom:document.getElementById('ok_with_shaing_bathroom').innerText,
      pet_friendly:document.getElementById('pet_friendly').innerText,
      smoking_friendly:document.getElementById('smoking').innerText,
      party_friendly:document.getElementById('party').innerText,
      room_type_required:document.getElementById('room_type_required').innerText,
  });
  var token=localStorage.getItem('token');
let headerContent={
  'Content-Type':'application/json',
  'Authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNb3ZlZEluIiwic3ViIjoiNWRkZGY5ZDI1YTc0NDAyZGYyOTFkZmIwIiwiaWF0IjoxNTc0ODk2NzA3MDM5LCJleHAiOjE1NzQ5ODMxMDcwMzl9.9OTUTVBZd4xc2HVnT0Ls6qZNIQ9_JNge7NLd8RuQcg8",
};
let headers={
  headers:headerContent
  };



var postData={
  first_name:this.state.first_name,
  last_name:this.state.last_name,
  city:this.state.city,
  occupation:this.state.occupation,
  school:this.state.school,
  major:this.state.major,
  year_in_school:this.state.year_in_school,
  gender:this.state.gender,
  age:this.state.age,
  budget:this.state.budget,
  room_type_required:this.state.room_type_required,
  parking_needed:this.state.parking_needed,
  move_in_date:this.state.move_in_date,
  lease_duration:this.state.lease_duration,
  ok_with_shaing_bathroom:this.state.ok_with_shaing_bathroom,
  pet_friendly:this.state.pet_friendly,
  smoking_friendly:this.state.smoking_friendly,
  party_friendly:this.state.party_friendly,
  token:localStorage.getItem('token'),

};

// let h= new Headers();
// h.append('Authorization','Bearer '+token);
// let req= new Request('http://localhost:5000/roommates/creatroommate',{
//   method:"POST",
//   mode:'cors',
//   body:postData,
//   headers:h,
//   credentials:'include'
//
// });
// console.log(req.headers.authorization);
// fetch(req)
// .then(res=>{console.log(res)})
// .catch(error=>{console.log(error)})
axios.post('http://localhost:5000/roommates/creatroommate',postData,{headers:{'Authorization':token }})
.then(function(response){
     console.log(response);

}).
catch(function(error){
  console.log(error);
});


}







 async onSubmit(formData){
  // event.preventDefault();


     console.log('submitted');

}



     render(){

       var budget='';
       var oldBudget='';
       var moved_in_date='';
       var oldmoved_in_date='';
       var lease_duration= '';
       var oldlease_duration='';
       var gender ='';
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
       const budgetOptions=[
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
       const lease_durationOptions=[
         {key:'>=12 months', text:'>=12 months', value: '>=12 months'},
         {key:'<12months', text:'<12months', value: '<12months'},
         {key:'< OR >= 12 months', text:'< OR >= 12 months', value: '< OR >= 12 months'}
       ]

       const genderOptions=[
           {key:'Male',text:'Male',value:'Male'},
           {key:'Female',text:'Female',value:'Female'},
           {key:'Other',text:'Other',value:'Other'},


       ]
       const ageOptions=[
          {key:'0-18 years old',text:'0-18 years old',value:'0-18 years old'},
          {key:'18-30 years old',text:'18-30 years old',value:'18-30 years old'},
          {key:'30-40 years old',text:'30-40 years old',value:'30-40 years old'},
          {key:'40-50 years old',text:'40-50 years old',value:'40-50 years old'},
          {key:'50-60 years old',text:'50-60 years old',value:'50-60 years old'},




       ]

       const yearInSchoolOptions=[
          {key:'Fresheman',text:'Fresheman',value:'Fresheman'},
          {key:'Sophomore',text:'Sophomore',value:'Sophomore'},
          {key:'Junior',text:'Junior',value:'Junior'},
          {key:'Senior',text:'Senior',value:'Senior'},
          {key:'Graduate Student',text:'Graduate Student',value:'Graduate Student'},
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
          {menuItem:'General Info',render:()=> <Tab.Pane>

          <Form as='form'>



                 <Icon name="building" size="large"/><font size="+0.5"><i>City</i></font>
                  <p></p>
                <Popup
                trigger={
                 <Form.Input
                 width={10}
                 type="text"
                 placeholder="Where do you Plan to Rent"
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


                  <Icon name="dollar" size="large"/><font size="+0.5"><i>Budget</i></font>
                   <p></p>
                  <Form.Select
                  onOpen={()=>{oldBudget=document.getElementById('budget').innerText;}}
                  onClose={()=>{this.forceUpdate(); budget=document.getElementById('budget').innerText;}}
                  id="budget"
                  search
                  selection
                  width={10}
                  defaultValue={this.state.budget}
                  options={budgetOptions}
                  name="budget"
                  required
                  >
                   </Form.Select>


                   <Icon name="bullhorn" size="large"/><font size="+0.5"><i>Month to Move In</i></font>
                    <p></p>
                    <Popup
                      trigger={
                   <Form.Select
                   onOpen={()=>{oldmoved_in_date=document.getElementById('moved_in_date').innerText;}}
                   onClose={()=>{this.forceUpdate();moved_in_date=document.getElementById('moved_in_date').innerText}}
                   id='moved_in_date'
                   selection
                   search
                   defaultValue={this.state.moved_in_date}
                   options={whenToMovedInOptions}
                   width={10}
                   name="moved_in_date"
                   required
                   >
                    </Form.Select>
                  }
                  content ="We only match you with MovedIn partners within the next 6 Months"
                  on='focus'
                  position='right center'
                  />

                   <Icon name="calendar alternate" size="large"/><font size="+0.5"><i>Lease Term</i></font>
                    <p></p>

                    <Form.Select
                    onOpen={()=>{oldlease_duration=document.getElementById('lease_duration').innerText;}}
                    onClose={()=>{this.forceUpdate();lease_duration=document.getElementById('lease_duration').innerText}}
                    id="lease_duration"
                    selection
                    search
                    defaultValue={this.state.lease_duration}
                    options={lease_durationOptions}
                    width={10}
                    name="lease_duration"
                    required
                    >
                     </Form.Select>
                     <Button color='olive'  disabled={partOneNotComplete} attached size="large" animated onClick={this.handleGeneralInfoChange}>
                        <Button.Content visible>SAVE</Button.Content>
                        <Button.Content hidden>
                           <Icon name="paper plane" size="large" />
                        </Button.Content>

                     </Button>

       </Form>



          </Tab.Pane>},




         {menuItem:'Personal Info',render:()=> <Tab.Pane>

         <Form>



              <Icon name="user circle" size="large"/><font size="+0.5"><i>First Name</i></font>
               <p></p>
               <Popup
               trigger={
              <Form.Input
              width={10}
              placeholder="Your First Name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChange}
              required
              >
               </Form.Input>}
             content="Needs to be less than 15 characters"
             on='focus'
             position="right center"
               />


               <Icon name="user circle outline" size="large"/><font size="+0.5"><i>Last Name</i></font>
                <p></p>
                <Popup
                trigger={
               <Form.Input
               id="last_name"
               width={10}
               placeholder="Your Last Name"
               name="last_name"
               value={this.state.last_name}
               onChange={this.handleInputChange}
               required
               >
                </Form.Input>}
                content="Needs to be less than 15 characters"
                on='focus'
                position="right center"

                />

                <Icon name="briefcase" size="large"/><font size="+0.5"><i>Occupation</i></font>
                 <p></p>
                 <Popup
                 trigger={
                <Form.Input
                id="occupation"
                width={10}
                placeholder="Your Occupation"
                name="occupation"
                value={this.state.occupation}
                onChange={this.handleInputChange}
                required
                >
                 </Form.Input>
               }
               content="Needs to be less than 15 characters"
               on='focus'
               position="right center"

               />

               <Icon name="student" size="large"/><font size="+0.5"><i>School</i></font>
                <p></p>
                <Popup
                trigger={
               <Form.Input
               id="school"
               width={10}
               placeholder="Your school name"
               name="school"
               value={this.state.school}
               onChange={this.handleInputChange}
               >
                </Form.Input>
              }
              content="Needs to be less than 30 characters"
              on='focus'
              position="right center"

              />

              <Icon name="book" size="large"/><font size="+0.5"><i>Major</i></font>
               <p></p>
               <Popup
               trigger={
              <Form.Input
              id="major"
              width={10}
              placeholder="Your Major"
              name="major"
              value={this.state.major}
              onChange={this.handleInputChange}
              >
               </Form.Input>
             }
             content="Needs to be less than 30 characters"
             on='focus'
             position="right center"

             />

             <Icon name="history" size="large"/><font size="+0.5"><i>Year In School</i></font>
              <p></p>

             <Form.Select
             clearable
             onClose={()=>{this.forceUpdate()}}
             id='year_in_school'
             selection
             defaultValue={this.state.year_in_school}
             options={yearInSchoolOptions}
             width={10}
             name="year_in_school"
             required
             >
              </Form.Select>







                <Icon name="transgender" size="large"/><font size="+0.5"><i>Gender</i></font>
                 <p></p>

                <Form.Select
                clearable
                onClose={()=>{this.forceUpdate();gender=document.getElementById('gender').innerText}}
                id='gender'
                selection
                defaultValue={this.state.gender}
                options={genderOptions}
                width={10}
                name="gender"
                required
                >
                 </Form.Select>


                <Icon name="clock" size="large"/><font size="+0.5"><i>Age</i></font>
                 <p></p>

                 <Form.Select
                 clearable
                 onClose={()=>{this.forceUpdate();age=document.getElementById('age').innerText}}
                 id="age"
                 selection
                 search
                 defaultValue={this.state.age}
                 options={ageOptions}
                 width={10}
                 name="age"
                 required
                 >

                  </Form.Select>

 <p></p>

 <Button size="large" color="olive" disabled={partOneNotComplete ||  partTwoNotComplete} fluid animated onClick={this.handlePersonalInfoChange}>
   <Button.Content visible>SAVE</Button.Content>
   <Button.Content hidden>
      <Icon name="paper plane" size="large" />
   </Button.Content>

</Button>
         </Form>









          </Tab.Pane>},
          {menuItem:'Rental Preferences',render:()=> <Tab.Pane>


          <Form onSubmit={this.onSubmit}>



               <Icon name="bed" size="large"/><font size="+0.5"><i>Room Type</i></font>
                <p></p>
               <Form.Select
               clearable
               onClose={()=>{this.forceUpdate()}}
               width={10}
               id="room_type_required"
               selection
               search
               name="room_type_required"
               defaultValue={this.state.room_type_required}
               options={roomTypeOptions}
               required
               >
                </Form.Select>


                <Icon name="car" size="large"/><font size="+0.5"><i>Parking Available</i></font>
                 <p></p>
                <Form.Select
                clearable
                onClose={()=>{this.forceUpdate()}}
                id="parking"
                selection
                search
                width={10}
                name="parking"
                defaultValue={this.state.parking_needed}
                options={booleanOptions}
                required
                >
                 </Form.Select>



                 <Icon name="users" size="large"/><font size="+0.5"><i>Shared Bathroom</i></font>
                  <p></p>

                 <Form.Select
                 clearable
                 onClose={()=>{this.forceUpdate()}}
                 id='ok_with_shaing_bathroom'
                 selection
                 search
                 options={booleanOptions}
                 defaultValue={this.state.ok_with_shaing_bathroom}
                 width={10}
                 name="ok_with_shaing_bathroom"
                 required
                 >
                  </Form.Select>


                 <Icon name="paw" size="large"/><font size="+0.5"><i>Pets Friendly</i></font>
                  <p></p>

                  <Form.Select
                  clearable
                  onClose={()=>{this.forceUpdate()}}
                  id="pet_friendly"
                  selection
                  search
                  defaultValue={this.state.pet_friendly}
                  options={booleanOptions}
                  width={10}
                  name="pet_friendly"
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
                    defaultValue={this.state.party_friendly}
                    width={10}
                    name="age"
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
                      defaultValue={this.state.smoking_friendly}
                      width={10}
                      name="age"
                      required
                      >
                       </Form.Select>

                       <p></p>

                       <Button size="large" color="olive" disabled={partOneNotComplete ||  partTwoNotComplete} fluid animated onClick={this.handleRoomPreChangeANDSumbitAll}>
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
             this.state.city.length > 15;

             const partTwoNotComplete =
             this.state.first_name=== '' ||
             this.state.first_name.length >15 ||
             this.state.last_name=== '' ||
             this.state.last_name.length >15 ||
             this.state.occupation=== '' ||
             this.state.occupation.length >15 ||
             this.state.school.length > 30 ||
             this.state.major.length >  20
             ;





        return(
          <div style={backgroundStyle}>


          <Grid>


            <p></p><p></p><p></p>
            <Grid.Row></Grid.Row> <Grid.Row></Grid.Row><Grid.Row></Grid.Row>

      <Grid.Row columns={8}>
           <Grid.Column width={4}></Grid.Column>
           <Grid.Column width={8}>
               <Message attached>

            <Icon name="edit outline" size="big" color="yellow" />
           <font size="+2.5"><b><i>We Are Trying to Personalize This for YOU</i></b></font>
           <p>* <b>Full Name, Location & Occupation</b> are REQUIRED to Continue,and we encourage you to fill
           out as much Info as possible to Optimize your Recommendation results</p>
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

export default connect(mapStateToProps,null)(UserProfile)
