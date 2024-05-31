const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

app.use(express.json())
app.use(userRouter);
app.use(productRouter);


app.listen(port, () => {
    console.log('Server is up on port', port);
})