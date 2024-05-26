const express = require('express');
const {login} = require('../controllers/Login');
const loginRoute = express.Router();
loginRoute.post('/olmm/login',login);

module.exports=loginRoute;