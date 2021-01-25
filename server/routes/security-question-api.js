/*
============================================
; Title:  user-api.js
; Author: Professor Krasso
; Date:  1-22-21
; Modified by: Becca Buechle, Rochelle Markham, Rhonda Rivas, King Major
; Description: CRUD APIs for Users Security Questions
;===========================================
*/
// require statements
const express = require('express');
const SecurityQuestion = require('../db-models/security-question');

// configurations
const router = express.Router();

/**
 * FindAll
 * Security Questions 
 */
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

/**
 * FindById
 * Find By Id - security questions
 */
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

/**
 * CreateSecurityQuestion
 * Create security questions here
 */
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

/**
 * UpdateSecurityQuestion
 * update security questions
 */
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

/**
 * DeleteSecurityQuestion
 */
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
