const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect
        ("mongodb+srv://abhishekbande2014:Abhi%400601@namastenode.ua9vb.mongodb.net/devTinder")
}

module.exports = connectDb;

