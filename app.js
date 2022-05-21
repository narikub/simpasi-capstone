const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//file storage multer

//Middleware
app.use(bodyParser())
app.use(cors())

//import routes
const bayiRoutes = require('./routes/bayi')
const userRoutes = require('./routes/auth')

//routes
app.use('/bayi', bayiRoutes);
app.use('/user', userRoutes)

//connect to db
mongoose.connect(process.env.DB_CONNECTION)
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connect Error!'))
db.once('open', () => {
    console.log('Database is Connected')
})

//listen port 
app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
});