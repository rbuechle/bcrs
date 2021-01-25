/*
============================================
; Title:  session-api.js
; Author: Professor Krasso
; Date:   16 January 2021
; Modified By: Becca Buechle, Rochelle Markham, Rhonda Rivas, King Major
; Description: APIs for managing Session Users
;===========================================
*/

// require statements
const express = require('express');
const User = require('../db-models/user');
const bcrypt = require('bcryptjs');

// configurations
const router = express.Router();
const saltRounds = 10; // default salt rounds for hashing algorithm

/**
 * User sign-in
 */
router.post('/signin', function (req, res, next) {

  User.findOne({'username': req.body.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      /**
       * IF the user is an existing customer
       */
      if (user) {
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password against the signin password

        if (passwordIsValid) {
          /**
           * IF the password is valid
           */
          res.status(200).send({
            type: 'success',
            auth: true,
            username: user.username,
            time_stamp: new Date()
          })
        } else {
          /**
           * If the password is invalid, return a 401 status code/message
           */
          console.log(`The password for username: ${req.body.username} is invalid.`);
          res.status(401).send({
            type: 'error',
            text: `Invalid username and/or password, please try again`,
            auth: false,
            date_time: new Date()
          })
        }
      } else {
        /**
         * Invalid username
         */
        console.log(`Username: ${req.body.username} has not been registered with out system.`);

        res.status(401).send({
          type: 'error',
          text: `Invalid username and/or password, please try again`,
          auth: false,
          time_stamp: new Date()
        })
      }
    }
  })
});


/**
 * VerifySecurityQuestions
 */
router.post('/verify/users/:username/security-questions', function (req, res, next) {
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1;
  console.log(answerToSecurityQuestion1);

  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2;
  console.log(answerToSecurityQuestion2);

  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3;
  console.log(answerToSecurityQuestion3);

  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestions[0].answer;
      console.log(answer1IsValid);

      let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestions[1].answer;
      console.log(answer2IsValid);

      let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestions[2].answer;
      console.log(answer3IsValid);

      if (answer1IsValid && answer2IsValid && answer3IsValid) {
        res.status(200).send({
          type: 'success',
          auth: true
        })
      } else {
        res.status(200).send({
          type: 'error',
          auth: false
        })
      }
    }
  })
});

/**
 * ResetPassword
 */
router.post('/users/:username/reset-password', function (req, res, next) {
  const password = req.body.password;

  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      let hashedPassword = bcrypt.hashSync(password, saltRounds); // salt/hash the password

      user.set({
        password: hashedPassword
      });

      user.save(function (err, user) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(user);
          res.json(user);
        }
      })
    }
  })
});

module.exports = router;
