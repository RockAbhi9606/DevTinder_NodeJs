const express = require('express');
const { validationSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, gender, photoUrl } = req.body;
        //validation of signup data
        validationSignUpData(req);

        //Encript the password
        const passwordHash = await bcrypt.hash(password, 10);

        //create a new instance of User model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            age,
            gender,
            photoUrl
        });
        await user.save();
        res.send("User successfully added into the database");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

// post api for user login
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const validatePassword = await user.validatePassword(password);

        if (validatePassword) {
            //create a JWT token
            const token = await user.getJWT();

            //add token to the cookie and send response back to the user
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 360000) })
            res.send("Login Successful...!!");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

// post logout user
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("User logout successfully...!!!")
})


module.exports = authRouter;