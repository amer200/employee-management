require('dotenv').config();
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
        .then(employees => {
            res.render(`admin-${lang}/index`, {
                employees: employees,
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