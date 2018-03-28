var http = require("http")
var formidable = require('formidable')
var util = require("util")
var user = require('./userServer.js')
const url = require('url')


//创建服务器
var server = http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'})
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/dopost" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm()
        //设置文件上传存放地址
        form.uploadDir = "public";
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, (err, fields, files)=> {
            if(err){
                throw err
            }
            // console.log(fields);
            console.log(''+JSON.stringify(files.pic.path))
            var path = files.pic.path
            user.insertPath(path).then((info)=>{
                res.end('<h4>upload Success!</h4>')
            })
            console.log(util.inspect({fields:fields,files:files}));
            //所有的文本域、单选框，都在fields存放；
            //所有的文件域，files
        })
    }else if (req.url==='/getPath'&&req.method.toLowerCase() == 'get') {
        user.getPath().then((result)=>{
            res.end(JSON.stringify(result))
        })
    }
})

server.listen(8088,()=>{
    console.log('8088....')
})
