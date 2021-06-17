import React from 'react';
import './Payment.css'
import {Link} from 'react-router-dom';

export default function Payment() {
  
  return (
    <>
    
    <img class="paymentimg" src="https://d11wkw82a69pyn.cloudfront.net/siteassets/images/efinance/canvas_06-mobile-digital-pay_low.jpg" alt=""></img>
    <h1 class="headtext3">AA Shopping</h1>
    <div class="headtext2">Select Payment Method</div>
    <div class="paymentoptions">
      <p>Choose Best Payment mehod for yourself </p>
     
    <div class="paymentoptions1">
    <Link to='/carddetails'>
      Debit/Credit Card
      </Link>
    </div>
    
    <div class="paymentoptions2">
    <Link to='/cashondelivery'>
     Cash On Delivery
      </Link>
    </div>
    <div class="paymentoptions3">
      <Link to='/googlepay'>
      Google Pay
      </Link>
    </div>
    </div>
    </>
  );
}