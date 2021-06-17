import React,{useState} from 'react';
import Cart from './Cart';
import data from './data';
import axios from 'axios';

export default function Basket() {
   
    const [cartItems, setCartItems] = useState([]);
    const {electronicitems} = data;
    const clickHandler = () =>{
      alert('Added to the cart')
      };
    const addToCart= () =>{
        axios.post('http://localhost:4040/app/addtocart',{withCredentials: true})
        .then(response =>{
          console.log(response.data)
        }).catch(error => console.log(error))
      };

    const onAdd = (electronicitem) => {
      const exist = cartItems.find((x) => x.id === electronicitem.id);
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.id === electronicitem.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        );
      } else {
        setCartItems([...cartItems, { ...electronicitem, qty: 1 }]);
      }
      addToCart()
      clickHandler()
    };
    const onRemove = (electronicitem) => {
      const exist = cartItems.find((x) => x.id === electronicitem.id);
      if (exist.qty === 1) {
        setCartItems(cartItems.filter((x) => x.id !== electronicitem.id));
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.id === electronicitem.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
    };
return (
    
    <Cart 
    onAdd={onAdd}
    onRemove={onRemove}
    cartItems={cartItems}
    ></Cart>
    
);
}