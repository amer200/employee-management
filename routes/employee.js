const express = require('express');
const route = express.Router();
const employeeControllers = require('../controllers/employee');
const authControllers = require('../middlewares/auth');

route.get('/', authControllers.isEmployee, employeeControllers.getMainPage);
route.get('/show-emp/:id', authControllers.isEmployee, employeeControllers.getEmployee);
route.post('/search-emp', authControllers.isEmployee, employeeControllers.searchForEmpByName)

module.exports = route;