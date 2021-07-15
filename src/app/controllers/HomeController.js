//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject}=require('../../utils/mongoose');
class HomeController{
renderProduct(req,res,next){
   var products=req.session.products?req.session.products:[]; 
   var length=products.length;
   if(req.query.hasOwnProperty('maloai')){
      Promise.all([Hoa.find({maloai:req.query.maloai}),LoaiHoa.find({})])
      .then(([Hoa,LoaiHoa])=>{
         Hoa =mutipleMongooseToObject(Hoa);
         LoaiHoa =mutipleMongooseToObject(LoaiHoa);
         req.session.username='123'
         var username=req.session.username;
         
         res.render('trang1',{
                   Hoa:Hoa,
                   LoaiHoa:LoaiHoa,
                   username:username,
                   length:length
                               });
 
      })
     .catch(next);}
     else{
      Promise.all([Hoa.find({}),LoaiHoa.find({})])
      .then(([Hoa,LoaiHoa])=>{
         Hoa =mutipleMongooseToObject(Hoa);
         LoaiHoa =mutipleMongooseToObject(LoaiHoa);
         req.session.username='123'
         var username=req.session.username;
         res.render('trang1',{
                   Hoa:Hoa,
                   LoaiHoa:LoaiHoa,
                   username:username,
                   length:length
                               });
 
      })
     }
}

}
module.exports=new HomeController;