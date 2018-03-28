var fs = require('fs')
var url = require('url')
var express = require('express')
var util = require('util')
var multiparty = require('multiparty')

//imageServer
var fileWriter = (fileName,data)=>{
	return new Promise((reslove,reject)=>{
		fs.writeFile(fileName+'.jpg',data,(err)=>{
			if (err) {
				console.error(err)
				reject(err)
				return
			}else{
				console.log('image have been save.')
				reslove(data)
			}
		})
	})
}

var app = express()
	app.get('/upload',(req,res)=>{
		const parseURL = url.parse(req.url,true,true)
		const fileName = parseURL.query.fileName
		const data = parseURL.query.data
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.writeHeader(200, {
			'Content-Type': 'application/json;charset=utf-8'
		})
		fileWriter(fileName,data).then((err)=>{
			if (err) {
				console.error(err)
			}else{
				console.log('success!')
				res.end(JSON.stringify('success!'))
			}
		})
	})

	app.post('/uploadFile',(req,res)=>{
		 res.setHeader('Access-Control-Allow-Origin', '*')
		 var form = new multiparty.Form({uploadDir: './public/files/'})
		 	 form.parse(req,(err,fields,files)=>{
		 	var filesTmp = JSON.stringify(files,null,2)
		 	if (err) {
		 		console.log('parse error: ' + err)
		 	}else{
		 		var inputFile = files.inputFile[0]
		 		var uploadedPath = inputFile.path
		 		var dstPath = './public/files/' + inputFile.originalFilename
		 		fs.rename(uploadedPath,dstPath,(err)=>{
		 			if (err) {
		 				console.log('rename error: ' + err)
		 			}else{
		 				console.log('rename ok')
		 			}
		 		})
		 	}
		 	
		    res.write('received upload:\n\n')
		    res.end(util.inspect({fields: fields, files: files}))
		})
		 return
	})

	app.listen(8881,()=>{
		console.log('fileServer is listening on port 8881...')
	})
