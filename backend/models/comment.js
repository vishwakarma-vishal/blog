const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
})

module.exports = mongoose.model("Comment", CommentSchema);