const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic:{
        type: String,
        default: 'https://res.cloudinary.com/iisaac/image/upload/v1599804636/1b7e714d5b49609c9862b67bc7085430_ubwamm.jpg'
    },
    followers:[{type: ObjectId, ref: "User"}],
    following:[{type: ObjectId, ref: "User"}]
})

mongoose.model('User', userSchema)