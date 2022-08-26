const express = require('express');
const route = express.Router();
const adminControllers = require('../controllers/admin');


route.get('/', adminControllers.getMainPage);
module.exports = route