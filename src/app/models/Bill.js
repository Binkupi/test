const mongoose=require('mongoose'); 
const Schema  = mongoose.Schema;
const ObjectId=Schema.ObjectId;

//thư viện tạo số thứ tự slug trùng
const slug=require('mongoose-slug-generator');

//Thư viện xóa mềm 
var mongooseDelete = require('mongoose-delete');

//tạo đối tượng Productmen
const Bill= new Schema({
  ma_bill:{type:String,required:true},
  ma_kh:{type:String},
  tenkhachhang:{type:String},
  products:{type:Array},
  total_price:{type:Number},
  status:{type:String},
  dia_chi:{type:String},
  so_dt:{type:String},
  email:{type:String},
  booking_date:{type:Date},
})
//add plugin
//Plugin render ra slug
mongoose.plugin(slug);
//Plugin xóa mềm
Bill.plugin(mongooseDelete,{ 
deletedAt:true,
overrideMethods: 'all' });

module.exports=mongoose.model('Bill',Bill);
