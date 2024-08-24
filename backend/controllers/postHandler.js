const User = require('../models/user');
const Post = require("../models/post");
const path = require('path');
const fs = require('fs');

// Create a new post
exports.createPostHandler = async (req, res) => {
    const { title, description, author, category, userId } = req.body;

    if (!req.files || !req.files.thumbnail) {
        return res.status(400).json({
            success: false,
            message: "Thumbnail file is required"
        });
    }

    try {
        // Ensure the 'files' directory exists
        const filesDir = path.join(__dirname, 'files');
        if (!fs.existsSync(filesDir)) {
            fs.mkdirSync(filesDir);
        }

        const file = req.files.thumbnail;

        // Create a unique filename
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(filesDir, fileName);

        // Move the file to the designated directory
        file.mv(filePath, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error saving the file',
                    error: err.message
                });
            }
        });

        // Create the URL to access the uploaded file
        const thumbnailUrl = `/files/${fileName}`;

        // Create a new post in DB
        const newPost = await Post.create({
            title,
            description,
            author,
            category,
            thumbnailUrl
        });

        // Find the user by user ID
        const existingUser = await User.findById(userId);
        if (existingUser) {
            existingUser.posts.push(newPost._id);
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

// Get one post with id
exports.getPostHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('comments');

        // post doesn't find
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
                error: error.message
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

// Get all the posts
exports.getAllPostsHandler = async (req, res) => {
    try {
        const posts = await Post.find({});

        // send the response
        res.status(200).json({
            success: true,
            message: "All the posts are fetched successfully",
            data: posts,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "An error occured",
            error: e.message,
        });
    }
}

// Update a post by id
exports.updatePostHandler = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Find the existing post
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        let thumbnailUrl = post.thumbnailUrl;

        // Check if a new thumbnail is uploaded
        if (req.files && req.files.thumbnail) {
            // Delete the old thumbnail if it exists
            if (thumbnailUrl) {
                const oldFilePath = path.join(__dirname, 'files', path.basename(thumbnailUrl));
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            const file = req.files.thumbnail;
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(__dirname, 'files', fileName);

            // Move the new file to the designated directory
            file.mv(filePath, (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error saving the file',
                        error: err.message
                    });
                }
            });

            thumbnailUrl = `/files/${fileName}`;
        }

        // Update the post with the provided updates
        const updatedPost = await Post.findByIdAndUpdate(id, { ...updates, thumbnailUrl }, { new: true });

        res.status(200).json({
            success: true,
            data: updatedPost
        });
    } catch (error) {
        console.error("Error updating post:", error);
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
        // Find the post to delete
        const postToDelete = await Post.findById(id);

        if (!postToDelete) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        // to delete the thumbnail
        if (postToDelete.thumbnailUrl) {
            const fileName = path.basename(postToDelete.thumbnailUrl);
            const filePath = path.join(__dirname, 'files', fileName);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        }

        // update the user doc in DB
        const existingUser = await User.findOne({ posts: id });

        if (existingUser) {
            existingUser.posts = existingUser.posts.filter(postId => postId.toString() !== id);
            await existingUser.save();
        }

        res.status(200).json({
            success: true,
            message: 'Post and thumbnail deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

