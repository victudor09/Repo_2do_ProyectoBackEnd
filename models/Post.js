const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Por favor rellena el titulo'],
        },
        body: {
            type: String,
            required: [true, 'Por favor rellena el cuerpo de publicacion'],
        },
        comments: Array
    },
    {timestamps: true}
)

PostSchema.index({
    title: 'text',
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post