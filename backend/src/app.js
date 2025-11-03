const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World! kya re pandu, javlas kaay re 😎')
})

app.use('/ai', aiRoutes)

module.exports = app