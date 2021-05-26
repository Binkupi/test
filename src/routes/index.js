const homeRouter=require('./home');
const hoaRouter=require('./hoa');
const loaihoaRouter=require('./loaihoa');
function route(app){

    
    //chuyển hướng dến đường dẫn /
    app.use('/hoa/',hoaRouter);
    app.use('/loaihoa/',loaihoaRouter);
    app.use('/',homeRouter);
   



}
module.exports=route;