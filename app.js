require('dotenv').config()
const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose')
const cors          = require('cors')

//Middleware
app.use(bodyParser())
app.use(cors())

//import routes
const bayiRoutes = require('./routes/bayi')
const userRoutes = require('./routes/auth')
const passwordReset = require('./routes/passwordReset')

app.use(express.json());

//routes
app.use('/bayi', bayiRoutes)
app.use('/user', userRoutes)
app.use('/forgot', passwordReset)

//connect to db
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'Database connect Error!'))
db.once('open', () => {
    console.log('Database is Connected')
})

//listen port 
app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
});