const express = require('express')
const Cart = require('../models/cart')

const router = new express.Router();

router.post('/cart/:id' , async (req, res) => {
    const _id = req.params.id
    const updateData = req.body;
    const cart = await Cart.findById({_id})
    cart.products = updateData.products;
    await cart.save();

    console.log(cart)
    res.send(cart)

})

router.get('/cart/user/:userid', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Tìm tất cả giỏ hàng của người dùng có id là userId
        const userCarts = await Cart.findOne({ user: userId });
        res.send(userCarts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

module.exports = router;