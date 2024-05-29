const express = require('express');
const {employeeChoices} = require("../controllers/employeeChoices");
const {authenticateToken} = require ("../controllers/AuthenticateToken");
const {checkAdmin} = require('../controllers/checkAdmin');
const employeeChoicesRoute = express.Router();
employeeChoicesRoute.get('/olmm/employeechoices',authenticateToken,checkAdmin,employeeChoices);

module.exports=employeeChoicesRoute;