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

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "age", "gender", "about", "photoUrl", "skills"];
    const isEditAllowed = Object.keys(req.body).every(k => allowedEditFields.includes(k));
    return isEditAllowed;
}

const validateProfilePassword = (req) => {
    const { newPassword } = req.body;
    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Please enter a strong password");
    }
}
module.exports = {
    validationSignUpData, validateEditProfileData, validateProfilePassword
}