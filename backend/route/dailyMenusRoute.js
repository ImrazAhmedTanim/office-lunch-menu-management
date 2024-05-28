const express = require('express');
const {authenticateToken} = require ("../controllers/AuthenticateToken");
const {dailyMenus} = require("../controllers/dailyMenus")

const dailyMenusRoute = express.Router();
dailyMenusRoute.get('/olmm/dailymenu',authenticateToken,dailyMenus);

module.exports = dailyMenusRoute;