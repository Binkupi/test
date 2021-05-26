//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject}=require('../../utils/mongoose');
class HomeController{
renderProduct(req,res,next){
   Promise.all([Hoa.find({}),LoaiHoa.find({})])
     .then(([Hoa,LoaiHoa])=>{
        Hoa =mutipleMongooseToObject(Hoa);
        LoaiHoa =mutipleMongooseToObject(LoaiHoa);
        res.render('trang1',{
                  Hoa:Hoa,
                  LoaiHoa:LoaiHoa
                              });

     })
     .catch(next);
}

}
module.exports=new HomeController;