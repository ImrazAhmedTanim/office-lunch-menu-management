const express = require('express');
const {authenticateToken} = require ("../controllers/AuthenticateToken");
const {checkAdmin} = require('../controllers/checkAdmin');
const {adminMenuAdding} = require ("../controllers/adminMenuAdding");
const adminMenuRoute = express.Router();
adminMenuRoute.post('/olmm/adminmenu',authenticateToken,checkAdmin,adminMenuAdding);

module.exports=adminMenuRoute;