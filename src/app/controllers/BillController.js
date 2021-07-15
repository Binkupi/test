//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const User=require('../models/User');
const Bill=require('../models/Bill');
const {mutipleMongooseToObject,mongooseToObject,generateIdHoa}=require('../../utils/mongoose');

class BillController{
    get(req,res,next){
        req.session.username='123'
        var username=req.session.username;
        Bill.find({ma_kh:username})
        .then((Bills)=>{
            Bills =mutipleMongooseToObject(Bills);
            Bills.forEach((bill,index)=>{
                bill.index=index+1;
                var name_products='';
                var length=bill.products.length;
                bill.products.forEach((product,index)=>{
                    if(index<length-1){
                        name_products+=product.tenhoa+', ';
                    }else{
                        name_products+=product.tenhoa;
                    }
                })
                bill.ten_sp=name_products;
            })
            res.render('tranggiaohang',{Bills:Bills});
        })
        
        
    }
    
    addItem(req,res,next){
        var products=req.session.products?req.session.products:[]; 
        var mahoa=req.params.mahoa;
        Hoa.findOne({mahoa:mahoa})
        .then((hoa)=>{
            hoa =mongooseToObject(hoa);
            products.push(hoa);
            req.session.products=products;
            res.redirect('/giohang');
        })   
    }
    cancelBill(req,res,next){
        console.log("213");
       
    }
    

}
module.exports=new BillController;