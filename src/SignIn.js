import React, {useState} from 'react';
import './SignIn.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    if(!email){
      alert("Please enter your valid email")
    }
    
    if(!password){
      alert("Please enter Password")
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const loginuser={
      email:email,
      password:password
    }
    validateForm()
    
    axios.post('http://localhost:4040/app/login',loginuser,{withCredentials: true})
    
    .then(response =>{
      if(response.data.error==='Invalid credentials' || response.data.error==='User not found')
      {
        alert("Please enter correct credentials and details")
      }
      else{
        alert("Successfully Login")
        console.log(response.data)
        window.location = '/'
      }
      
    })
    .catch(error=>console.log(error))

    
  };


    

    return(
        
      <>
     
      <article>
      
          <img class="loginimg" src="https://www.oxatis.com/wp-content/uploads/2020/08/background-effect-CMA-6.png" alt=""></img>
          <h1 class="headtext">AA Shopping</h1>
          <form className='form' onSubmit={handleSubmit}>
          <h3>Sign In</h3>
              <div className='form-control'>
                  <label htmlFor="email">Email</label>
                  <input 
                   class="inputtext"
                  type='text' 
                  id='email' 
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}>

                  </input>
                </div>

                <div className='form-control'>
                  <label htmlFor="password">Password</label>
                  <input 
                   class="inputtext"
                  type='text'
                   id='password' 
                   name='password'
                   value={password}
              onChange={(e) => setPassword(e.target.value)}>

                   </input>
                </div>
                <button type="submit" class="submitbtn">Login</button>
              <Link to='/signup'>  <h5>Not yet Registered ? Click here </h5> </Link>
          </form>
         
      </article>
      </>
        
    )
}
export default SignIn