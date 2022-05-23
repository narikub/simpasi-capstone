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
        //old_password: Joi.string()
        //    .min(6)
        //    .required()
        //    .valid(Joi.ref('loginValidation/password')),
        password: Joi.string()
            .min(6)
            .required(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
    })
    return schema.validate(data)
}

module.exports.registerValidation       = registerValidation
module.exports.loginValidation          = loginValidation
module.exports.changePasswordValidation = changePasswordValidation
