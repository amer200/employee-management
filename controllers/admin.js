const employee = require('../models/employee');
const Employee = require('../models/employee');

exports.getMainPage = (req, res) => {
    Employee.find()
        .then(employees => {
            res.render('admin/index', {
                employees: employees
            })
        })
        .catch(err => {
            console.log(err)
        })
}