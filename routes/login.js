const emailUsername = document.getElementById("emailUsername")
const passwordInput = document.getElementById("password")
const reply = document.getElementById("reply")

let validEmailUser = false
let correctPassword = false

const validate = () => {
    validateEmailUsernameInput()
    validatePasswordInput()

    if(validEmailUser && correctPassword){
        return true
    }else{
        reply.classList.remove('hide')
        return false
    }
}

const validateEmailUsernameInput = () => {
    let emailUser = emailUsername.value
    let databaseEmailUser = "test"

    if(emailUser == databaseEmailUser){
        validEmailUser = true
        reply.classList.add('hide')
        console.log("true")
    }else{
        console.log("false")
    }
}

const validatePasswordInput = () => {
    let userPassword = passwordInput.value
    let databasePassword = "test"

    if(userPassword == databasePassword){
        correctPassword = true
        reply.classList.add('hide')
        console.log("true")
    }else{
        console.log('false')
    }
}