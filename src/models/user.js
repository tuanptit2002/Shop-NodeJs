const date = require('date-and-time')
const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is valid');
            }
        }
    },
    password:{
        type: String,
        require: true,
        minlength:7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password');
            }
        }
    },
     date: {
        type: 'string',
        required: true,
        validate(value) {
            const parsedDate = date.parse(value, 'YYYY-MM-DD');
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Date must be in YYYY/MM/DD format and be a valid date');
            }
        }
    },
    phone:{
        type: String,
        minlength: 9
    },
    tokens:[{
        token:{
            type: String,
            require: true
        }
    }],
    avatar: {
        type: String
    }
})
userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token  =  jwt.sign({ _id: user._id.toString()}, 'PTIT');
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
}


userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
})
const User  = mongoose.model('User', userSchema);
module.exports = User