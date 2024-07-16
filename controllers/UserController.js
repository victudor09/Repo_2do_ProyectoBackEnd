const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require ('../config/keys.js')

const UserController = {

//CREAR USUARIO
async create(req, res) {
 try {
 const user = await User.create(req.body)
 res.status(201).send({message: 'Usuario creado con éxito', user})
 } catch (error) {
 console.error(error)
 res
 .status(500)
 .send({ message: 'Ha habido un problema al crear el usuario' })
 }
},

// TRAER LISTA DE USUARIOS

async getAll(req, res) {
    try {
    const users = await User.find()
    res.send(users)
    } catch (error) {
    console.error(error)
    res
    .status(500)
    .send({ message: 'Ha habido un problema al traer la lista de usuarios' })
    }
}, 

// LOGIN DE USUARIO CON TOKEN
async login(req, res) {
    try {
    const user = await User.findOne({
        email: req.body.email,
    })
    //GENERA EL TOKEN
    const token = jwt.sign({ _id: user._id }, jwt_secret)
    //A partir de 4 tokens se van eliminando los más antiguos
    if (user.tokens.length > 4) user.tokens.shift()
    user.tokens.push(token)
    await user.save()
    res.send({ message: 'Bienvenid@ ' + user.name, token })

    } catch (error) {
    console.error(error)
    }
}, 

async getInfo(req, res) {
    try {
    const user = await User.findById(req.user._id)
    .populate("likeList")
    res.send(user)
    } catch (error) {
    console.error(error)
    }
    }
   

}
module.exports = UserController