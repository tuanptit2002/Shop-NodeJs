const express = require('express')
const Product = require('../models/product')

const router = new express.Router();

router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        res.status(200).send(product);
    }catch(e){
        res.send(e)
    }
})

router.get('/products' , async (req, res) => {
    try{    const products = await Product.find({})
            res.status(200).send(products);
    }catch(e){
        res.status(400).send(e)
    }
})

router.put('/products/:id', async (req,res) =>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'count', 'description', 'image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'});
    }
    const _id = req.params.id;
    try{
        const product  = await Product.findById({_id});
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.status(200).send(product);
    }catch(e){
        res.status(400).send(e)
    } 
})

router.delete('/products/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const product = await Product.findByIdAndDelete({_id});
        if (!product) {
            return res.status(404).send({ error: 'Task not found' });
        } 
        
        res.send(product)
    }catch(e){
        res.send(e)
    }
})

module.exports = router;