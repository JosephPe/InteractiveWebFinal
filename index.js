const exp = require('constants')
const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', routes.index)
app.get('/users', routes.users)
app.get('/signup', routes.signup)
app.get('/login', routes.login)

app.listen(3000)