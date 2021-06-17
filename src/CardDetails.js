import React,{useState,useEffect} from 'react';
import './Payment.css';

function CardDetails() {


 return(
   <>
    
    <img class="carddetailsimg" src="https://clockwise.software/img/blog/e-commerce-website-cost/header-background.png" alt=""></img>
    <h1 class="headtext1">AA Shopping</h1>
    <div class="card">
    <p>Credit or Debit Card</p>
    <img class="cardimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRErVbktXwsMtQiQvIvpwXYM9tX8K4fBxqgNOADjKdvECXvoNsySM07ZBOAdRjx7fmuag&usqp=CAU" alt=""></img>
        <div>
    <input class="cardnumber" type="text"
        placeholder="Card Number"
        >
       </input>
       </div>
       <div>
       <input class="cardholdername" type="text"
        placeholder="Card Holder Name"
        >
       </input>
       </div>
       <div class="expirycvv">
       <input class="mm" type="text"
        placeholder="Expiry MM"
        >
       </input>
       <input class="yyyy" type="text"
        placeholder="Expiry YYYY"
        >
       </input>
       <input class="cvv" type="text"
        placeholder="CVV"
        >
       </input>
       </div>
       <div class="check">
           **Once filled please check all the details again**
       </div>
       <div>
       <button class="continue"type="submit">Continue</button>
       </div>
    </div>

    
     </>
 )
}
 export default CardDetails