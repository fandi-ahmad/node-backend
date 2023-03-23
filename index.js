const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        // res.send(result)
        response(200, "get all data from mahasiswa", result, res)
    })
})

app.get('/find', (req, res) => {
    const sql = `SELECT * FROM mahasiswa WHERE id = ${req.query.id}`
    db.query(sql, (error, result) => {
        response(200, 'find mahasiswa name', result, res)
    })
})

app.post('/login', (req, res) => {
    console.log(req.body)
    res.send('login berhasil')
})
app.put('/username', (req, res) => {
    console.log(req.body)
    res.send('update berhasil')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})