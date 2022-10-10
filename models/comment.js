const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    //blog id

    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
        // required: true
    },


    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    content: {
        type: String,

    },

    likes: {
        type: Number
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


module.exports = mongoose.model("Comment", commentSchema)