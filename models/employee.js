const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
    data: Array,
    img: String,
    qr: String
})

module.exports = mongoose.model('Employee', employeeSchema);