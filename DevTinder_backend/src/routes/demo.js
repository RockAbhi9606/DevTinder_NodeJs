const express = require('express');
const User = require('../models/user');
const validator = require('validator');
const demoRouter = express.Router();

demoRouter.use(express.json());
//get api for user find by emailId
demoRouter.get("/user", async (req, res) => {
    const email = req.body.email;
    try {
        const users = await User.find({ email: email })
        if (users.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
})

//get api for getting all the users
demoRouter.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

//get api for getting only one user
demoRouter.get('/oneUser', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

//User Delete Api
demoRouter.delete('/user', async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.body.userId })
        res.send("User Successfully Deleted")
    } catch (err) {
        res.status(500).send("Something went wrong");
    }
})

//User Update Api
demoRouter.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update not Allowed");
        }

        if (data?.skills.length > 10) {
            throw new Error("skills can not be more than 10");
        }

        if (data?.photoUrl && !validator.isURL(data?.photoUrl)) {
            throw new Error("photoUrl is not valid");
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data,
            {
                returnDocument: 'after',
                runValidators: true
            })
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Updates Failed: " + err.message);
    }
})

module.exports = demoRouter;