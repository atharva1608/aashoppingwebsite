import React from 'react';
import './Clothes.css';
import  {clothesitems} from './clothesitems';
import Carousel from 'react-elastic-carousel';
import {fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import {Link} from 'react-router-dom';
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];
function ClothesList(){
    const fadeInAnimation = keyframes`${fadeIn}`;
    const FadeIn = styled.div`
      animation:6s ${fadeInAnimation};`;
    return (
      <FadeIn>
      <section className='clothesitemlist'>
         <Carousel breakPoints={breakPoints}>
        {clothesitems.map((clothesitem)=>{
          const {img,title,discountprice,originalprice,discountrate} =clothesitem;
          return (
          <div>
          <Clothes key={clothesitem.id} {...clothesitem}></Clothes>
            <Link to={`/clothesitem/${clothesitem.id}`}>Learn More</Link>
            </div>
            );
        })}
        </Carousel>
        
      </section>
      </FadeIn>
    );
  };


const Clothes=({img,title,discountprice,originalprice,discountrate})  => {

    const clickHandler = () =>{
       
        alert('Added to the cart')
      }
      

    return(
        <>
         
        <article className='clothes'>
        
        <img src={img} alt=""></img>
        <h3>{title}</h3>
        <p>MRP: {originalprice}</p>
        <h5>Price: {discountprice}</h5>
        <p>You Save: {originalprice-discountprice} ({discountrate})</p>
        <button type='button' onClick={() => clickHandler()}>Add to Cart</button>
       </article>
       
        </>
    )

};
export default ClothesList