const express = require("express");
const Router = express.Router();

const { signup, login, getUser} = require("../controllers/userHandler"); 

Router.post('/signup', signup);
Router.post('/login', login);
Router.get('/users/:id', getUser);

module.exports = Router;
