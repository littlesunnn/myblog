//操作mongodb数据库
var mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myblog");

mongoose.connection.on("connected",function(){
    console.log("open");
});

mongoose.connection.on("error",function(err){
    console.log("error"+err);
});

mongoose.connection.on("disconnected",function(){
    console.log("close");
});

module.exports=mongoose;