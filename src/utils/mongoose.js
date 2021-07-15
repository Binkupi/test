module.exports={
    mutipleMongooseToObject:function(mongooseArrays)
    {
        return mongooseArrays.map(mongoose=>mongoose.toObject());
    },
    mongooseToObject:function(mongoose){
        return mongoose?mongoose.toObject():mongoose;
    },generateIdHoa :function() {
    
        return 'QDT'+Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
      },
    generateIdBill :function() {
    
        return 'MSB'+Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
      }
}