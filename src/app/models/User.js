var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
        username: {
            type: String
        },
        password: {
            type: String
        },
        ho_ten:{type:String},
        email:{type:String},
        diachi:{type:String},
        so_dt:{type:String},
});

module.exports = mongoose.model('user123', userSchema);