const Post = require('../models/Post')
const User = require('../models/User')

const PostController = {

    //CREAR POST (AUTENTICADO EN RUTAS) 
    // + VALIDACIONES AL CREAR POST (ok)
    async create(req, res, next) {
        try {
            const post = await Post.create(
                {...req.body}
            )
            res.status(201)
            .send({ message: 'Post creado con éxito', post})
        } catch (error) {
            error.origin = 'publicacion'
            next(error)
        }
    },

    //ACTUALIZAR POST (AUTENTICADO EN RUTAS)

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


    //CREAR COMENTARIO EN UN POST
    async insertComment(req, res){
        try {
            const post = await Post.findByIdAndUpdate(
                req.params._id,
                {$push: { comments: { userId: req.user._id, comment: req.body.comment}}},
                { new: true }
            ) 
            res.send(post)
        
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'Problema al insertar comentario'})
        }
    },


    //ELIMINAR POST (AUTENTICADO EN RUTAS)

    async delete (req, res) {
        try {
            const post = await
            Post.findByIdAndDelete(req.params._id)
            res.send({ message: 'Post deleted', post })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: ' Problem trying to remove post '
            })
        }
    },


    //TRAER POSTS (junto con usuarios y junto a comentarios)
    //POPULATE (pdte)
    async getAll(req, res) {
        try {
        const { page = 1, limit = 10 } = req.query
        const posts = await Post.find()
        .populate('comments.userId')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        res.send(posts)
        } catch (error) {
        console.error(error)
        res.status(500)
        .send({message: 'Error al traer lista de posts'})
        }
    },
       

    //BUSCAR POST POR TITULO DE POST
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


    //PARA DAR LIKE
    async like(req, res) {
        try {
        const post = await Post.findByIdAndUpdate(
            req.params._id, 
            { $push: { likes: req.user._id } }, 
            { new: true }
        )
        await User.findByIdAndUpdate(req.user._id,
            { $push: { likeList: req.params._id } },
            { new: true })
        res.send(post)
        } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Error al dar like" })
        }
    },

    //PARA QUITAR LIKE
    async dislike(req, res) {
        try {
        const post = await Post.findByIdAndUpdate(
            req.params._id, 
            { $pop: { likes: req.user._id } }, 
            { new: true }
        )
        await User.findByIdAndUpdate(req.user._id,
            { $pop: { likeList: req.params._id } },
            { new: true })
        res.send(post)
        } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Error al dar like" })
        }
    }

}

module.exports = PostController