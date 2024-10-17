const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const requestRouter = express.Router();

//post api for sendinConnectionRequest
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + " " + "send connection request");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})


module.exports = requestRouter;