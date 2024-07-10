const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

router.post('/', PostController.create)
router.get('/', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.put('/:_id', PostController.update)
router.get('/search/:title', PostController.getPostsByTitle)


module.exports = router