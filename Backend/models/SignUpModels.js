const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        maxlength:10,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model('mytable',signUpTemplate)