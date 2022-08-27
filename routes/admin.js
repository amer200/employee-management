const express = require('express');
const route = express.Router();
const adminControllers = require('../controllers/admin');
const employeeMiddleWare = require('../middlewares/employee');


route.get('/', adminControllers.getMainPage);
route.post('/add-employee', employeeMiddleWare, adminControllers.addEmployee);
route.get('/edit-emp/:id', adminControllers.getEditEmployee);
route.post('/edit-employee/:id', adminControllers.editEmployee);
route.post('/remove-emp/:id', adminControllers.removeEmp);
module.exports = route