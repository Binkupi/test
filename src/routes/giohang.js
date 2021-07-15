const express=require('express');
const giohangController=require('../app/controllers/giohangController');
const router=express.Router();

router.get('/add-item/:mahoa',giohangController.addItem);
router.post('/update/:mahoa',giohangController.updateSL);
router.post('/delete/:mahoa',giohangController.removeItem);

router.get('/',giohangController.get);


module.exports=router;