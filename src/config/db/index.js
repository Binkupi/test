//sử dỤng thư viện mongoose để kết nối với cơ sở dữ liệu mongoDB
const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://Project_NodeJS:Turbo360@cluster0.qjs5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true', {
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
