const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { registerValidation } = require('../configs/validation')
const { loginValidation } = require('../configs/validation')

//register
router.post('/register', async (req, res) => {
    //validasi
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    //if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan!'
    })

    //if username exist
    const usernameExist = await User.findOne({username: req.body.username})
    if(usernameExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Username Sudah digunakan!'
    })

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        username: req.body.username,
        password: hashPassword,
        password_confirmation: hashPassword
    })

    try {
        const saveUser = await user.save()
        res.json(saveUser)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal menambahkan akun baru'
        })
    }
})

//login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    
    const { usernameEmail, password } = req.body
    const user = await User.findOne({ $or: [{ username: usernameEmail }, { email: usernameEmail }] })
    if (!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Email atau Username Anda Salah!'
    })

    // check password
    const validPwd = await bcrypt.compare(password, user.password)
    if (!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password Anda Salah!'
    })

    //token JWT
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.header('auth-token', token).json({
        message: 'berhasil login',
        id: user._id,
        username: user.username,
        email: user.email,
        token: token
    })
})

//update user
router.put('/:id_user', async (req, res) => {
    //if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan!'
    })

    //if username exist
    const usernameExist = await User.findOne({username: req.body.username})
    if(usernameExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Username Sudah digunakan!'
    })

    try {
        const userUpdate = await User.updateOne({ _id: req.params.id_user}, {
            nama: req.body.nama,
            username: req.body.username,
            email: req.body.email
        })
        res.json(userUpdate)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router