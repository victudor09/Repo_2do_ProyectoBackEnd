const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        tokens: [],
        likeList:  [{ type: ObjectId, ref: 'Post' }],
        //FALTA REFERENCIAR POST + ROLES
    },

    
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
module.exports = User