//对数据库进行操作,访问mongodb
var mongoose=require("./db.js");

// 创建schema对象
var Schema=mongoose.Schema;

// 定义数据结构,字段的数据类型什么的
var orderschema=new Schema({
    content:{type:String}, //可以增加索引属性index,和默认值default
    title:{type:String},
    src:{type:String},
    date:{type:Date},
    style:{type:String},
});

module.exports=mongoose.model("diary",orderschema);

// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组