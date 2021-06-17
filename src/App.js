import React,{useState,useEffect} from 'react';
import Search from './Search'
import BestDeal from './BestDeal';
import ElectronicList from './Electronics';
import ClothesList from './Clothes';
import data from './data';
import axios from 'axios';
import {electronics} from './electronicitems';


function App() {
  const { electronicitems } = data;
  const [cartItems, setCartItems] = useState([]);
  const [title,settitle] = useState('');
  const [discountprice,setdiscountprice] = useState('');
  
 

  
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
  };
  

  
  return (
      <>
    <Search></Search>
    <BestDeal></BestDeal>
    
    <h3>Electronics</h3>
    <ElectronicList electronicitems={electronicitems} onAdd={onAdd}></ElectronicList>

    <h3>Clothes</h3>
    <ClothesList></ClothesList>
    

    
    </>
  );
}

export default App