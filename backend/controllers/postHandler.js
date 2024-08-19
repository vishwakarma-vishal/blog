const Post = require('../models/Post');

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
        const post = await Post.findById(id);

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
    const { title, description, author } = req.body;

    try {
        const newPost = await Post.create({title, description, author});

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