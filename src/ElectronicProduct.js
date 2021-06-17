import React,{useState,useEffect} from 'react';
import './Electronics.css';
import {electronics} from './electronicitems';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const ElectronicProduct = () => {
 
  const [img,setimg] = useState('');
  const [title,settitle] = useState('');
  const [originalprice,setoriginalprice] = useState('');
  const [discountprice,setdiscountprice] = useState('');
  const [discountrate,setdiscountrate] = useState('');
  const {id} = useParams();
  
  useEffect(() =>{
   const newItem = electronics.find((electronicitem) => electronicitem.id ===parseInt(id));
   setimg(newItem.img);
   settitle(newItem.title);
   setoriginalprice(newItem.originalprice);
   setdiscountprice(newItem.discountprice);
   setdiscountrate(newItem.discountrate);
  },[]);
  const newItem = electronics.find((electronicitem) => electronicitem.id ===parseInt(id));

  const makePayment = token =>{
    const body = {
      newItem,
      token
    }
    axios.post("http://localhost:4040/app/payment",body,{withCredentials: true})
    .then(response =>{
    console.log("RESPONSE",response)
    if(response.message==='unauthenticated'){
      alert("Please Sign In/ Sign Up if not to continue")
    }
    })
    .catch(error=>console.log(error))
  }

  return (
    <>
    <div class="headcart">
    <h1>AA Shopping</h1>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
          </svg>
          </div>
    <article class="electronicproduct">
      <img id="electronicimg" src={img} alt=""></img>
      <div class="description">
      <h3>{title}</h3>
      <p>MRP: {originalprice}</p>
      <h5>Price: {discountprice}</h5>
      <p>You Save: {originalprice-discountprice} ({discountrate})</p>
      <h4>(Inclusive of all taxes)</h4>
        
        <div class="imgandtext">
          <div class="discont">
            <img id="featureimg" src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png" alt=""></img>
            <h5>7 Day <br/> Replacement </h5>
            </div>
            <div class="discont">
            <img id="featureimg" src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png" alt=""></img>
            <h5>AA <br/> Delivered</h5>
            </div>
            <div class="discont">
            <img id="featureimg" src="https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" alt=""></img>
            <h5>1 Year <br/> Warranty</h5>
            </div>
        </div>

        <div class="btncontainer">
          <div>
        <button class="cartbtn">Add to Cart</button>
        </div>
        <StripeCheckout 
        stripeKey="pk_test_51J28qvSJKlDV9MVVtuRexxxQWlUJh5eqfGrswlqLv3UggP4l5aVVVARg0LqyIEqmV1DLFB3XLWlLUAu9kJKaXz4000YllbFMLp"
         token={makePayment} 
         name="Buy Product"
         amount = {discountprice} 
         shippingAddress
         billingAddress
         >
          <button class="buybtn">Buy Now</button>
        </StripeCheckout>
        </div>

        </div>
    </article>
       
    </>
  );
};

export default ElectronicProduct;
