import React from 'react';
import './Payment.css';
function CashOnDelivery() {
return(
    <>
    <h1>AA Shopping</h1>
    <h2>Order Now</h2>
    <div class="cashondelivery">
    <div class="username">
    <h4>Name</h4>
    <input class="inputname"type="text"></input>
    </div>
    <div class="useraddress">
    <h4>Delivery Address</h4>
    <input class="inputaddress" type="text"></input>
    </div>
    <button class="orderbutton">Place your Order</button>
    </div>
   </>
)
}
export default CashOnDelivery