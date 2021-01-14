/*
============================================
; Title:  security-questions.js
; Author: Professor Krasso
; Date:   3 December 2019
; Description: Model for MongoDB SecurityQuestions collection
;===========================================
*/

const mongoose = require('mongoose');

let securityQuestionSchema = mongoose.Schema({
  text:       {type: String},
  isDisabled: {type: Boolean, default: false}
});

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);