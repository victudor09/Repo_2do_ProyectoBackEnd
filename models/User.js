const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Por favor rellena tu nombre']
        },
        email: {
            type: String,
            required: [true, 'Por favor rellena tu email']
        },
        password: {
            type: String,
            required: [true, 'Por favor rellena tu contraseña']
        },
        tokens: [],
        likeList:  [{ type: ObjectId, ref: 'Post' }],
        postList: [{type: ObjectId, ref: 'Post'}]
    },

    
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
module.exports = User