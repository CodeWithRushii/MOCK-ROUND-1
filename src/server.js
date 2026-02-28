const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
require("./config/db.config")

app.use(express.json());
app.use("/api", require("./routes/index"))



app.listen(PORT,(err) => {
    if (err) {
        console.log("error ", err);
        return false;
    }
    console.log("server is started");
    
})