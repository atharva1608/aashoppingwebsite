import React,{useState} from 'react';
import './Cart.css';

export default function Cart(props) {

  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.discountprice, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 20;
  const totalPrice = itemsPrice + shippingPrice;

  const itemslength = ()=> {
    console.log(cartItems.length)
  }
  return (
    <>
      <h1>AA Shopping</h1>
      
      {cartItems.length === 0 && <div class="emptycart">Your AA Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <img src={item.img} alt=""/>
            <div class="col-2">{item.title}</div>
            <div class="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${item.discountprice.toFixed(2)}
            </div>
          </div>
          
        ))}


       {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
          </>
        )}





      
    </>
  );
}