const express=require("express");
const app=express();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const dotenv = require('dotenv');
app.use(express.json())
dotenv.config();
app.use(express.json());

const user=require("./routes/UserRoute");

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

    const PORT =  3000; // Default to port 3000 if not specified
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

app.use(user);

