const homeRouter=require('./home');
const hoaRouter=require('./hoa');
const userRouter=require('./user');
const giohangRouter=require('./giohang');
const thanhtoanRouter=require('./thanhtoan');
const billRouter=require('./bill');
function route(app){

    
    //chuyển hướng dến đường dẫn /
    app.use('/hoa/',hoaRouter);
    app.use('/user/',userRouter);
    app.use('/giohang',giohangRouter);
    app.use('/thanhtoan',thanhtoanRouter);
    app.use('/bills',billRouter);
    app.use('/',homeRouter);
   
    
   



}
module.exports=route;