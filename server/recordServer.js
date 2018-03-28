var express = require('express')

var url = require('url')

var user = require('./userServer.js')

var app = express()

app.post('/record',(req,res)=>{
	const parseURL = url.parse(req.url, true, true)
	const cookies = parseURL.query.cookies
	const username = parseURL.query.username
	user.record(cookies,username).then((info)=>{
		res.header('Access-Control-Allow-Origin', '*')
		res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
		})
		if (cookies == undefined||username == undefined) {
			res.end('cannot insert cookies or username of undefined!')
		}else{
			res.end(''+JSON.stringify(info))
		}
	})
})

app.get('/getRecord',(req,res)=>{
	user.responseRecord().then((result)=>{
		res.header('Access-Control-Allow-Origin', '*')
		res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
		})	
		res.end(''+JSON.stringify(result))
	})
})
app.listen(8882, () => {
	console.log('this program is listening on port 8882.....')
})