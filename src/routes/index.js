const homeRouter=require('./home');

function route(app){

    
    //chuyển hướng dến đường dẫn /
    app.use('/',homeRouter);



}
module.exports=route;