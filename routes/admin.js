const express = require('express');
const route = express.Router();
const adminControllers = require('../controllers/admin');
const employeeMiddleWare = require('../middlewares/employee');
const authControllers = require('../middlewares/auth');

route.get('/', authControllers.isAdmin, adminControllers.getMainPage);
route.get('/admin', authControllers.isAdmin, adminControllers.getMainPage);
route.post('/admin/add-employee', authControllers.isAdmin, employeeMiddleWare, adminControllers.addEmployee);
route.get('/admin/edit-emp/:id', authControllers.isAdmin, adminControllers.getEditEmployee);
route.post('/admin/edit-employee/:id', authControllers.isAdmin, adminControllers.editEmployee);
route.post('/admin/remove-emp/:id', authControllers.isAdmin, adminControllers.removeEmp);
route.get('/login', adminControllers.getLogIn);
route.post('/login', adminControllers.postLogIn);
route.get('/logout', authControllers.isAdmin, adminControllers.logOut);
route.get('/lang/:l', authControllers.isAdmin, adminControllers.changeLang);
module.exports = route