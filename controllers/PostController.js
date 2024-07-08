const Post = require('../models/Post')

const PostController = {

    //CREAR POST
    async create(req, res) {
        try {
            const post = await Post.create(req.body)
            res.status(201)
            .send({ message: 'Post creado con éxito', post})
        } catch (error) {
            console.error(error)
            res.status(500)
            .send({message: 'Error al crear post'})
        }
    }
}

module.exports = PostController