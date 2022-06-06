const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const BayiSchema = new Schema({
    nama: {
        type: String,
    },
    tglLahir: {
        type: Date,
    },
    jk_bayi: {
        type: String
        //enum : ['P','L'],
    },
    bb_bayi: {
        type: String,
    },
    alergi: {
        Roti_Tawar: String,
        Cumi_Cumi: String,
        Tepung_Beras: String,
        Pisang: String,
        Telur_Bebek: String,
        Kacang_Tanah: String,
        Kerang: String,
        Alpukat: String,
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