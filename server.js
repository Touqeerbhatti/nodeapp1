require('dotenv').config()
const PORT=3000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database Start Coding please'))

app.use(express.json())

const subscribersRouter = require('./routes/userrouter')
app.use('/user', subscribersRouter)

app.listen(PORT, () => console.log('Server Started At ',PORT))