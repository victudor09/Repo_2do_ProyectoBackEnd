const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require ('../config/keys.js')
const bcrypt = require('bcryptjs')

const UserController = {

//CREAR USUARIO
async create(req, res, next) {
 try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    const user = await User.create({...req.body, password: passwordHash})
    res.status(201).send({message: 'Usuario creado con éxito', user})
 } catch (error) {
    //error.origin = 'usuario'
    console.error(error)
    res
    .status(500)
    .send({ message: 'Ha habido un problema al crear el usuario' })
    next(error)
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
    const isMatch = bcrypt.compareSync(req.body.password, user.password)    
  
    if (isMatch) {
        //GENERA EL TOKEN
        const token = jwt.sign({ _id: user._id }, jwt_secret)
        //A partir de 4 tokens se van eliminando los más antiguos
        if (user.tokens.length > 4) user.tokens.shift()
        user.tokens.push(token)
        await user.save()
        res.send({ message: 'Bienvenid@ ' + user.name, token })
    }
    else {
        return res.status(400).send({ message: 'Usuario o contraseña incorrectos' })
    }
    

    } catch (error) {
    console.error(error)
    }
}, 

async getInfo(req, res) {
    try {
    const user = await User.findById(req.user._id)
    .populate("likeList")
    .populate("postList")
    res.send(user)
    } catch (error) {
    console.error(error)
    }
},

async logout(req, res) {
    try {
    const usuario = await User.findByIdAndUpdate(req.user._id, {
    $pull: { tokens: req.headers.authorization },
    })
    res.send({ message: usuario.name + ' te has desconectado con éxito' })
    } catch (error) {
    console.error(error)
    res.status(500).send({
    message: 'Hubo un problema al intentar desconectar al usuario',
    })
    }
},
   

}
module.exports = UserController