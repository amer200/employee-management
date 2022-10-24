const Employee = require('../models/employee');
exports.getMainPage = (req, res) => {
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    res.render(`main-${lang}/index`, {
        searchMsg: false
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
    const id = req.body.id.toString();
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    Employee.find()
        .then(emps => {
            let e;
            emps.forEach(emp => {
                if (emp.data[1].includes(id)) {
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
                    searchMsg = 'لا يوجد موظف بهذا الid';
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