const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URL = process.env.DATABASE_URL;
    mongoose.connect(DB_URL)
        .then(() => {
            console.log("Successfully connected to the DB");
        })
        .catch((e) => {
            console.log("Error in connecting to the databse", e);
        });
}

module.exports = dbConnect;