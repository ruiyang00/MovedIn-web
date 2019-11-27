import axios from 'axios';
import {
 AUTH_SIGN_UP,
 AUTH_SIGN_OUT,
 AUTH_SIGN_IN,
 AUTH_LINK_GOOGLE,
 AUTH_LINK_FACEBOOK,
 AUTH_UNLINK_GOOGLE,
 AUTH_UNLINK_FACEBOOK,
 AUTH_ERROR} from './types';

 export const signUp = data =>{

  return async dispatch=>{
    try{
    console.log("hello");
    var token=null;
    await axios.post('http://localhost:5000/users/signup',data)
      .then(function(response){
          if(response.data.token){
         token=response.data.token;}
        });

          if(token){
             console.log('token found,ready to signin');
             await axios.post ('http://localhost:5000/users/signin',data)
             .then(function(response){
             //  console.log(response);
                if(response.data.token){
                  console.log("token for signIn found");
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem('user',data.email);
                  localStorage.setItem('password',data.password);
                }});

             dispatch({
                 type: AUTH_SIGN_IN,

             });
                      }
         /////

  } catch (err){
    dispatch({
      type:AUTH_ERROR,
      payload:'Email is already in use'
    })
  }

};
}

export const signIn = data =>{

   return async dispatch=>{
      try{
        await axios.post ('http://localhost:5000/users/signin',data)
        .then(function(response){
         console.log(response);
           if(response.data.token){
             console.log("token found");
             localStorage.setItem("token", response.data.token);
             localStorage.setItem('user',data.email);
             localStorage.setItem('password',data.password);
           }});

        dispatch({
            type: AUTH_SIGN_IN,

        });
      }catch(err){
        dispatch({
        type:AUTH_ERROR,
        payload: 'Email and password combination is not valid'})
      }
};
}

export const checkAuth=()=>{
  return async dispatch =>{
     try{
     await axios.get('http://localhost:5000/users/secret');
     dispatch({
       type: AUTH_SIGN_IN

     });
     console.log('user is authenticated')
  } catch(err){
    console.log('error',err)
  }
};
}

export const signOut =() =>{
   return dispatch=>{
     dispatch({
       type: AUTH_SIGN_OUT
     })
   };

}
