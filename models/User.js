const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const userSchema = new Schema({
    nama: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 100
    },
    username: {
        type: String,
        required: true,
        min: 7,
        max: 24,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    confirm_password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)
