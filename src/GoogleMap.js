import React,{useState} from 'react';
import Map from "mapmyindia-react";
import './GoogleMap.css';
import axios from 'axios';
function GoogleMap() {
  const [address, setAddress] = useState("");
 

  function validateForm() {
    if(!address){
      alert("Please enter your valid delivery address")
    }
};

  function handleSubmit(event) {
    event.preventDefault();
    const useraddress={
     address:address
    }
    validateForm()
    
    axios.post('http://localhost:4040/app/address',useraddress,{withCredentials: true})
    
    .then(response =>{
        if(response.data.error==='Delivery Address with this email already exists.Do you want to change it?')
        {
          alert("Delivery Address with this email already exists.Do you want to change it?")
        }
        else{
          console.log(response.data)
          alert("Delivery Address Saved")
          window.location='/'
        }  
      })
    .catch(error=>console.log(error))

    
  };
 
    
		 return (
            <>
            <h1>AA Shopping</h1>
            <h3>Choose your delivery address</h3>
            <div class="mapmyindia">
                  <Map
              markers={[
                  {
                      position: [19.2183, 72.9781],
                      draggable: true,
                      zoom: 15,
                      search: true,
                      hybrid:true,
                      location:true,
                      title: "Address Location",
                      onClick: e => {
                          console.log("clicked ");
                      },
                      onDragend: e => {
                          console.log("dragged");
                      }
                  }
              ]}
             
              />
              </div>
              <div>
              <input 
              class="typeaddress" 
              type='text' 
              placeholder='Delivery Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}>

              </input>

              </div>
              <button type="submit" onClick={handleSubmit} >Submit</button>
              
          </>
		 )
	 
};
export default GoogleMap