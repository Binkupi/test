const express=require('express');
const hoaController=require('../app/controllers/HoaController');
const router=express.Router();



router.get('/timkiem',hoaController.search);
router.get('/:id',hoaController.show);



module.exports=router;