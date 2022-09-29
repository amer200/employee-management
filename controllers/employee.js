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
                searchMsg: false
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
exports.searchForEmpByName = (req, res) => {
    const name = req.body.name;
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    Employee.find()
        .then(emps => {
            let e;
            emps.forEach(emp => {
                if (emp.data[0].includes(name)) {
                    e = emp;
                }
            })
            if (e) {
                const emp = [e];
                res.render(`main-${lang}/index`, {
                    employees: emp,
                    searchMsg: false
                })
            } else {
                const emp = [];
                let searchMsg;
                if (lang == 'ar') {
                    searchMsg = 'لا يوجد موظف بهذا الاسم';
                } else {
                    searchMsg = 'not found !';
                }
                res.render(`main-${lang}/index`, {
                    employees: emp,
                    searchMsg: searchMsg
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}