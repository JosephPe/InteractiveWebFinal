const age = document.getElementById("age")
const ageReply = document.getElementById("ageReply")
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


let validAgeInput = false
let validEmailInput = false
let validUsernameInput = false
let validPasswordInput = false
let validPasswordConfirmInput = false

//TEMPORARY
let notInDatabase = true



const validate = () => {
    validateAgeInput()
    validateEmailInput()
    validateUsernameInput()
    validatePasswordInput()
    validatePasswordConfirmInput()

    if(validAgeInput && validEmailInput && validUsernameInput && validPasswordInput && validPasswordConfirmInput){
        return true
    }else{
        reply.classList.remove('hide')
        return false
    }
}

const validateAgeInput = () => {
    let ageInput = age.value
    let ageForm = /^\d+$/.test(ageInput)
    if(ageForm){
        validAgeInput = true
        ageReply.classList.add('hide')
        console.log("true")
    }else{
        validAgeInput = false
        ageReply.classList.remove('hide')
        console.log("false")
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
        validEmailInput = false
        emailReply.classList.remove('hide')
        console.log("false")
    }
}

const validateUsernameInput = () => {
    let usernameInput = username.value
    let usernameForm = /^[a-zA-Z0-9-_]{5,}$/.test(usernameInput)
    if(usernameForm){
        usernameRegexReply.classList.add('hide')
        if(notInDatabase){
            validUsernameInput = true
            usernameAlreadyExistsReply.classList.add('hide')
            console.log("true")
        }else{
            validUsernameInput = false
            usernameAlreadyExistsReply.classList.remove('hide')
            console.log("false/alreadyindatabase")
        }
    }else{
        validUsernameInput = false
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
        validPasswordInput = false
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
        validPasswordConfirmInput = false
        passwordConfirmReply.classList.remove('hide')
        console.log("false")
    }
}

age.addEventListener('input', validateAgeInput)
email.addEventListener('input', validateEmailInput)
username.addEventListener('input', validateUsernameInput)
password.addEventListener('input', validatePasswordInput)
passwordConfirm.addEventListener('input', validatePasswordConfirmInput)