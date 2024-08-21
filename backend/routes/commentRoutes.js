const express = require("express");
const Router = express.Router();
const { createComment } = require("../controllers/commentHandler");

Router.post('/posts/:postId/comments', createComment);

module.exports = Router;