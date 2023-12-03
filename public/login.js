const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const reply = document.getElementById("reply");

let validEmail = false;
let correctPassword = false;

const validate = async () => {
    await validateEmailInput();
    await validatePasswordInput();

    if (validEmail && correctPassword) {
        return true;
    } else {
        reply.classList.remove('hide');
        return false;
    }
};

const validateEmailInput = async () => {
    let email = emailInput.value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
        validEmail = true;
        reply.classList.add('hide');
        console.log("true");
    } else {
        validEmail = false;
        console.log("false");
    }
};

const validatePasswordInput = async () => {
    let password = passwordInput.value;
    correctPassword = true;
    reply.classList.add('hide');
    console.log("true");
};