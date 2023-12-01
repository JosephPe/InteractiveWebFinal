const email = document.getElementById("email")
const username = document.getElementById("username")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("passwordConfirm")
const emailReply = document.getElementById("emailReply")
const usernameAlreadyExistsReply = document.getElementById('usernameAlreadyExistsReply')
const usernameRegexReply = document.getElementById('usernameRegexReply')
const passwordReply = document.getElementById("passwordReply")
const passwordConfirmReply = document.getElementById("passwordConfirmReply")
const reply = document.getElementById("reply")

let validEmailInput = false
let validUsernameInput = false
let validPasswordInput = false
let validPasswordConfirmInput = false

//TEMPORARY
let notInDatabase = true



const validate = () => {
    validateEmailInput()
    validateUsernameInput()
    validatePasswordInput()
    validatePasswordConfirmInput()

    if(validEmailInput && validUsernameInput && validPasswordInput && validPasswordConfirmInput){
        return true
    }else{
        reply.classList.remove('hide')
        return false
    }
}

const validateEmailInput = () => {
    let emailInput = email.value
    let emailForm = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailInput)
    if(emailForm){
        //can get database information and make unique emails later if time,
        // would be something like going thru all the emails in the database,
        // seeing if it's in the database, if it isn't they make an account,
        // if it is it throws the error (keeps it false and outputs some
        // reply text)
        validEmailInput = true
        //add email to database
        emailReply.classList.add('hide')
        console.log("true")
    }else{
        emailReply.classList.remove('hide')
        console.log("false")
    }
}

const validateUsernameInput = () => {
    let usernameInput = username.value
    let usernameForm = /^[a-zA-Z0-9-_]{5,}$/.test(usernameInput)
    if(usernameForm){
        usernameRegexReply.classList.add('hide')
        //some database stuff to see if username already exists
        if(notInDatabase){
            validUsernameInput = true
            usernameAlreadyExistsReply.classList.add('hide')
            console.log("true")
        }else{
            usernameAlreadyExistsReply.classList.remove('hide')
            console.log("false/alreadyindatabase")
        }
    }else{
        usernameRegexReply.classList.remove('hide')
        console.log("false")
    }
}

const validatePasswordInput = () => {
    let passwordInput = password.value
    let passwordForm = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\[\]{};:'"<>,./?]).{8,}$/.test(passwordInput)
    if(passwordForm){
        validPasswordInput = true
        passwordReply.classList.add('hide')
        console.log("true")
    }else{
        passwordReply.classList.remove('hide')
        console.log('false')
    }
}

const validatePasswordConfirmInput = () => {
    let passwordConfirmInput = passwordConfirm.value
    let passwordInput = password.value
    if(passwordInput == passwordConfirmInput){
        validPasswordConfirmInput = true
        passwordConfirmReply.classList.add('hide')
        console.log("true")
    }else{
        passwordConfirmReply.classList.remove('hide')
        console.log("false")
    }
}

email.addEventListener('input', validateEmailInput)
username.addEventListener('input', validateUsernameInput)
password.addEventListener('input', validatePasswordInput)
passwordConfirm.addEventListener('input', validatePasswordConfirmInput)