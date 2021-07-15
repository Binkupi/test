//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject,mongooseToObject,generateIdHoa}=require('../../utils/mongoose');

class GioHangController{
    get(req,res,next){
        var products=req.session.products?req.session.products:[];  
        var totalPrice=0;
        products.forEach((product,index)=>{
            product.index=index+1
            totalPrice+=product.giaban;
        })
        res.render('tranggiohang',{   
            products:products,
            totalPrice:totalPrice
        });
        
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
    removeItem(req,res,next){
        var products=req.session.products?req.session.products:[]; 
        if(products.length===0){
            res.redirect('/giohang');
        }else{
            var mahoa=req.params.mahoa;
            products=products.filter((product,index)=>{
                return product.mahoa!=mahoa;
            })
            req.session.products=products;
            res.redirect('/giohang');
        }
       
    }
    

}
module.exports=new GioHangController;