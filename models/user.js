const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    fullname:
    {
        type: String,
        required: [true, "please provid fullname"]
        , maxlength: 60,
        minlength: 4


    },



    username: {
        type: String,
        required: false
        , unique: true
    }
    ,
    gmail: {
        type: String,
        required: false
        
    }
    ,

    picture: {
        type: String,

    }
    ,
    passwd: {
        type: String,
        required: [true, "Please Provide Passwd!"],
        minlength: 6
    }
    ,
    refreshToken: String

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

module.exports = mongoose.model('User', userSchema);

