const express = require("express");
const Router = express.Router();

const {getAllPostsHandler, getPostHandler, createPostHandler} = require("../controllers/postHandler");

Router.get('/posts', getAllPostsHandler);
Router.get('/posts/:id', getPostHandler);
Router.post('/posts/create', createPostHandler);
// Router.put('/posts/:id', updatePostHandler);
// Router.delete('/posts/:id', deletePostHandler);

module.exports = Router;