const express = require('express');
const {authenticateToken} = require ("../controllers/AuthenticateToken");
const {checkAdmin} = require('../controllers/checkAdmin');
const {adminMenuAdding} = require ("../controllers/adminMenuAdding");
const { selectLunch } = require('../controllers/selectLunch');
const selectLunchRoute = express.Router();
selectLunchRoute.post('/olmm/selectlunch',authenticateToken,selectLunch);

module.exports=selectLunchRoute;