//Cài đặt express.js
const express=require('express');
const app=express();
const port=3000;

//cài đặt thư viện hổ trợ các phương thức put delete patch
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//thư viện đường dẫn
const path=require('path');

//Thư viện để console.log khi chạy
const morgan = require('morgan');
app.use(morgan('dev'));

//cài đặt template-engine
var exphbs  = require('express-handlebars');
app.engine('hbs', exphbs({
        extname:'.hbs'})
        );
app.set('view engine', 'hbs');
//set path views
app.set('views',path.join(__dirname,'resources','views'))

//cấu hình file public
app.use(express.static(path.join(__dirname,'public')));

//use body on POST
app.use(express.urlencoded({ extended: true }));

//sử dụng json
app.use(express.json());

// Sử dụng router
// config route init
const route=require('./routes')
route(app);
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});