var cloudinary = require('cloudinary').v2;

exports.configureCloudinary = async () => {
    try {
        // Configuration
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Successfully connected to Cloudinary");
    } catch (e) {
        console.error("Error while connecting to Cloudinary", e);
    }
};
