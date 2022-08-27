const Employee = require('../models/employee');
const createEmployee = (req, res, next) => {
    const title = req.body.title;
    const data = req.body.data;
    const imgPath = req.file.path.split('public')[1];
    const empData = [];
    for (i = 0; i <= title.length - 1; i++) {
        const e = [title[i], data[i]];
        empData.push(e)
    }
    const employee = new Employee({
        data: empData,
        img: imgPath
    })
    employee.save()
        .then(e => {
            res.locals.eId = e._id;
            next()
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = createEmployee;