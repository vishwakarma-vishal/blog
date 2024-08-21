const Comment = require('../models/comment');
const Post = require('../models/Post');

// Create a new comment
exports.createComment = async (req, res) => {
    const { postId } = req.params;
    const { author, comment } = req.body;

    try {
        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        // Create the comment
        const newComment = new Comment({
            author,
            comment,
            post: postId,
        });

        // Save the comment
        await newComment.save();

        // Add the comment to the post's comments array
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({
            success: true,
            message: 'Comment created successfully',
            data: newComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
