const express=require('express');
const loaihoaController=require('../app/controllers/LoaiHoaController');
const router=express.Router();


router.get('/:maloai',loaihoaController.renderType);



module.exports=router;