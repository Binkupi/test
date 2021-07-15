const express=require('express');
const hoaController=require('../app/controllers/HoaController');
const router=express.Router();
const uploadMulter = require('../config/file/uploadMulter') 


router.get('/timkiem',hoaController.search);
router.get('/create',hoaController.create);
router.get('/:mahoa',hoaController.show);
//submit form tạo
router.post('/store',uploadMulter.single('hinh'),hoaController.store);



module.exports=router;