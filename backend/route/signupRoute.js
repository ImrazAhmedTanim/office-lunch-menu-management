const express = require('express');
const {signup} = require('../controllers/Signup');
const signupRoute = express.Router();
signupRoute.post('/olmm/signup',signup);

module.exports=signupRoute;