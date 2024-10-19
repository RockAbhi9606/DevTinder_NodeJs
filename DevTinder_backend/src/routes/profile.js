const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const profileRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateEditProfileData, validateProfilePassword } = require('../utils/validation');

//get api for profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        //validate the token
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

//User Update Api
profileRouter.patch('/profile/edit/', userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save()
        //res.send(`${loggedInUser.firstName} your profile is Updated Successfully...!`)
        res.json({
            message: `${loggedInUser.firstName} your profile is Updated Successfully...!`,
            data: loggedInUser
        })
    } catch (err) {
        res.status(400).send("Updates Failed: " + err.message);
    }
})

//User Password Change
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

        // Validate the new password
        validateProfilePassword(req);

        // Check if the old password matches
        const passwordMatch = await user.validatePassword(oldPassword);
        if (!passwordMatch) {
            return res.status(400).send("Old password does not match");
        }

        // Hash the new password and save
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send("Password changed successfully");
    } catch (err) {
        res.status(400).send(`Updates Failed: ${err.message}`);

    }
})

module.exports = profileRouter;