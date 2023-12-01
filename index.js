const exp = require('constants')
const express = require('express'),
    pug = require('pug'),
    routes = require('./routes/routes.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', routes.index)

app.listen(3000)