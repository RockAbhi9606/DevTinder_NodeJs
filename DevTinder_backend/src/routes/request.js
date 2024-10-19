const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const requestRouter = express.Router();

//post api for sendinConnectionRequest
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        });

        //1st flos if enter accepted it stored in db
        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type :" + status });
        }

        //2nd flos check toUserId
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            res.status(400).json({ message: "User not found" })
        }

        //3rd flos if user1 send request to user2 then status is in "interested" then user2 not 
        //able to send request user1."If there is an existing connection request"
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists" })
        }

        //4th flos check same self id - use pre - connectionRequest.js

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + ( status === "interested" ? " in " : " ") + toUser.firstName,
            data
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})


module.exports = requestRouter;