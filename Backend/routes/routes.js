const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const cartSchema = require('../models/CartModel')
const addressSchema = require('../models/AddressModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dfsgjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
require('dotenv').config(); 
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const crypto = require('crypto')
const stripe = require('stripe')("sk_test_51J28qvSJKlDV9MVVUQoeYoxhpk8wssvGWY8cqU95RTTxPORdcEIhZY8ot7KzxCpN13H23oeBTMqevLm3NgOIft0300CdnPedjw")
const uuid = require('uuid').v4

const authLogin = async(request, response, next) => {
    try {
        const cookie = request.cookies.token
        console.log(cookie)
        const claims =  jwt.verify(cookie, JWT_SECRET)
        request.user = {
            id:claims.id,
            username:claims.username
        }
        console.log(request.user)
        if (!claims) {
            return response.status(401).send({
                message: 'unauthorized'
            })
        }
       
        next();
      } catch (err) {
        console.error(err);
        response.status(401).json({ errorMessage: "Unauthorized" });
      }
    };
  



router.post('/signup',async(request,response) =>{
   
    if(request.body.password !== request.body.confirmpassword){
        response.json({
            message:"Password Not Matched!"
            })
    }
    const {email} = request.body
    const saltPassword1 = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password,saltPassword1)
    const saltPassword2 = await bcrypt.genSalt(10)
    const secureConfirmPassword = await bcrypt.hash(request.body.confirmpassword,saltPassword2)
    const signedUpUser = new signUpTemplateCopy({
        username:request.body.username,
        mobilenumber:request.body.mobilenumber,
        email:request.body.email,
        password:securePassword,
        confirmpassword:secureConfirmPassword,
    })
    const existingUser = await signUpTemplateCopy.findOne({email});
    if(existingUser) { 
        response.status(400).json({status:"error", error:'An account with this email already exists.'});
        console.log("An account with this email already exists.");
}
    else{
  const  emailToken = crypto.randomBytes(64).toString('hex');
  try{
    const msg={
        from:'atharva2001alshi@gmail.com',
        to: request.body.email,
        subject:'AA Shopping Website Account Verification',
        text:`
        Hello ${request.body.username}!!! Thanks for Registering on AA Shopping website.
        Please Verify your account by clicking on the below link.
        http://${request.headers.host}/verify-email?token=${emailToken}
        `,
        html:`
        <h1> Hello ${request.body.username}!!!</h1>
        <p> Thanks for Registering on AA Shopping website. </p>
        <p> Please Verify your account by clicking on the below link. </p>
        <a href="http://${request.headers.host}/verify-email?token=${emailToken}">Verify your account</a>
        `
        }
        try{
        await sgMail.send(msg);
        console.log("Email sent...")
        request.flash('info', 'Verify your account')
        console.log("Verify your account")
        }catch(error){
        console.log(error);
        
        }
  }catch (e) {
    return response.status(401).send({
        message: 'unauthenticated'
    })
}
    const result = await signedUpUser.save()
    const {confirmpassword,password, ...data} = await result.toJSON()
    response.send(data)
    
    console.log(data);
}


    
})

router.post('/login', async (request, response) => {
	const { email,password } = request.body
	const user = await signUpTemplateCopy.findOne({ email }).lean()

	if (!user) {
     response.json({ status: 'error', error: 'User not found' })
     
	}

	if (!await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful
        return response.json({ status: 'error', error: 'Invalid credentials' })
    }
    

    const token = jwt.sign({
        id: user._id,
        username:user.username
    },JWT_SECRET)

    response.cookie('token',token,'rememberme', '1',{
    expires: new Date(Date.now() + 900000), 
    httpOnly:true,
    
    
   });

  console.log(user._id,user.username)
  response.send({message:"Success",data:token})
    
})

router.post('/addtocart',async(request,response)=>{
    try {
        const cookie = request.cookies.token
        console.log(cookie)
        const claims =  jwt.verify(cookie, JWT_SECRET)
        request.user = {
            id:claims.id,
            username:claims.username
        }
        console.log(request.user)
        if (!claims) {
            return response.status(401).send({
                message: 'unauthorized'
            })
        }
        const user = await signUpTemplateCopy.findOne({_id: claims.id,username:claims.username})
        if(request.user.id == user._id && request.user.username === user.username) {
          cartSchema.findOne({user:request.user._id})
          .exec((error,cart) =>{
            if(error) return response.status(400).json({error});
            if(cart) {
            const title = request.body.cartItems.title;   
            console.log(title); 
            const isItemAdded = cart.cartItems.find(c=> c.title === title);

            if(isItemAdded){
                cartSchema.findOneAndUpdate({ user:request.user.id,"cartItems.title": title},{
                    "$set":{
                        "cartItems.$": {
                            ...request.body.cartItems,
                            quantity:isItemAdded.quantity + request.body.cartItems.quantity
                        }
                    }
                })
                    .exec((error,_cart) =>{
                      if(error) return response.status(400).json({error});
                      if(cart){
                          return response.status(201).json({cart: _cart});
                      } 
                    })
                

            }else{
                cartSchema.findOneAndUpdate({ user:request.user.id},{
                    "$push":{
                        "cartItems": request.body.cartItems
                    }
                    .exec((error,cart) =>{
                      if(error) return response.status(400).json({error});
                      if(cart){
                          return response.status(201).json({cart});
                      } 
                    })
                })
            }

            }else{
                const cart = new cartSchema({
                    user: request.user.id,
                    cartItems: [request.body.cartItems]
                });
                cart.save((error,cart) =>{
                    if(error) return response.status(400).json({error});
                    if(cart){
                        return response.status(201).json({cart});
                    } 
                });
            }

          });  

          
          
        }
        
    } catch (e) {
        return response.status(401).send({
            message: 'unauthenticated'
        })
    }

})


router.get('/user',async(request, response) => {
    try {
        const cookie = request.cookies.token
       
        const claims =  jwt.verify(cookie, JWT_SECRET)
        request.user = {
            id:claims.id,
            username:claims.username
            
        }
        console.log(request.user)
        if (!claims) {
            return response.status(401).send({
                message: 'unauthorized'
            })
        }
     
        const user = await signUpTemplateCopy.findOne({_id: claims.id,username:claims.username})
        if(request.user.id == user._id && request.user.username === user.username) {
            const {password,confirmpassword, ...data} = await user.toJSON();
            response.send(data);
        }
        
    } catch (e) {
        return response.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post('/address',async(request,response) =>{
    try {
        const cookie = request.cookies.token
       
        const claims =  jwt.verify(cookie, JWT_SECRET)
        request.user = {
            id:claims.id,
            username:claims.username
            
        }
        console.log(request.user)
        if (!claims) {
            return response.status(401).send({
                message: 'unauthorized user Please Sign In'
            })
        }
     
        const user = await signUpTemplateCopy.findOne({_id: claims.id,username:claims.username})
        if(request.user.id == user._id && request.user.username === user.username) {
            const UserAddress = new addressSchema({
                user: request.user.id,
                address:request.body.address,
            })
            const existingUserAddress = await addressSchema.findOne({user});
    if(existingUserAddress) return response.status(400).json({error:"Delivery Address with this email already exists.Do you want to change it?"})
            const result = await UserAddress.save()
            
            response.send(result)
        }
        
    } catch (e) {
        return response.status(401).send({
            message: 'unauthenticated'
        })
    }
})

router.post('/payment',async(request,response)=>{

    try {
        const cookie = request.cookies.token
       
        const claims =  jwt.verify(cookie, JWT_SECRET)
        request.user = {
            id:claims.id,
            username:claims.username
            
        }
        console.log(request.user)
        if (!claims) {
            return response.status(401).send({
                message: 'unauthorized user Please Sign In'
            })
        }
     
        const user = await signUpTemplateCopy.findOne({_id: claims.id,username:claims.username})
        if(request.user.id == user._id && request.user.username === user.username) {
            
    const {newItem,token} = request.body;
    console.log("PRODUCT",newItem);
    console.log("PRICE ",newItem.discountprice);
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email:token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: (newItem.discountprice),
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email,
            description: newItem.title,
            shipping:{
                name: token.card.name,
                address: {
                 line1: token.card.address_line1,
                 country: token.card.address_country,
                 city: token.card.address_city,   
                 
                }
            },
           
        },{idempotencyKey})
    })
    .then(result=> response.status(200).json(result))
    .catch(error=>console.log(error))
            }
        
        
    } catch (e) {
        return response.status(401).send({
            message: 'unauthenticated'
        })
    }

   
})
    

router.get('/logout',(request, response) => {
    response.clearCookie("token",{path:'/'})
    response.json("Succesfully Logout")
    
})




module.exports = router