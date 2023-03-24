const express = require('express')
const app = express()
const mhsRoutes = require('./src/routes/mahasiswa')

app.use('/', mhsRoutes)