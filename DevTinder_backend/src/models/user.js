const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectionRequest = require('./connectionRequest');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address: ' + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Enter a strong Password: ' + value);
            }
        }
        //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
    },
    about: {
        type: String,
        default: "About section"
    },
    age: {
        type: Number,
        max: 100,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} of gender is incorrect`
        },
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Gender data is invalid");
        //     }

        // }
    },
    photoUrl: {
        type: String,
        default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error('Invalid URL: ' + value);
        //     }
        // }
    },
    skills: {
        type: [String],
    }

}, {
    timestamps: true
})

//compound indexing
userSchema.index({ firstName: 1, lastName: 1 })

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder@1996", { expiresIn: '1h' });
    return token;
}

userSchema.methods.validatePassword = async function (passwordEnterByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordEnterByUser,
        passwordHash
    )
    return isPasswordValid;
}

module.exports = mongoose.model('User', userSchema);