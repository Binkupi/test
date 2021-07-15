//Cài đặt express.js
const express=require('express');
const app=express();
const port=3000;
const session = require('express-session');
//cài đặt thư viện hổ trợ các phương thức put delete patch
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//thư viện đường dẫn
const path=require('path');

//Thư viện để console.log khi chạy
const morgan = require('morgan');
app.use(morgan('dev'));



//sửu dụng middleware
const LoaiHoaMiddleware=require('./app/middlewares/LoaiHoaMiddleware');
app.use(LoaiHoaMiddleware);


//cài đặt template-engine
var exphbs  = require('express-handlebars');
app.engine('hbs', exphbs({
        extname:'.hbs',
        helpers:{
            renderProduct:(products)=>{
                var length=products.length;
                var count=0;
                text='<tr>';
                for(var i=0;i<length;i++){
                    if(count<3){
                        count++;
                        text+=`<td>
                                <a href="/hoa/${products[i].mahoa}"><img src="/images/${products[i].hinh}"></a><br>
                                Tên hoa :${products[i].tenhoa }<br>
                                Giá bán: ${products[i].giaban} VND</br> 
                                <a href="/giohang/add-item/${products[i].mahoa}">Mua hàng</a>
                                </td>  
                            `   
                    }else{
                        text+='</tr>';
                        count =0;
                    }
                }
                return text;
            },
            addClassActive:(loaihoa, maloai)=>{
                
            return loaihoa.loai==maloai?'style="color:red"':'';
            }
        }
        
    })
        );
app.set('view engine', 'hbs');
//set path views
app.set('views',path.join(__dirname,'resources','views'))


//cấu hình file public
app.use(express.static(path.join(__dirname,'public')));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
//use body on POST
app.use(express.urlencoded({ extended: true }));


//sử dụng json
app.use(express.json());

//Kết nối cơ sở dữ liệu
const db=require('./config/db');
db.connect();

// var passport = require('passport');
// const session = require('express-session')
// // /* Khai báo để sử dụng kịch bản passport */
// // require('./config/passport');
// // var flash = require('connect-flash');
app.use(session({
secret: 'adsa897adsa98bs',
resave: false,
saveUninitialized: false,
}))
// app.use(flash());
// app.use(passport.initialize())
// app.use(passport.session());

// Sử dụng router
// config route init
const route=require('./routes')
route(app);


//sử dụng session


// app.use(session({
//     resave: true, 
//     saveUninitialized: true, 
//     secret: 'somesecret', 
//     cookie: { maxAge: 60000 }})); 



app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});