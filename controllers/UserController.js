const User = require('../models/User')
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

}
module.exports = UserController