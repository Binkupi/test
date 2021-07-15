//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject,mongooseToObject,generateIdHoa}=require('../../utils/mongoose');

class GioHangController{
    get(req,res,next){
        var products=req.session.products?req.session.products:[];  
        console.log(products);
        var totalPrice=0;
        products.forEach((product,index)=>{
            product.index=index+1
            totalPrice+=product.giaban*product.quantity;


        })

        res.render('tranggiohang',{   
            products:products,
            totalPrice:totalPrice
        });
        
        
    }
    
    addItem(req,res,next){
        var username=req.session.user?req.session.user.username:'';
        if(username===''){
            req.session.message='Bạn cần đăng nhập để xem giỏ hàng';
            res.redirect('/');

        }else{
            var products=req.session.products?req.session.products:[]; 
            var mahoa=req.params.mahoa;
                    Hoa.findOne({mahoa:mahoa})
                    .then((hoa)=>{
                        var isChecked=false;
                        hoa =mongooseToObject(hoa);
                        hoa.quantity=1;
                        products.forEach(product=>{
                            if(product.mahoa===mahoa){
                                product.quantity=Number(product.quantity)+1;
                                isChecked=true;
                            }
                        })
                        if(isChecked===true){
                            req.session.products=products;
                        }else{
                            products.push(hoa);
                            req.session.products=products;
                        }
                        
                        res.redirect('/');
                    }).catch(next);  
            }
            
         
    }
    updateSL(req,res,next){
            var products=req.session.products?req.session.products:[]; 
            var mahoa=req.params.mahoa;
            var quantity=req.body.quantity;
            products.forEach(product=>{
                if(product.mahoa===mahoa){
                    product.quantity=quantity;
                }
            })
            req.session.products=products;
                res.redirect('/giohang');
            
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