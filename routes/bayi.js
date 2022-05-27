const express       = require('express')
const router        = new express.Router()
const Bayi          = require('../models/Bayi')
const User          = require('../models/User')
const verifyToken   = require('../routes/verifyToken')

//create
router.post('/', verifyToken, async (req, res) => {
    const bayiPost = new Bayi({
        nama: req.body.nama,
        tglLahir: req.body.tglLahir,
        umur: req.body.umur,
        jk_bayi: req.body.jk_bayi,
        tb_bayi: req.body.tb_bayi,
        bb_bayi: req.body.bb_bayi,
        alergi: req.body.alergi,
        user: req.user._id
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
        const bayi = await Bayi.find({user:req.user._id})
        if (!bayi)
        return res.status(404).send()    
        res.status(200).send(bayi)
    }catch(e) {
        res.status(400).send(e.message)
    }
})

//read bayi by id
router.get('/:id_bayi', verifyToken, async (req, res) => {
    try {
        const bayi = await Bayi.findOne({ _id: req.params.id_bayi})
        res.json(bayi)
    } catch (err) {
        res.json({message: err})
    }
})

//update
router.put('/:id_bayi', verifyToken, async (req, res) => {
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
router.delete('/:id_bayi', verifyToken, async (req, res) => {
    try {
        const bayiUpdate = await Bayi.deleteOne({ _id: req.params.id_bayi})
        res.json(bayiUpdate)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router