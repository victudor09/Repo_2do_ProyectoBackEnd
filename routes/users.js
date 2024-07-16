const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')

router.post('/', UserController.create)
router.get('/', UserController.getAll)
router.post('/login', UserController.login)
router.get('/likesbyuser', authentication, UserController.getInfo)



module.exports = router