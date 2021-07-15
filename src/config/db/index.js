//sử dỤng thư viện mongoose để kết nối với cơ sở dữ liệu mongoDB
const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://phuongtt:Phuong123@cluster0.zeo9p.mongodb.net/flowerstore?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log('connect successfully!!!');
    } catch(error){
        console.log('connect failure!!!');
    }
    
}
module.exports={connect}
