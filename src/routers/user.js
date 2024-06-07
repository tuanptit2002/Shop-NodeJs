const express = require('express')
const User = require('../models/user')
const auth = require('../middlerware/auth')
const router = new express.Router();
const Cart =  require('../models/cart')
const passport = require('passport')



router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
    (req, res) => {
      res.redirect('http://localhost:5173/');
    }
  );

router.post('/users', async(req, res) =>{
    const user = new User(req.body)
    try {
        await user.save();
        const token = await user.generateAuthToken();
        console.log(user._id)
        await Cart.createCart(user._id.toHexString())
        res.status(200).send({user, token});
    }catch(e){
        res.send(e)
     }
})
router.post('/user/login', async (req, res) =>{
    try{
        const user  = await User.findBycredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token})
    }catch(e){
    return res.status(400).send();
}
        
})



router.post('/users/logout', auth, async(req,res) => {
        try{
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })

            await req.user.save()
            res.send();
        }catch(e){
            res.status(500).send()
        }
})
router.put('/users/:id', async (req, res) => {
    console.log(req.body)
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'date', 'phone', 'avatar'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    const _id = req.params.id;
    
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete({_id});
        if (!user) {
            return res.status(404).send({ error: 'Task not found' });
        } 
        
        res.send(user)
    }catch(e){
        res.send(e)
    }
})

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
})
module.exports = router;