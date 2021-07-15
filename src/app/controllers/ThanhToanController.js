//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const User=require('../models/User');
const Bill=require('../models/Bill');
const {mutipleMongooseToObject,mongooseToObject,generateIdBill}=require('../../utils/mongoose');
const sendEmail = require('./../../service/email')
const { templatesEmail } = require('./../../service/templateEmail')
class ThanhToanController{
    get(req,res,next){
        var products=req.session.products?req.session.products:[];  
        var totalPrice=0;
        products.forEach((product,index)=>{
            product.index=index+1
            totalPrice+=product.giaban*product.quantity;
        })

        var username=req.session.user?req.session.user.username:'';
       
        if(!username){
            req.session.message='Bạn cần đăng nhập trước khi thanh toán';
            res.redirect('/');
        }else{
            User.findOne({username:username})
            .then((user)=>{
                var diachi=user.diachi;
                
                res.render('trangthanhtoan',{   
                    products:products,
                    totalPrice:totalPrice,
                    diachi:diachi,
                    so_dt:user.so_dt,
                    email:user.email,
                    ho_ten:user.ho_ten
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
            totalPrice+=product.giaban*product.quantity;
        })
    

        var username=req.session.user?req.session.user.username:'';
       
        if(!username){
            res.redirect('/');
        }else{
            User.findOne({username:username})
            .then((user)=>{
                var dia_chi=req.body.dia_chi;
                var ho_ten=req.body.ho_ten;
                var so_dt=req.body.so_dt;
                var email=req.body.email;
                var today = new Date();
                var time = today.getDate() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var bookingDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
                var ma_bill=generateIdBill();
                var bill=new Bill({
                    ma_bill:ma_bill,
                    ma_kh:username,
                    tenkhachhang:ho_ten,
                    products:products,
                    total_price:totalPrice,
                    dia_chi:dia_chi,
                    so_dt:so_dt,
                    email:email,
                    booking_date:bookingDate,
                    status:"đang xử lý",
                })
                bill.save()
                .then(()=>{
                    req.session.products=[];
                    sendEmail(email, 'Đơn hàng đã đặt thành công',ma_bill);
                    console.log(123);
                    res.redirect('/giohang'
                    );
                })
                
            })
            .catch(next);
        }
        
        
    }
    

}
module.exports=new ThanhToanController;