const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        postName: String,
        postBody: String,
        postComments: Array
    },
    {timestamps: true}
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post