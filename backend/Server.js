const express = require("express");
const dotenv = require("dotenv");
//intialize app
const app = express();

// middleware
app.use(express.json());
dotenv.config();

//started server
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server is running on Port -> ${PORT}`)
);

//database connectio
const dbConnect = require('./config/database');
dbConnect();

//routes
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes); 

const postRoutes = require("./routes/postRoutes");
app.use(postRoutes);