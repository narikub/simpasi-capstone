const express   = require('express')
const router    = express.Router()
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
const User      = require('../models/User')
const Bayi      = require('../models/Bayi')

const { registerValidation }        = require('../configs/validation')
const { loginValidation }           = require('../configs/validation')
const { changePasswordValidation }  = require('../configs/validation')

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
        confirm_password: hashPassword
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
    if(emailExist) return res.status(404).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan!'
    })

    //if username exist
    const usernameExist = await User.findOne({email: req.body.username})
    if(usernameExist) return res.status(404).json({
        status: res.statusCode,
        message: 'username Sudah digunakan!'
    })

    try {
        const userUpdate = await User.updateOne({ _id: req.params.id_user}, {
            email: req.body.email,
            username: req.body.username,
            nama: req.body.nama
        })
        res.json(userUpdate)
    } catch (err) {
        res.json({message: err})
    }
})

//Update Password
//berhasil update pw tapi belum bisa input pw lama
router.put('/change-pw/:id_user', async (req, res, next) => {
    //validasi pw Joi
    const { error } = changePasswordValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })
    try {
        const { id_user } = req.params
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const pwUpdate = await User.findByIdAndUpdate({ _id: id_user }, {
            //old_password: hashPassword,
            password: hashPassword,
            confirm_password: hashPassword
            }, { new: true })
        return res.status(200).json({
            status: true,
            message: "Password berhasil di ubah",
            data: pwUpdate
        })
    } catch (error) {
        return res.status(400).json({status: false, error: "Error Occured"})
    }
})

module.exports = router