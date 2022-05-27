const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const BayiSchema = new Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Bayi', BayiSchema)