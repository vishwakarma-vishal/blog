const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');

// get all the posts
exports.getAllPostsHandler = async (req, res) => {
    try {
        const posts = await Post.find({});

        // send the response
        res.status(200).json({
            success: true,
            message: "All the posts are fetchecd successfully",
            data: posts,
        });
    } catch (e) {
        res.status(500).json({
            success: true,
            message: "An error occured",
            error: e.message,
        });
    }
}

// get one post with id
exports.getPostHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('comments');

        // post doesn't find
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Create a new post
exports.createPostHandler = async (req, res) => { 
    const { title, description, author, category, userId } = req.body;

    // Log the request body and files
    console.log("Body->", req.body);
    console.log("Files->", req.files);

    // Ensure that a file is uploaded
    if (!req.files || !req.files.thumbnail) {
        return res.status(400).json({
            success: false,
            message: "Thumbnail file is required"
        });
    }

    const thumbnail = req.files.thumbnail;
    const uploadPath = path.join(__dirname, '..', 'thumbnails', thumbnail.name);

    try {
        // Use the mv() method to place the file somewhere on your server
        await thumbnail.mv(uploadPath);

        // Upload the file to Cloudinary
        const options = {
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            folder: "zupay-blog/posts" 
        };

        const result = await cloudinary.uploader.upload(uploadPath, options);

        // Remove the local file after uploading to Cloudinary
        // fs.unlinkSync(uploadPath);

        // Create a new post in the database
        const newPost = await Post.create({
            title,
            description,
            author,
            category,
            thumbnailUrl: result.secure_url // Use the Cloudinary URL
        });

        // Find the user by author (assuming author is the user's ID)
        const existingUser = await User.findById(userId);

        if (existingUser) {
            // Add the new post's ID to the user's posts array
            existingUser.posts.push(newPost._id);

            // Save the updated user document
            await existingUser.save();
        }

        res.status(200).json({
            success: true,
            message: "Post is successfully created",
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update a post by id
exports.updatePostHandler = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    console.log("updates", updates);

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete a post by ID
exports.deletePostHandler = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the post to ensure it exists and retrieve its ID
        const postToDelete = await Post.findById(id);

        if (!postToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        // Find the user whose posts array contains this post ID
        const existingUser = await User.findOne({ posts: id });

        if (existingUser) {
            // Remove the post ID from the user's posts array
            existingUser.posts = existingUser.posts.filter(postId => postId.toString() !== id);

            // Save the updated user document
            await existingUser.save();
        }

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
