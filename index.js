const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    response(200, "SUCCESS", 'API ready', res)
})

// GET ALL DATA FROM MAHASISWA
app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        // result => adalah semua data dari tabel mahasiswa di DB

        // jika terjadi error maka perintah dibawah tidak dijalankan
        // if (err) throw err

        response(200, "SUCCESS", result, res)
    })
})

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, result) => {
        response(200, "SUCCESS", result, res)
    })

})

// CREATE
app.post('/mahasiswa', (req, res) => {
    const { nim, nama_lengkap, kelas, alamat} = req.body
    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}');`
    
    db.query(sql, (err, result) => {

        if (err) {
            response(500, 'invalid', 'error', res)
        }

        if (result?.affectedRows) {
            // response(200, result.insertId, "Data Added", res)
            response(200, 'UPSERT SUCCESS', '', res)
        }
    })

})

// UPDATE
app.put('/mahasiswa', (req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`

    
    db.query(sql, (err, result) => {
        if (err) {
            response(500, 'invalid', 'error', res)
        }

        if (result?.affectedRows) {
            response(200, 'UPDATE SUCCESS', '', res)
        } else {
            response(500, 'user not found', 'error', res)
        }
    })

})

// DELETE
app.delete('/mahasiswa', (req, res) => {
    const { nim } = req.body
    const sql  = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    db.query(sql, (err, result) => {
        if (err) {
            response(500, 'invalid', 'error', res)
        }

        if (result?.affectedRows) {
            response(200, 'DELETE SUCCESS', '', res)
        } else {
            response(500, 'user not found', 'error', res)
        }
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})