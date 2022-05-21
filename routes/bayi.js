const express = require('express')
const router = express.Router()
const Bayi = require('../models/Bayi')

const verifyToken = require('../routes/verifyToken')

//create
router.post('/', async (req, res) => {
    const bayiPost = new Bayi({
        nama: req.body.nama,
        tglLahir: req.body.tglLahir,
        umur: req.body.umur,
        jk_bayi: req.body.jk_bayi,
        tb_bayi: req.body.tb_bayi,
        bb_bayi: req.body.bb_bayi,
        alergi: req.body.alergi
    })
    
    try {
        const bayi = await bayiPost.save()
        res.json(bayi)
    } catch (err) {
        res.json({message: err})
    }
})

//read all bayi
router.get('/', verifyToken, async (req, res) => {
    try {
        const bayi = await Bayi.find()
        res.json(bayi)
    } catch (err) {
        res.json({message: err})
    }
})

//read bayi by id
router.get('/:id_bayi', verifyToken, async (req, res) => {
    try {
        const bayi = await Bayi.find({ _id: req.params.id_bayi})
        res.json(bayi)
    } catch (err) {
        res.json({message: err})
    }
})

//update
router.put('/:id_bayi', async (req, res) => {
    try {
        const bayiUpdate = await Bayi.updateOne({ _id: req.params.id_bayi}, {
            nama: req.body.nama,
            tglLahir: req.body.tglLahir,
            umur: req.body.umur,
            jk_bayi: req.body.jk_bayi,
            tb_bayi: req.body.tb_bayi,
            bb_bayi: req.body.bb_bayi,
            alergi: req.body.alergi
        })
        res.json(bayiUpdate)
    } catch (err) {
        res.json({message: err})
    }
})

//delete
router.delete('/:id_bayi', async (req, res) => {
    try {
        const bayiUpdate = await Bayi.deleteOne({ _id: req.params.id_bayi})
        res.json(bayiUpdate)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router