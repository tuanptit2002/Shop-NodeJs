const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('././routers/auth')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  app.use(session({
    secret: 'your-session-secret', 
    resave: false,
    saveUninitialized: true
  }));
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(passport.initialize());
  app.use(passport.session());
app.use(express.json())
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

app.listen(port, () => {
    console.log('Server is up on port', port);
})