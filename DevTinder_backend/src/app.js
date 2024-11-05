const express = require('express');
const app = express();
const connectDb = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const demoRouter = require('./routes/demo');
const { clientRouter } = require('./routes/client');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", demoRouter);
app.use("/", clientRouter);

connectDb().then(() => {
  console.log("Database Connection Successfull...")
  app.listen(8080, () => {
    console.log('listening on 8080 port.....');
  })
}).catch(err => {
  console.log("Database Connection Failed!!!")
})

