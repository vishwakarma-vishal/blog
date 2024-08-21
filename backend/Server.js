const express = require("express");
const dotenv = require("dotenv");
const app = express(); //intialize app
const cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require('path');

// middleware
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(fileUpload());

// Serve static files from the 'thumbnails' directory
app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')));

//started server
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server is running on Port -> ${PORT}`)
);

//database connection
const dbConnect = require('./config/database');
dbConnect();

//media server connection
const {configureCloudinary} = require("./config/cloudinary");
configureCloudinary();

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);