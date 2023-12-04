const {response} = require('express')
const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/'
mongoose.connect(connectionString, {})

const db = mongoose.connection
const questions = ["Question 1:Do you like Call of Duty?", "Question 2: Do you Like Persona", "Question 3: Do you like Stardew Valley"]


db.on('error', console.error.bind(console, 'DB connection error'))

db.once('open', callback => {})

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
});
let User = mongoose.model('User_Data', userSchema)

//views
exports.index = (req, res) => {
    
    User.find({})
    .then(() => {       
            res.render('index', {
                title: 'Welcome! Lets have a quick test.',
                questions: questions
            });
        //res.render
        })
        .catch((err) => {
            return console.error(err);
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