const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId


const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Por favor rellena el titulo'],
        },
        subtitle: {
            type: String,
            required: [true, 'Por favor rellena el subtitulo de la publicacion'],
        },
        comments: [
            {
                userId:  { type: ObjectId, ref: 'User'},
                comment: String
            }
        ],
        likes: [{type: ObjectId}],
    },
    {timestamps: true}
)

//NO ME FUNCIONA BÚSQUEDA POR ÍNDICE
PostSchema.index({
    title: 'text',
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post