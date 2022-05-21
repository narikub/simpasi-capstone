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
        password_confirmation: Joi.string()
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
            .min(6)
            .required(),
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation