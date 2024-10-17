const validator = require('validator');
const validationSignUpData = (req) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Invalid firstName or lastName")
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
}

module.exports = {
    validationSignUpData
}