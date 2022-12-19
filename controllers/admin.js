require('dotenv').config();
const xlsx = require('xlsx');
const Employee = require('../models/employee');
const User = require('../models/user');
const fs = require('fs');
const QRCode = require('qrcode');
exports.getMainPage = (req, res) => {
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    Employee.find()
        .limit(10)
        .then(employees => {
            res.render(`admin-${lang}/index`, {
                employees: employees,
                searchMsg: false
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addEmployee = (req, res) => {
    const id = res.locals.eId;
    Employee.findById(id)
        .then(e => {
            if (!e) {
                res.send("err can't fount employee!")
            } else {
                QRCode.toDataURL(e._id.toString(), function (err, url) {
                    e.qr = url;
                    return e.save()
                })
            }
        })
        .then(resu => {
            res.redirect('/admin')
        })
}
exports.getEditEmployee = (req, res) => {
    const id = req.params.id;
    let lang = 'ar';
    if (req.session.lang) {
        lang = req.session.lang
    }
    Employee.findById(id)
        .then(e => {
            res.render(`admin-${lang}/edit-emp`, {
                e: e
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.editEmployee = (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const data = req.body.data;
    let imgPath;
    const empData = [];
    for (i = 0; i <= title.length - 1; i++) {
        const e = [title[i], data[i]];
        empData.push(e)
    }
    Employee.findById(id)
        .then(e => {
            if (req.file) {
                imgPath = req.file.path.split('public')[1];
                fs.unlink(`public${e.img}`, () => {

                })
            } else {
                imgPath = req.body.imgpath;
            }
            e.data = empData;
            e.img = imgPath;
            return e.save();
        })
        .then(e => {
            res.redirect(`/admin/edit-emp/${e._id}`)
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
                res.render(`admin-${lang}/index`, {
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
                res.render(`admin-${lang}/index`, {
                    employees: emp,
                    searchMsg: searchMsg
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeEmp = (req, res) => {
    const id = req.params.id;
    Employee.findByIdAndRemove(id)
        .then(e => {
            fs.unlink(`public${e.img}`, () => {
                res.redirect('/admin')
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getLogIn = (req, res) => {
    res.render('admin-ar/login', {
        message: false
    })
}
exports.postLogIn = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({ name: name })
        .then(u => {
            if (!u) {
                res.render('admin-ar/login', {
                    message: 'wrong user !'
                })
            } else {
                if (u.password == password) {
                    req.session.user = u.rolle;
                    if (u.rolle == 'admin') {
                        res.redirect('/admin');
                    } else {
                        res.redirect('/emp');
                    }
                } else {
                    res.render('admin-ar/login', {
                        message: 'wrong password !'
                    })
                }
            }
        })
}
exports.logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/admin')
}
exports.changeLang = (req, res) => {
    const lang = req.params.l;
    req.session.lang = lang;
    if (req.session.user == 'admin') {
        res.redirect('/admin')
    } else {
        res.redirect('/emp')
    }
}
exports.changeAdminPassword = (req, res) => {
    const password = req.body.password;
    User.findOne({ name: 'admin' })
        .then(u => {
            u.password = password;
            u.save();
        })
        .then(resu => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.changeEmpPassword = (req, res) => {
    const password = req.body.password;
    User.findOne({ name: 'emp' })
        .then(u => {
            u.password = password;
            u.save();
        })
        .then(resu => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.createExelSheet = (req, res) => {

    // let Headers = ['ChangeId', 'ChangeDescription', 'ChangeDate', 'Enhancement/Fix', 'ExcutorTeam'];
    // let Data = [['INC1234', 'Multiple Cert cleanup', '04/07/2022', 'Enhancement', 'IlevelSupport']];
    function removeDuplicates(arr) {
        const arrLowerCase = [];
        arr.forEach(e => {
            arrLowerCase.push(e.toLowerCase())
        })
        return arrLowerCase.filter((item,
            index) => arr.indexOf(item) !== index);
    }
    Employee.find()
        .then(emps => {
            let Headers = [];
            let Data = [];
            let cols = [];
            emps.forEach(emp => {
                emp.data.forEach(d => {
                    Headers.push(d[0])
                    cols.push(d)

                })
            })
            Headers = removeDuplicates(Headers);
            let workbook = xlsx.utils.book_new();
            let worksheet = xlsx.utils.aoa_to_sheet([]);

            xlsx.utils.book_append_sheet(workbook, worksheet);

            xlsx.utils.sheet_add_aoa(worksheet, [Headers], { origin: 'A1' });
            xlsx.utils.sheet_add_aoa(worksheet, [Data], { origin: 'A2' });


            xlsx.writeFile(workbook, "employees.xlsx");
        })
        .catch(err => {
            console.log(err)
        })
    // let workbook = xlsx.utils.book_new();
    // let worksheet = xlsx.utils.aoa_to_sheet([]);

    // xlsx.utils.book_append_sheet(workbook, worksheet);

    // xlsx.utils.sheet_add_aoa(worksheet, [Headers], { origin: 'A1' });
    // xlsx.utils.sheet_add_aoa(worksheet, [Data], { origin: 'A2' });


    // xlsx.writeFile(workbook, "Test.xlsx");
}