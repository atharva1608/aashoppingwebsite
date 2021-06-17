import React, {useState} from 'react';
import './SignIn.css';
import axios from 'axios';


function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username,setUsername]=  useState("");
  const [mobilenumber, setMobileNumber] = useState("");

  function validateForm() {
    if(!username){
      alert("Please enter your name")
    }
    if(!email){
      alert("Please enter your valid email")
    }
    if(!mobilenumber){
      alert("Please enter your Mobile Number")
    }    
    if(!password || !confirmpassword){
      alert("Please enter Password")
    }
    if(password && confirmpassword && password!==confirmpassword){
      alert("Please Confirm your Password again")
    }


  };

  function handleSubmit(event) {
    event.preventDefault();
    const registered = {
      username: username,
      mobilenumber: mobilenumber,
      email: email,
      password: password,
      confirmpassword:  confirmpassword
    }
    validateForm()

    if(password && confirmpassword && password===confirmpassword){
    axios.post('http://localhost:4040/app/signup',registered)
    .then(response =>{
      if(response.data.error==='An account with this email already exists.')
      {
        alert("An account with this email already exists.")
      }
      else{
        alert("Welcome user!!! An email is sent for account verification")
        console.log(response.data)
        window.location='/signin'
      }
      
    })
    .catch(error=>console.log(error))
    } 
};
    

    return(
        
      <>
       
      <article class="signupimgtext">
          
          <img class="signupimg" src="https://cms-assets.tutsplus.com/uploads/users/2659/posts/26768/image/eCommerce%20website%20templates%20image.jpg" alt=""></img>
          <h1 class="headtext">AA Shopping</h1>
          <form className='form1' onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className='form-control'>
                  <label htmlFor="username">Full Name</label>
                  <input 
                  class="inputtext"
                  type='text' 
                  id='username' 
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}>

                  </input>
                </div>
                
                <div className='form-control'>
                  <label htmlFor="mobilenumber">Mobile Number</label>
                  <input
                   class="inputtext" 
                  type='text'
                   id='mobilenumber' 
                   name='mobilenumber'
                   value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}>

                   </input>
                </div>
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
                   class="inputtextpassword"
                  type='text'
                   id='password' 
                   name='password'
                   value={password}
              onChange={(e) => setPassword(e.target.value)}>

                   </input>
                </div>
                <div className='form-control'>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input 
                   class="inputtextpassword"
                  type='text'
                   id='confirmpassword' 
                   name='confirmpassword'
                   value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>

                   </input>
                </div>
                <button type="submit" class="submitbtn">Register</button>
                
          </form>
         
      </article>
      </>
        
    )
}
export default SignUp