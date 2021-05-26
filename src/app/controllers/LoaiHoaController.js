//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject}=require('../../utils/mongoose');
class LoaiHoaController{
    renderType(req,res,next){
        Promise.all([Hoa.find({maloai:req.params.maloai}),LoaiHoa.find({})])
        .then(([Hoa,LoaiHoa])=>{
           Hoa =mutipleMongooseToObject(Hoa);
           LoaiHoa =mutipleMongooseToObject(LoaiHoa);
           res.render('trangloaihoa',{
            Hoa:Hoa,
            LoaiHoa:LoaiHoa
                        });
   
        })
        .catch(next);
    }

}
module.exports=new LoaiHoaController;