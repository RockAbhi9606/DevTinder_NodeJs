const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const app = express();

app.use("/admin", adminAuth)

app.get("/user/login", (req, res) => {
    res.send("user auth Data");
})
app.get("/user/data", userAuth, (req, res) => {
    res.send("user auth Data");
})

app.get("/admin/getAllData", (req, res, next) => {
    console.log("admin get all data");
    res.send("admin Data");

});

app.get("/admin/deleteUser", (req, res) => {
    console.log("admin delete user")
    res.send("admin delete Data");

});

app.listen(8080, () => {
    console.log('listening on 8080 port.....');
})