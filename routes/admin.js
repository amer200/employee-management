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
route.post('/admin/search-emp', authControllers.isAdmin, adminControllers.searchForEmpByName);
route.get('/admin/create-exel', authControllers.isAdmin, adminControllers.createExelSheet);
route.post('/admin/remove-emp/:id', authControllers.isAdmin, adminControllers.removeEmp);
route.post('/admin/change-admin-password', authControllers.isAdmin, adminControllers.changeAdminPassword);
route.post('/admin/change-emp-password', authControllers.isAdmin, adminControllers.changeEmpPassword);
route.get('/login', adminControllers.getLogIn);
route.post('/login', adminControllers.postLogIn);
route.get('/logout', adminControllers.logOut);
route.get('/lang/:l', adminControllers.changeLang);
module.exports = route