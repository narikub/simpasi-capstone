const mongoose  = require('mongoose')

const BayiSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    tglLahir: {
        type: Date,
        required: true
    },
    umur: {
        type: Number,
        required: true
    },
    jk_bayi: {
        type: String,
        enum: "Perempuan" || "Laki-laki"
    },
    tb_bayi: {
        type: Number,
        required: true
    },
    bb_bayi: {
        type: Number,
        required: true
    },
    alergi: {
        type: String
    },
    tglTerdaftar: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bayi', BayiSchema)