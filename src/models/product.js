const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    count: {
        type: Number,
        require: true
    },
    rating:{
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
})

const Product  = mongoose.model('Product', productSchema);

module.exports  = Product