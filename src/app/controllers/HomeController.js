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
         var ho_ten=req.session.user?req.session.user.ho_ten:'';
         var username=req.session.user?req.session.user.username:'';
         var message=req.session.message?req.session.message:'';

         res.render('trang1',{
                   Hoa:Hoa,
                   LoaiHoa:LoaiHoa,
                   username:username,
                   length:length,
                   message:message,
                   ho_ten:ho_ten
                               });
         req.session.message='';
 
      })
     .catch(next);}
     else{
      Promise.all([Hoa.find({}),LoaiHoa.find({})])
      .then(([Hoa,LoaiHoa])=>{
         Hoa =mutipleMongooseToObject(Hoa);
         LoaiHoa =mutipleMongooseToObject(LoaiHoa);
          var username=req.session.user?req.session.user.username:'';
          var ho_ten=req.session.user?req.session.user.ho_ten:'';
          var message=req.session.message?req.session.message:'';
         res.render('trang1',{
                   Hoa:Hoa,
                   LoaiHoa:LoaiHoa,
                   username:username,
                   length:length,
                   message:message,
                   ho_ten:ho_ten
                               });
         req.session.message='';
      })
     }
}

}
module.exports=new HomeController;