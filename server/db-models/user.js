//requires mongoose and security question schema
const mongoose = require('mongoose');
const securityQuestions = require('securityQuestions')

//set up user schema
let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  firstname: {type: String},
  lastname: {type: String},
  phoneNumber: {type: String},
  address: {type: String},
  email: {type: String},
  isDisabled: {type: Boolean, default: false},
  role: {type: String, default: 'standard'},
  securityQuestions: [securityQuestions],
  date_created: {type: Date, default: new Date()},
  date_modified: {type: Date}
})

//exports schema to MongoDB
module.exports = mongoose.model('User', userSchema);