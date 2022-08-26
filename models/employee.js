const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    data: Array,
    img: String
})

module.exports = mongoose.model('Employee', employeeSchema);