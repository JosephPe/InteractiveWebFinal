const express = require('express');
const path = require('path');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');

const urlEncodedParser = bodyParser.urlencoded({ extended: true });
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index)
app.get('/users', routes.users)
app.get('/signup', routes.signup)
app.get('/login', routes.login)
app.post('/signup', urlEncodedParser, routes.postSignup)
app.post('/login', urlEncodedParser, routes.postLogin)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});