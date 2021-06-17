import React,{useState,useEffect} from 'react';
import './Clothes.css';
import {clothesitems} from './clothesitems';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
const ElectronicProduct = () => {
  const [img,setimg] = useState('');
  const [title,settitle] = useState('');
  const [originalprice,setoriginalprice] = useState('');
  const [discountprice,setdiscountprice] = useState('');
  const [discountrate,setdiscountrate] = useState('');
  const {id} = useParams();
  
  useEffect(() =>{
   const newItem = clothesitems.find((clothesitems) => clothesitems.id ===parseInt(id));
   setimg(newItem.img);
   settitle(newItem.title);
   setoriginalprice(newItem.originalprice);
   setdiscountprice(newItem.discountprice);
   setdiscountrate(newItem.discountrate);
  },[]);

  return (
    <>
    <h1>AA Shopping</h1>
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
        <Link to='/payment'><button class="buybtn">Buy Now</button></Link>
        </div>
        
        </div>
    </article>
       
    </>
  );
};

export default ElectronicProduct;
