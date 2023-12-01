const {response} = require('express')
const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/'
mongoose.connect(connectionString, {})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'DB connection error'))

db.once('open', callback => {})

//views
exports.index = (req, res) => {
    res.render('index', {
        title: 'title'
    })
}