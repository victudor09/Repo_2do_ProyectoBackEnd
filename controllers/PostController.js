const Post = require('../models/Post')


const PostController = {

    //CREAR POST (AUTENTICADO pdte) 
    // + VALIDACIONES AL CREAR POST (ok)
    async create(req, res, next) {
        try {
            const post = await Post.create({...req.body})
            res.status(201)
            .send({ message: 'Post creado con éxito', post})
        } catch (error) {
            error.origin = 'publicacion'
            next(error)
        }
    },

    //ACTUALIZAR POST (AUTENTICADO pdte)

    async update(req, res) {
        try {
        const post = await Post.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
        )
        res.send({ message: 'post successfully updated',
       post })
        } catch (error) {
        console.error(error)
        res.status(500)
        .send({message: 'Error al actualizar post'})
        }
        },

    //ELIMINAR POST (AUTENTICADO)

    //TRAER POSTS
    async getAll(req, res) {
        try {
        const posts = await Post.find()
        res.send(posts)
        } catch (error) {
        console.error(error)
        res.status(500)
        .send({message: 'Error al traer lista de posts'})
        }
    },
       

    //BUSCAR POST POR NOMBRE
    async getPostsByTitle(req, res) {
        try {
        if (req.params.title.length > 20) {
                return res.status(400)
                .send('Búsqueda demasiado larga')
        }   

        const title = new RegExp(req.params.title, 'i')
        const posts = await Post.find({ title })

        //NO FUNCIONA POR INDICE
        /* const posts = await Post.find({
            $text: {$search: req.params.title}
        }) */
        res.send(posts)

        } catch (error) {
        console.log(error)
        res.status(500)
        .send({message: 'Error al buscar post por nombre'})
        }
        },
       

    //BUSCAR POST POR ID
    async getById(req, res) {
        try {
        const post = await Post.findById(req.params._id)
        res.send(post)
        } catch (error) {
        console.error(error)
        res.status(500)
        .send({ message: 'Error al buscar post por Id' })
        }
        },

}

module.exports = PostController