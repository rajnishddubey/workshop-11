const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('error',err=>{
    console.log("connection intruppted with database")
});

mongoose.connection.on('connected',connected=>{
    console.log("connected with database")
});


app.use(express.json());

app.use("/user",require("./routes/user"));

app.listen(4000,()=>{
    console.log("server is running on 4000 port");
})