const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

const { authentication, isAuthor } = require('../middlewares/authentication')

router.post('/', authentication, PostController.create) //AUTENTICADO
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.put('/:_id', authentication, isAuthor, PostController.update) //AUTENTICADO y ES AUTOR
router.get('/search/:title', PostController.getPostsByTitle)
router.delete('/:_id', authentication, isAuthor, PostController.delete) //AUTENTICADO Y ES AUTOR
router.put('/comments/:_id', authentication, PostController.insertComment)
router.put('/likes/:_id', authentication, PostController.like)
router.delete('/dislikes/:_id', authentication, PostController.dislike)

module.exports = router