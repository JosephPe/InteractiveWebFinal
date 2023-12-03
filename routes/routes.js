const express = require('express');
const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/';
mongoose.connect(connectionString, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error'));

db.once('open', callback => {});

const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

exports.index = (req, res) => {
    res.render('index', {
        title: 'title'
    });
};

exports.users = (req, res) => {
    res.render('users', {
        title: 'users'
    });
};

exports.signup = (req, res) => {
    res.render('signup', {
        title: 'create account'
    });
};

exports.login = (req, res) => {
    res.render('login', {
        title: 'login'
    })
}

exports.postSignup = async (req, res) => {
    console.log('POST /signup received');
    let { age, email, username, password } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'email already exists' });
        }
        let existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'username already exists' });
        }
        let newUser = new User({ age, email, username, password });
        await newUser.save();
        console.log('User created successfully');
        return res.redirect('/');
    } catch (error) {
        console.error('error creating user:', error);
        return res.status(500).json({ error: 'server error' });
    }
};

exports.postLogin = async (req, res) => {
    console.log('POST /login received');
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        if (password === user.password) {
            return res.redirect('/');
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('error during login:', error);
        return res.status(500).json({ error: 'server error' });
    }
};