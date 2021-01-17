/*
============================================
; Title:  security-question-api.js
; Author: Professor Krasso
; Date:  12 January 2021
; Modarators: Becca Buechle
; Description: CRUD APIs for Security Questions
;===========================================
*/

// require statements
const { RoutesRecognized } = require('@angular/router');
const express = require('express');
const SecurityQuestion = require('../db-models/security-question');

// configurations here
const router = express.Router();

// configurations
const router = express.Router();


// FindAll API 
router.get('/', function (req, res, next) {
    SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err, securityQuestions) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(securityQuestions);
        res.json(securityQuestions);
      }
    })
  });

  // FindBy ID 
  router.get('/:id', function (req, res, next) {
    SecurityQuestion.findOne({'_id': req.params.id}, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(securityQuestion);
        res.json(securityQuestion);
      }
    })
  });

  // Create Security Question
  router.post('/', function (req, res, next) {
    let sq = {
      text: req.body.text
    };
  
    SecurityQuestion.create(sq, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(securityQuestion);
        res.json(securityQuestion);
      }
    })
  });

  // Updates a JSON Securtiy Question 
  router.put('/:id', function (req, res, next) {
    SecurityQuestion.findOne({'_id': req.params.id}, function (err, securityQuestion) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(securityQuestion);
  
        securityQuestion.set({
          text: req.body.text
        });
  
        securityQuestion.save(function (err, securityQuestion) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(securityQuestion);
            res.json(securityQuestion);
          }
        })
      }
    })
  });

  // Delete Security Question
  router.delete('/:id', function (req, res, next) {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(securityQuestion);
  
        if (securityQuestion) {
          securityQuestion.set({
            isDisabled: true
          });
  
          securityQuestion.save(function(err, savedSecurityQuestion) {
            if (err) {
              console.log(err);
              return next(err);
            } else {
              console.log(savedSecurityQuestion);
              res.json(savedSecurityQuestion);
            }
          })
        }
      }
    });
  });

  module.exports = router;