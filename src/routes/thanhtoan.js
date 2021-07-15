const express=require('express');
const thanhtoanController=require('../app/controllers/ThanhToanController');
const router=express.Router();


router.get('/',thanhtoanController.get);
router.post('/',thanhtoanController.thanhtoan);


module.exports=router;