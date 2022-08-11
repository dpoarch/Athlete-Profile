const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const router = require("./src/routes/router.js");
const mongoose = require('mongoose');
dotenv.config();

// Server Port
const HOST = '0.0.0.0';
const PORT = process.env.PORT || 8182;

// Express Server
const app = express();

// MongoDB Connection
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

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

app.get("/", function(req, res) {
    res.send({ message: "initial startup"});
});

app.listen(PORT, HOST, () => console.log("Server running on port " + PORT));

