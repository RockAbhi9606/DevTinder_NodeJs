const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
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
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address: ' + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Enter a strong Password: ' + value);
            }
        }
        //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
    },
    age: {
        type: Number,
        max: 100,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is invalid");
            }

        }
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

},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);