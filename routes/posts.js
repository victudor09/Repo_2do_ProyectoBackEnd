const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

const { authentication } = require('../middlewares/authentication')

router.post('/', authentication, PostController.create) //AUTENTICADO
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.put('/:_id', authentication, PostController.update) //AUTENTICADO
router.get('/search/:title', PostController.getPostsByTitle)
router.delete('/:_id', authentication, PostController.delete) //AUTENTICADO
router.put('/comments/:_id', authentication, PostController.insertComment)
router.put('/likes/:_id', authentication, PostController.like)

module.exports = router