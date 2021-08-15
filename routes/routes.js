const express = require('express');
const { validateLoginUser } = require('./validations/login_validations');
const { validateSignUpUser } = require('./validations/signup_validation');
const Authentication = require('./validations/AuthenticateToken');

const UserController=require("../controllers/UserController")
const router = express.Router();

router.post  ("/login",validateLoginUser,UserController.login);

router.post  ("/signup",validateSignUpUser,UserController.signup);

router.use('/users', Authentication.authenticate);

router.get  ("/users/getuserprofile",UserController.getUserProfile);

module.exports = router;

