const Employee = require('../models/employee');
const fs = require('fs');
const QRCode = require('qrcode');
exports.getMainPage = (req, res) => {
    Employee.find()
        .then(employees => {
            res.render('admin/index', {
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
    Employee.findById(id)
        .then(e => {
            res.render('admin/edit-emp', {
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
        .catch(err =>{
            console.log(err)
        })
}