const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')

router.post('/', UserController.create)
router.get('/', UserController.getAll)
router.post('/login', UserController.login)
router.get('/info', authentication, UserController.getInfo)
router.delete('/logout', authentication, UserController.logout)


module.exports = router