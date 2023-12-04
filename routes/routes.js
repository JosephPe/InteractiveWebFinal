const express = require('express');
const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/';
mongoose.connect(connectionString, {});


const db = mongoose.connection
//questions and answers, based on the exports. stuff
const questions = [
    {
        question: "Whats 9+10???",
        answers: ["19", "21", "You stupid", "No I not"]
    },
    {
        question: "Example 2",
        answers: ["ayup", "mhm", "This is not even a question", "Sure"]
    },
    {
        question: "9+10???",
        answers: ["This again?", "Tf", "Oh nahh", "Hole up"]
    },
    {
        question: "Can you smellllll",
        answers: ["What", "The rock", "Is", "Cooking"]
    },
]
//increment which options are clicked
let optionCounts = {
    optionA: 0,
    optionB: 0,
    optionC: 0,
    optionD: 0,
};

function handleAnswer(questionId, selectedOption) {
    //gather percentage
    optionCounts[selectedOption]++;
    const totalResponses = optionCounts.optionA + optionCounts.optionB + optionCounts.optionC + optionCounts.optionD;

    const percentageA = (optionCounts.optionA / totalResponses) * 100;
    
    const percentageB = (optionCounts.optionB / totalResponses) * 100;
    
    const percentageC = (optionCounts.optionC / totalResponses) * 100;
    
    const percentageD = (optionCounts.optionD / totalResponses) * 100;

    //Display percentage
    document.getElementById(`optionAPercentage_${questionId}`).innerText = `Option A: ${percentageA}%`;
    
    document.getElementById(`optionBPercentage_${questionId}`).innerText = `Option B: ${percentageB}%`;
    
    document.getElementById(`optionCPercentage_${questionId}`).innerText = `Option C: ${percentageC}%`;
    
    document.getElementById(`optionDPercentage_${questionId}`).innerText = `Option D: ${percentageD}%`;
}


db.on('error', console.error.bind(console, 'DB connection error'));

db.once('open', callback => {});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
age: {
    type: Number,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
},
answer1:
{
    type: Number,
    required: false
},
answer2:
{
    type: Number,
    required: false
},
answer3:
{
    type: Number,
    required: false
}
});

const User = mongoose.model('User', userSchema);

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

exports.postAnswers = (req, res) => {
    const answer = req.body.answer;
    User.findByIdAndUpdate(email, {answer: answer}, (err, user) => {
        console.log(email);
        console.log(answer);
        console.log(user);

        if (err) {
            res.status(500).send('Error updating user data');
        } else {
            res.status(200).send('User data updated');
        }
    })
}

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