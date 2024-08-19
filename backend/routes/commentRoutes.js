const express = require("express");
const Router = Router.express();
import { getComment } from "../controllers/commentHandler";
import { createComment } from "../controllers/commentHandler";

Router.get('/comments', getComment);
Router.post('/comments/create', createComment);

module.exports = Router;