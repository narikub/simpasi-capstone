const express       = require('express')
const router        = express.Router()
const User          = require("../models/User")
const Token         = require("../models/Token")
const sendEmail     = require("../utils/sendEmail")
const crypto        = require("crypto")
const bcrypt        = require('bcryptjs')

const Joi           = require("@hapi/joi")


//kirim link reset password
router.post("/", async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(400).send("user with given email doesn't exist")

        let token = await Token.findOne({ id_user: user._id })
        if (!token) {
            token = await new Token({
                id_user: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/forgot/${user._id}/${token.token}`
        await sendEmail(user.email, "Password reset", link)

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

//reset password
router.post("/:id_user/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        
        const user = await User.findById(req.params.id_user);
        if (!user) return res.status(400).send("invalid link or expired")

        const token = await Token.findOne({
            id_user: user._id,
            token: req.params.token,
        })
        if (!token) return res.status(400).send("Invalid link or expired")

        user.password = hashPassword,
        await user.save()
        await token.delete()

        res.send("password reset sucessfully.")
    } catch (error) {
        res.send("An error occured")
        console.log(error)
    }
});

module.exports = router