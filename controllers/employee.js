const Employee = require('../models/employee');
exports.getMainPage = (req, res) => {
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    Employee.find()
        .then(employees => {
            res.render(`main-${lang}/index`, {
                employees: employees,
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getEmployee = (req, res) => {
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    const id = req.params.id;
    Employee.findById(id)
        .then(employee => {
            if (employee) {
                res.render(`main-${lang}/show-emp`, {
                    e: employee
                });
            } else {
                res.send('not found !');
            }
        })
        .catch(err => {
            console.log(err)
        })
}