var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../app/models/User');
const bcrypt = require('bcrypt');
// generate salt to hash password
const saltRounds = 10;

passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //Passport register
passport.use('local.register', new LocalStrategy({
}, async function( username, password, done){
  console.log(username);
    await User.findOne({
        'username' : username      
  }, function(err, user){
      if(err){
          return done(err)
      }
      if(user){
        console.log('Tên Đăng nhập đã tồn tại')
          return done(null, false, {
              message : 'Tên đăng nhập đã tồn tại, vui lòng đặt tên khác'    
          })
      }

      var newUser = new User();
      newUser.local.email = username;

      bcrypt.hash( password, saltRounds, function(err, hash) {
        newUser.local.password=hash;
          newUser.save(function(err, result) {
              if (err) {
                  return done(err);
              } else {                    
                return done(null, newUser);            
              }
          });
    });

  })
}));

// /* Passport login */
// passport.use('local.login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true
// }, function(req, email, password, done) {
//     User.findOne({
//         'local.email': email
//     })
//         .then(function (user) {
//             console.log(user.local.password)
//             console.log(password)
//             bcrypt.compare(password, user.local.password, function (err,result) {
//                 console.log(result)
//                 if (err) { return done(err); }
//                 if(!result) {
//                     return done(null, false, { message: 'Incorrect username and password' });
//                 }
//                 return done(null, user);
//             })
//         })
//         .catch(function (err) {
//             return done(err);
//         })
// }));