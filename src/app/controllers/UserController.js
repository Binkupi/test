//sử dụng model
const User=require('../models/User');
//cài đại middleware để chuyển đổi đối tượng lấy từ database
const bcrypt = require('bcrypt');
// generate salt to hash password
const saltRounds = 10;
const {mutipleMongooseToObject,mongooseToObject}=require('../../utils/mongoose');
class UserController{
register(req,res,next){
    res.render('trangdangki');
    }

logout(req,res,next){
    req.session.user='';
    res.redirect('/');
}

login(req, res, next){
    var username=req.body.username;
    var password=req.body.password;
    User.findOne({username:username})
    .then((user)=>{
        if(user){
            
            bcrypt.compare(password, user.password).then((result)=>{
                
                if(result){
                    req.session.user={
                        username:user.username,
                        ho_ten:user.ho_ten,
                        dia_chi:user.diachi,
                        so_dt:user.so_dt,
                        email:user.email,
                        };
                    res.redirect('back');
                }else{
                    req.session.message='Mật khẩu không chính xác. Vui lòng kiểm tra lại';
                    res.redirect('/');
                }
            })
            
        }
        else{
            req.session.message='Tài khoản không tồn tại. Vui lòng kiểm tra lại';
            res.redirect('/');
        }
       
        
    })
    .catch(next);
    
    
}
addUser(req,res,next){
    User.find({username:req.body.username})
    .then((user)=>{
         if(user.length!=0){
             res.render("trangdangki",{
                text:'Tồn tại user mời bạn đăng kí lại',
            });
         }else{
             if(req.body.password==req.body.mat_khau1){
                const password = bcrypt.hashSync(req.body.password, saltRounds);

               var newUser={
                username: req.body.username,
                password:password,
                ho_ten: req.body.ho_ten,
                email: req.body.email,
                diachi: req.body.diachi,
                so_dt: req.body.so_dt,
             }
             const user=new User(newUser);
             user.save()
             .then(()=>{

                 res.redirect("/");
             })
             .catch(next);
            }else{
                res.render("trangdangki",{
                    text:'Mật khẩu và mật khẩu xác nhận không trùng khớp',
                });
            }
        }

    })
    .catch(next);
}
}
module.exports=new UserController;