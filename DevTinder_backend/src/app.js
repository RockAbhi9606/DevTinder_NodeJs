const express = require('express');
const app = express();

app.use('/test', (req, res) => {
    res.send("Hello from server 8080")
})

app.use("/hello", (req, res) => {
    res.send("This is Hello method")
})

app.listen(8080, () => {
    console.log('listening on 8080 port.....')
})