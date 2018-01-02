//连接数据库
var diary=require("../public/js/diary.js");
var fs=require("fs");
var dt=require("silly-datetime");
var fd=require("formidable");

// {content:"内容",title:"标题",date:"时间",src:"图片"}
exports.init=function(req,res){
	console.log(req.query);
    var pageSize = 2;                   //一页多少条
    var currentPage = req.query.curpage||1;           //当前第几页,默认第一页
    var sort = {'date':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    
    diary.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, docs) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
		    var wherestr = {};
		    diary.count(wherestr, function(err, count){
		    	var totalpage=Math.ceil(count/pageSize);
		        res.render("blog",{docs:docs,currentPage:currentPage,totalpage:totalpage});
		    }); 	
        }
    }) 	  	   
}
exports.getdiaries=function(req,res){
	console.log(req.query);
    var pageSize = 2;                   //一页多少条
    var currentPage = req.query.curpage||1;           //当前第几页,默认第一页
    var sort = {'date':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    
    diary.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, docs) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
		    var wherestr = {};
		    diary.count(wherestr, function(err, count){
		    	var totalpage=Math.ceil(count/pageSize);
		        res.render("blog",{docs:docs,currentPage:currentPage,totalpage:totalpage});
            	console.log("Res:" + count);
		    }); 	
        }
    }) 	
}

exports.adddiary=function(req,res){
// 上传图片并改名
	var form = new fd.IncomingForm();//创建表单对象
        form.uploadDir="./upload";//设置上传保存路径
	form.parse(req,function(err,fields,files){//文本域保存到fileds里,文件保存在files里
		if(err){
		    console.log(err);
		}else{
	        var oldpath=files.file.path;//旧路径
	        var oldname=files.file.name;//原名称

	        var timestr=dt.format(new Date(),"YYYYMMDDHHmmss");//时间戳
	        var arr = oldname.split(".");//以点拆分文件名
	        var newname= form.uploadDir+"/"+timestr+"."+arr[arr.length-1];//组合成新名字

	        fs.rename(oldpath,newname,function(err){
	             if(err){
	                console.log(err);
	             }else{
// 上传导数据库
					var content=fields.content;
					var title=fields.title;
					var date=new Date();

					if(files.file.name){ //根据有无上传图片决定样式
						var style="youtu";
						var src="/"+timestr+"."+arr[arr.length-1];
					}else{
						var style="wutu";
						var src="";
					}

				    var orders = new diary({
						content:content,
						title:title,
						src:src,
				        date:date,
				        style:style
				    });

				    orders.save(function(err,docs){
				        err?console.log("Error:" + err):res.redirect("/blog");
				    });
	             }
	        });
		}
	});

}