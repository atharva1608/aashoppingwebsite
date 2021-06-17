import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ElectronicProduct from './ElectronicProduct';
import ClothesProduct from './ClothesProduct';
import Cart from './Cart';
import Basket from './Basket';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Payment from './Payment';
import CardDetails from './CardDetails';
import CashOnDelivery from './CashOnDelivery';
import SignIn from './SignIn';
import SignUp from './SignUp';
import GoogleMap from './GoogleMap';
import GooglePay from './GooglePay';

ReactDOM.render(
  <React.StrictMode>
     <Router>
       <Switch>
         <Route exact path='/'>
            <App />
         </Route>
         <Route path='/electronicitem/:id' children={<ElectronicProduct />}>
         </Route>
         <Route path='/clothesitem/:id' children={<ClothesProduct />}>
         </Route>
         <Route path='/cart'>
           <Basket></Basket>
         </Route>
         <Route path='/payment'>
          <Payment></Payment>
         </Route>
         <Route path='/carddetails'>
          <CardDetails></CardDetails>
         </Route>
         <Route path='/cashondelivery'>
         <CashOnDelivery></CashOnDelivery>
         </Route>
         <Route path='/signin'>
         <SignIn></SignIn>
         </Route>
         <Route path='/signup'>
         <SignUp></SignUp>
         </Route>
         <Route path='/map'>
         <GoogleMap></GoogleMap>
         </Route>
         <Route path='/googlepay'>
         <GooglePay></GooglePay>
         </Route>



       </Switch>
     </Router>
  </React.StrictMode>,
  document.getElementById('root')
  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
