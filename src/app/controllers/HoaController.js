//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const {mutipleMongooseToObject,mongooseToObject}=require('../../utils/mongoose');
class HoaController{
    show(req,res,next){
        Hoa.findOne({mahoa:req.params.id})
        .then((hoa)=>{
            hoa =mongooseToObject(hoa);
            res.render('trangchitiet',{hoa:hoa});
        })
        .catch(next);
    }
    search(req, res,next){
        Hoa.find({})
            .then((Hoa)=>{
            var keyword=req.query.tenhoa.toLowerCase();
           
            var result =mutipleMongooseToObject(Hoa);
                if(keyword){
                    var result=result.filter((hoa,index)=>{
                        return hoa.tenhoa.toLowerCase().indexOf(keyword)!==-1;    
                    })
                    console.log(result);
                    
                }
            res.render('trangtimkiem',{Hoa:result});
        })
        .catch(next);
        
    }

}
module.exports=new HoaController;