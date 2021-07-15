//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const User=require('../models/User');
const Bill=require('../models/Bill');
const {mutipleMongooseToObject,mongooseToObject,generateIdBill}=require('../../utils/mongoose');

class ThanhToanController{
    get(req,res,next){
        var products=req.session.products?req.session.products:[];  
        var totalPrice=0;
        products.forEach((product,index)=>{
            product.index=index+1
            totalPrice+=product.giaban;
        })
        req.session.username='123'
        var username=req.session.username;
       
        if(!username){
            
        }else{
            User.findOne({username:username})
            .then((user)=>{
                var diachi=user.diachi;
                res.render('trangthanhtoan',{   
                    products:products,
                    totalPrice:totalPrice,
                    diachi:diachi,
                });
            })
            .catch(next);
        }
        
    }
    thanhtoan(req,res,next){
        var products=req.session.products?req.session.products:[];  
        var totalPrice=0;
        
        products.forEach((product,index)=>{
            product.index=index+1
            totalPrice+=product.giaban;
        })
    
        req.session.username='123'
        var username=req.session.username;
       
        if(!username){
            
        }else{
            User.findOne({username:username})
            .then((user)=>{
                var dia_chi=req.body.dia_chi;
                var ho_ten=user.ho_ten;
                var today = new Date();
                var time = today.getDate() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var bookingDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
                var bill=new Bill({
                    ma_bill:generateIdBill(),
                    ma_kh:username,
                    tenkhachhang:ho_ten,
                    products:products,
                    total_price:totalPrice,
                    dia_chi:dia_chi,
                    booking_date:bookingDate,
                    status:"đang xử lý",
                })
                bill.save()
                .then(()=>{
                    req.session.products=[],
                    res.redirect('/giohang'
                    );
                })
                
            })
            .catch(next);
        }
        
        
    }
    

}
module.exports=new ThanhToanController;