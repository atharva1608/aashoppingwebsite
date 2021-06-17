const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        },

    cartItems: [
        {
            title: {
                type:String,
                
            },
            quantity: {
                type:Number, 
                required:true
            },
            price: {
                type:String,
                required:true
            }
        },{timestamps: true}
    ]

});


module.exports = mongoose.model('cart',cartSchema)