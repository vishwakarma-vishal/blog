const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require('path');
const app = express(); //intialize app

// middleware
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/' 
}));

// Serve static files from the 'thumbnails' directory
app.use('/files', express.static(path.join(__dirname, './controllers/files')));

// start the server
const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server is running on Port -> ${PORT}`)
);

//database connection
const dbConnect = require('./config/database');
dbConnect();

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);