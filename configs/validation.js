const Joi = require('@hapi/joi')

//Validasi Register
const registerValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
    })
    return schema.validate(data)
}

//Validasi Login
const loginValidation = (data) => {
    const schema = Joi.object({
        usernameEmail: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
    })
    return schema.validate(data)
}

//Validasi Change password
const changePasswordValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string()
            .min(6)
            .required(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
    })
    return schema.validate(data)
}

const bayiValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string()
            .required(),
        tglLahir: Joi.date()
            .required(),
        jk_bayi: Joi.string()
            .required()
            .enum = ["P", "L"],
        bb_bayi: Joi.string()
            .required(),
    })
    return schema.validate(data)
}

const editBayiValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string(),
        tglLahir: Joi.date(),
        jk_bayi: Joi.string()
            .enum = ['P', 'L'],
        bb_bayi: Joi.string()
    })
    return schema.validate(data)
}

const cekBahan = (data) => {
    const schema = Joi.object({
        alergi: Joi.object({
            Roti_Tawar: Joi.string()
                .required()
                .enum = ['1', '2', '3', '4'],
            Cumi_Cumi: Joi.string()
                .required()
                .enum = ['1', '2', '3', '4'],
            Tepung_Beras: Joi.string()
                .required()
                .enum = ['1', '2', '3', '4'],
            Pisang: Joi.string()
                .required()
                .enum = ['1', '2', '3', '4'],
            Telur_Bebek: Joi.string()
                //.required()
                .enum = ['1', '2', '3', '4'],
            Kacang_Tanah: Joi.string()
                //.required()
                .enum = ['1', '2', '3', '4'],
            Kerang: Joi.string()
                //.required()
                .enum = ['1', '2', '3', '4'],
            Alpukat: Joi.string()
                //.required()
                .enum = ['1', '2', '3', '4'],
        }).required()
    })
    return schema.validate(data)
}

module.exports.registerValidation       = registerValidation
module.exports.loginValidation          = loginValidation
module.exports.changePasswordValidation = changePasswordValidation
module.exports.bayiValidation           = bayiValidation
module.exports.editBayiValidation       = editBayiValidation
module.exports.cekBahan                 = cekBahan
