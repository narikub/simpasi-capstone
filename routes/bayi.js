const express       = require('express')
const router        = express.Router()
const Bayi          = require('../models/Bayi')
const verifyToken   = require('../routes/verifyToken')

const { bayiValidation, cekBahan, editBayiValidation }  = require('../configs/validation')

//create
router.post('/', verifyToken, async (req, res) => {
    //validasi
    const { error } = bayiValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })
    const bayiPost = new Bayi({
        nama: req.body.nama,
        tglLahir: req.body.tglLahir,
        jk_bayi: req.body.jk_bayi,
        bb_bayi: req.body.bb_bayi,
        user: req.user._id
    })
    try {
        const bayi = await bayiPost.save()
        res.json(bayi)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal menambahkan data bayi'
        })
    }
})

//read all bayi
router.get('/', verifyToken, async (req, res) => {
    try {
        const bayi = await Bayi.find({user:req.user._id})
        if (!bayi)
        return res.status(404).send()    
        res.status(200).send(bayi)
    }catch(err) {
        res.status(400).send(err.message)
    }
})

//read bayi by id
router.get('/:id_bayi', verifyToken, async (req, res) => {
    try {
        const bayi = await Bayi.findOne({ _id: req.params.id_bayi})
        res.json(bayi)
    } catch(err) {
        res.status(400).send(err.message)
    }
})

//update
router.put('/:id_bayi', verifyToken, async (req, res) => {
    const { error } = editBayiValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })
    try {
        const bayiUpdate = await Bayi.updateOne({ _id: req.params.id_bayi}, {
            nama: req.body.nama,
            tglLahir: req.body.tglLahir,
            jk_bayi: req.body.jk_bayi,
            bb_bayi: req.body.bb_bayi,
        })
        res.json(bayiUpdate)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mengedit data bayi'
        })
    }
})

//update cek bahan bayi
router.put('/:id_bayi/bahan', verifyToken, async (req, res) => {
    //validasi
    const { error } = cekBahan(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })
    try {
        const bayiUpdate = await Bayi.updateOne({ _id: req.params.id_bayi}, {
            alergi: req.body.alergi
        })
        res.json(bayiUpdate)
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mengedit data bayi'
        })
    }
})

//delete
router.delete('/:id_bayi', verifyToken, async (req, res) => {
    try {
        const bayiUpdate = await Bayi.deleteOne({ _id: req.params.id_bayi})
        res.json(bayiUpdate)
    } catch(err) {
        res.status(400).send(err.message)
    }
})

module.exports = router