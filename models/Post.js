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
                userNameComment: String,
                comment: String
            }
        ],
        likes: [{type: ObjectId}],
        
        authorPostId: { type: ObjectId, ref: 'User'},

        authorName: {
            type: String
        }
    },
    {timestamps: true}
)

//NO ME FUNCIONA BÚSQUEDA POR ÍNDICE
PostSchema.index({
    title: 'text',
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post