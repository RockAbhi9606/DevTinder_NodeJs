const express = require('express');
const { userAuth } = require('../middlewares/userAuth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const clientRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName gender age about photoUrl skills";

clientRouter.get("/client/requests/pending", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const pendingRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA); //other way to write
        // }).populate("fromUserId",["firstName","lastName","gender","age","about","photoUrl","skills"]);

        res.json({
            message: "Data fetch Successfully",
            data: pendingRequests
        })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

clientRouter.get("/client/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);
        const data = connectionRequests.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.json({ data })
    } catch (err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

clientRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId")

        const hideUserFromFeed = new Set();
        connectionRequest.forEach(req => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA)
            .skip(skip).limit(limit);

        res.send(users);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = {
    clientRouter
}