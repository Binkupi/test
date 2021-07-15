const express=require('express');
const billController=require('../app/controllers/BillController');
const router=express.Router();

router.post('/:ma_bill',billController.cancelBill);
router.get('/add-item/:mahoa',billController.addItem);


router.get('/',billController.get);


module.exports=router;