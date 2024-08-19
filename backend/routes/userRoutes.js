const express = require("express");
const Router = express.Router();

const { signup, login} = require("../controllers/userHandler"); 

Router.post('/signup', signup);
Router.post('/login', login);
// Router.post('/edit', editProfile);

module.exports = Router;
