const mongoose=require('mongoose'); 
const Schema  = mongoose.Schema;
const ObjectId=Schema.ObjectId;

//thư viện tạo số thứ tự slug trùng
const slug=require('mongoose-slug-generator');

//Thư viện xóa mềm 
var mongooseDelete = require('mongoose-delete');

//tạo đối tượng Productmen
const LoaiHoa= new Schema({

  maloai:{type:String,required:true},
  tenloai:{type:String},



})
//add plugin
//Plugin render ra slug
mongoose.plugin(slug);
//Plugin xóa mềm
LoaiHoa.plugin(mongooseDelete,{ 
deletedAt:true,
overrideMethods: 'all' });

module.exports=mongoose.model('LoaiHoa',LoaiHoa);