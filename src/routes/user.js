
const express=require('express');
const UserController=require('../app/controllers/UserController');
const router=express.Router();
var passport = require('passport');

router.get('/register',UserController.register)

router.get('/logout',UserController.logout)
router.post('/register', UserController.addUser);
module.exports=router;