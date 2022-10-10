const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
    }
    ,
    draft: {
        type: Boolean,
        default: false,
        required: true
    }
    ,


    category: {
        type: String,

    }
    ,
    pictures: {
        type: Array
    }

    , like: {
        type: Number,

    }
    , dislike: {
        type: Number
    },
    liked: {
        type: Boolean,
    },
    disliked: {
        type: Boolean,
    }
    ,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }


}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = mongoose.model("Blog", blogSchema)