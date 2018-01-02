var exp=require("express");
var app=exp();

//设置post消息头
var bdparser=require("body-parser");
app.use(bdparser.urlencoded({extended:false}));

//设置根目录
app.use(exp.static("./upload"));
app.use(exp.static("./public"));

//使用cookie
 var cookie = require('cookie-parser');
 app.use(cookie());
//使用ejs模板引擎
app.set("view engine","ejs");

var router=require("./routers/router.js");

app.listen(4000);

app.get("/",function(req,res){
    res.render("index");
});

app.get("/blog",router.init);

app.get("/getdiary",router.getdiaries);

app.post("/fabiao",router.adddiary);

app.get("/connect",function(req,res){
	res.render("connect");
});

app.get("/about",function(req,res){
	res.render("about");
});