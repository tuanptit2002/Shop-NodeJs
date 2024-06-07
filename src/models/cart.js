const mongoose  = require('mongoose')

const cartSchema = mongoose.Schema({
    products:[
        {
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
            status: {
                type: Boolean,
                default: false
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

cartSchema.statics.createCart = async function(idUser) {
    const cart = new this({ user: idUser});
    await cart.save();
    console.log(cart);
    return cart;
};



const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;