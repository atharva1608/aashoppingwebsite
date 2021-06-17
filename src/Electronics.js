import React,{useState} from 'react';
import './Electronics.css';
import styled, { keyframes } from 'styled-components';
import Carousel from 'react-elastic-carousel';
import {fadeIn} from 'react-animations';
import {Link} from 'react-router-dom';
import axios from 'axios';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];
function ElectronicList(props){

  
  const { electronicitems, onAdd } = props;
  
  const fadeInAnimation = keyframes`${fadeIn}`;
  const FadeIn = styled.div`
    animation:6s ${fadeInAnimation};`;
    return (
      <FadeIn>

      <section className='electronicitemlist'>
         <Carousel breakPoints={breakPoints}>
        {electronicitems.map((electronicitem)=>{
         
          const {img,title,discountprice,originalprice,discountrate} =electronicitem;
          return (
          <div>
          <Electronics key={electronicitem.id} electronicitem={electronicitem} onAdd={onAdd}> </Electronics>
          <Link to={`/electronicitem/${electronicitem.id}`}>Learn More</Link>
          </div> 
            );
        })}
        </Carousel>
        
      </section>
      </FadeIn>
    );
  };


const Electronics=(props)  => {
  const { electronicitem, onAdd } = props;
  const [title,settitle] = useState('');
  const [discountprice,setdiscountprice] = useState('');
  const addToCart= (e) =>{
    e.preventDefault();
    settitle(electronicitem.title);
    setdiscountprice(electronicitem.discountprice);
    const cartItems={
      title:title,
      quantity: 1,
      price:discountprice
    }
    axios.post('http://localhost:4040/app/addtocart',cartItems,{withCredentials: true})
    .then(response =>{
      console.log(response.data)
    }).catch(error => console.log(error))
  }

return(
        <>
         
        <article class='electronics'>
        
        <img src={electronicitem.img} alt=""></img>
        <h3>{electronicitem.title}</h3>
        <p>MRP: {electronicitem.originalprice}</p>
        <h5>Price: {electronicitem.discountprice}</h5>
        <p>You Save: {electronicitem.originalprice-electronicitem.discountprice} ({electronicitem.discountrate})</p>
        <button onClick={() => onAdd(electronicitem),addToCart} >Add to Cart</button>
       </article>
       
        </>
    )

};
export default ElectronicList