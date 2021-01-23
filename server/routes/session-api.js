/*
============================================
; Title:  session-api.js
; Author:   Professor Krasso
; Date: 1-22-2021
; Modified by: Becca Buechle, Rochelle Markham, Rhonda Rivas, King Major
; Description: APIs for managing Session Users
;===========================================
*/

// require statements
const express = require('express');
const User = require('../db-models/user');
const bcrypt = require('bcryptjs');

// configurations
const router = express.Router();

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

module.exports = router;
