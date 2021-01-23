/*
============================================
; Title:  user-api.js
; Author: Professor Krasso
; Date:  1-22-21
; Modified by: Becca Buechle, Rochelle Markham, Rhonda Rivas, King Major
; Description: CRUD APIs for Users
;===========================================
*/
const express = require('express');
const User = require('../db-models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
/*
 API: FindUserById API
 Returns: User File
*/
router.get('/api/users/:userId', function(req, res, next) {
  //finds one user using the Id provided and returns the user file
  User.findOne({'userId': req.params.userId},
  function(err, User){
    if(err) {
      console.log(err);
      return next(err);
    } else{
      console.log(User);
      res.json(User);
    }
  })
});
/**
 * API: FindAllUsers API
 * Returns: Array of users
 */
router.get('/', function(req, res, next){
  //finds users and adds them to a returned array
  User.find({}).where('isDisabled').equals(false).exec(function(err, users) {
     if(err){
       console.log(err);
       return next(err);
     } else {
       console.log(Users);
       res.json(Users);
     }
   })
 })

 /**
 * API: FindById  API
 * Returns: Array of users by IF
 */
router.get('/:id', function (req, res, next) {
  User.findOne({'_id': req.params.id}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user);
    }
  })
});

/**
 * API: CreateUser API
 * Returns: Newly Created User file
 */
router.post('/api/users', function(req, res){
  //sets up hashed passwords using bcrypt
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  //sets up user file fields
  const newUser = new User({
    userId: req.body.userId,
    username: req.body.username,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    securityQuestions: req.body.securityQuestions,
    email: req.body.email,
    isDisabled: false,
    role: req.body.role,
    date_created: new Date(),
    date_modified: ""
  });
  //saves the new user unless there is an error
  newUser.save(function(err, newUser){
    if(err){
      console.log(err);
      res.status(400).send("Unable to save user.")
    } else {
      console.log(newUser);
      res.json(newUser);
    }
  });
});
/**
 * API: Update User
 * Returns: Updated User File
 */
router.put('/api/users/:userId', function(req, res, next){
  //finds the specified User
  User.findOne({'userId': req.params.userId}, function(err, User){
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(User);
      //sets the new user information and sets date modified to the current date
      User.set({
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        securityQuestions: req.body.securityQuestions,
        email: req.body.email,
        isDisabled: req.body.isDisabled,
        role: req.body.role,
        date_modified: new Date()
      });
      //saves the information and returns the file
      User.save(function(err, User){
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(User);
          res.json(User);
        }
      })
    }
  })
});
/**
 * API: Delete User
 * Return: Updated User File
*/
router.put('/api/users/:userId', function(req, res, next){
  //finds the specified User
  User.findOne({'userId': req.params.userId}, function(err, User){
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(User);
      //sets the isDisabled flag to true and sets date modified as the current date
      User.set({
        userId: req.body.userId,
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        securityQuestions: req.body.securityQuestions,
        email: req.body.email,
        isDisabled: true,
        role: req.body.role,
        date_modified: new Date()
      });
      //saves the information and returns the file
      User.save(function(err, User){
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(User);
          res.json(User);
        }
      })
    }
  })
});
/**
 * API -Find selected security questions
 * FindSelectedSecurityQuestions
 */
router.get('/:username/security-questions', function (req, res, next) {
  User.findOne({'username': req.params.username}, function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);
      res.json(user.securityQuestions);
    }
  })
});
//exports the APIs to the router module
module.exports = router;