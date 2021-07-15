const express=require('express');
const giohangController=require('../app/controllers/giohangController');
const router=express.Router();

router.get('/add-item/:mahoa',giohangController.addItem);
router.get('/delete/:mahoa',giohangController.removeItem);

router.get('/',giohangController.get);


module.exports=router;