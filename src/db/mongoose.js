const mongoose = require('mongoose')

const uri = "mongodb://localhost:27017/shop";
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri);

}