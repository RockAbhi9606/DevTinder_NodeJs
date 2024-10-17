const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const profileRouter = express.Router();

//get api for profile
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        //validate the token
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


module.exports = profileRouter;