//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const {mutipleMongooseToObject}=require('../../utils/mongoose');
class HomeController{
renderProduct(req,res,next){
     Hoa.find({})
     .then(hoa=>{
        hoa =mutipleMongooseToObject(hoa);
        res.json(hoa);
     })
     .catch(next);
}
}
module.exports=new HomeController;