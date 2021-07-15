//sử dụng model

//cài đại middleware để chuyển đổi đối tượng lấy từ database
const Hoa=require('../models/Hoa');
const LoaiHoa=require('../models/LoaiHoa');
const {mutipleMongooseToObject,mongooseToObject,generateIdHoa}=require('../../utils/mongoose');

class HoaController{
    show(req,res,next){
        Hoa.findOne({mahoa:req.params.mahoa})
        .then((hoa)=>{

            hoa =mongooseToObject(hoa);
            res.render('trangchitiet',{hoa:hoa});
        })
        .catch(next);
    }
    create(req,res,next){
            LoaiHoa.find({})
            .then((LoaiHoa)=>{
                LoaiHoa =mutipleMongooseToObject(LoaiHoa);
                res.render('trangthemsanpham',{LoaiHoa:LoaiHoa});
            })
            .catch(next);
            

    }

    store(req,res,next){
        req.body.hinh="/upload/"+req.file.filename;
        req.body.mahoa=generateIdHoa();
        const hoa=new Hoa(req.body);
        hoa.save()
        .then(()=>res.redirect('/'))
        .catch(next);
    }


    search(req, res,next){
        Hoa.find({})
            .then((Hoa)=>{
            if(req.query.tenhoa){
            var keyword=req.query.tenhoa.toLowerCase();
            }        
            var result =mutipleMongooseToObject(Hoa);
                if(keyword){
                    var result=result.filter((hoa,index)=>{
                        return hoa.tenhoa.toLowerCase().indexOf(keyword)!==-1;    
                    })
                    
                }
            res.render('trangtimkiem',{Hoa:result});
        })
        .catch(next);
        
    }

}
module.exports=new HoaController;