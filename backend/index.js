const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const router = require("./src/routes/router.js");
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();

// Server Port
const APP_PORT = process.env.APP_PORT || 3000;
// Express Server
const app = express();

mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/athlete' , function(err) {
    if(err){
        console.log('Database connection failed '+ err);
    }else{
        console.log('Database connection success');
    }
});

app.use(express.json());
app.use(cors());
app.use("/api", router);


// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });


app.listen(APP_PORT, () => console.log("Server running on port " + APP_PORT));

