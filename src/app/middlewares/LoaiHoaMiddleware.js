module.exports=function LoaiHoaMiddleware(req,res,next){
   
    res.locals._loaihoa={
        loai:"default",
        enable:false,
        
    }
    
    if(req.query.hasOwnProperty('maloai')){
        
        res.locals._loaihoa.enable=true;
        res.locals._loaihoa.loai=req.query.maloai;
    }
    next();
}