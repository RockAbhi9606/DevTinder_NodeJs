const express = require('express');
const app = express();
const connectDb = require("./config/database");
const User = require('./models/user')

app.use(express.json())

//post api for user signup
app.post("/signup", async (req, res) => {
  //create a new instance of User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User successfully added into the database");
  } catch (err) {
    res.status(400).send(`Error while adding user: ${err.message}`);
  }
})

//get api for user find by emailId
app.get("/user", async (req, res) => {
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
app.get('/allUsers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
})

//get api for getting only one user
app.get('/oneUser', async (req, res) => {
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
app.delete('/user', async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.body.userId })
    res.send("User Successfully Deleted")
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
})

//User Update Api
app.patch('/user', async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, data,
      { returnDocument: 'after', 
        runValidators: true
      })
    res.send("User updated successfully")
    console.log(user)
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
})

connectDb().then(() => {
  console.log("Database Connection Successfull...")
  app.listen(8080, () => {
    console.log('listening on 8080 port.....');
  })
}).catch(err => {
  console.log("Database Connection Failed!!!")
})

