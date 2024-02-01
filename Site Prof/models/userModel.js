const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({}, {timestamps: true,});

const user = mongoose.model('Designation', designationSchema);
module.exports = user;
