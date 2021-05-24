const mongoose=require('mongoose'); 
const Schema  = mongoose.Schema;
const ObjectId=Schema.ObjectId;

//thư viện tạo số thứ tự slug trùng
const slug=require('mongoose-slug-generator');

//Thư viện xóa mềm 
var mongooseDelete = require('mongoose-delete');

//tạo đối tượng Productmen
const hoas= new Schema({
  mahoa:{type:Number,required:true},
  maloai:{type:String,},
  tenhoa:{type:String},
  dongia:{type:Number,},
  hinh:{type:String},
  mota:{type:String},


})
//add plugin
//Plugin render ra slug
mongoose.plugin(slug);
//Plugin xóa mềm
hoas.plugin(mongooseDelete,{ 
deletedAt:true,
overrideMethods: 'all' });

module.exports=mongoose.model('Hoa',hoas);