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

exports.users = (req, res) => {
    res.render('users', {
        title: 'users'
    })
}

exports.signup = (req, res) => {
    res.render('signup', {
        title: 'create account'
    })
}

exports.login = (req, res) => {
    res.render('login', {
        title: 'login'
    })
}