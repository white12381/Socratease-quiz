const express = require("express");
const app = express();
const mongoose = require("mongoose");
const questionRoutes = require("./Routes/QuestionRoutes");
require("dotenv").config();


// MiddleWare
app.use(express.json());

// Connect to Mongodb
mongoose.connect(process.env.MONGO_URI, () => {
    app.listen(process.env.PORT, () => console.log(`app running on port ${process.env.PORT}`));
});


app.get('/',(req,res) => {
    res.status(200).json({message: "Home Response"});
});

app.use("/api", questionRoutes);

app.use( (req,res) => {
    res.status(404).json({error: "404 not found"})
})


