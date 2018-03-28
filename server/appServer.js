var express = require('express')
var user = require('./userServer.js')
const url = require('url')
var express = require('express')
var session = require('express-session')

var app = express()
//setSession
app.use(session({
	secret: 'id_key',
	name: 'nSessionID',
	resave: false,
	saveUninitialized: true
}))

//loginServer
app.post('/login', (req, res) => {
	const parseURL = url.parse(req.url, true, true)
	const username = parseURL.query.username
	const passwd = parseURL.query.passwd
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.login(username, passwd).then((result) => {
		console.log(result.length === 0)
		if (result.length === 0) {
			res.end('false')
		} else {
			res.end(JSON.stringify(result[0].username))
		}
	})
})


//interceptor
// app.use((req,res,next)=>{
// 	const parseURL = url.parse(req.url, true, true)
// 	const pathname = parseURL.pathname
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	// res.setHeader('Access-Control-Headers','X-Requested-With','Content-Type')
// 	if (pathname != '/login') {
// 		if (req.session.user) {
// 			req.session.save((err)=>{
// 				next()
// 			})
// 		}else{
// 			res.end('<h4>noPromission!</h4>')
// 		}
// 	}
// })

//signupServer
app.post('/signup', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	const parseURL = url.parse(req.url, true, true)
	const username = parseURL.query.username
	const passwd = parseURL.query.passwd
	user.login(username, passwd).then((result) => {
		console.log(req.session.user)
		console.log(result.length)
		if (result.length === 0) {
			user.signup(username, passwd).then((info) => {
				res.end('true')
			}).catch((err) => {
				res.end('error:' + err)
			})
		} else {
			res.end('false')
		}
	}).catch((err) => {
		res.end(JSON.stringify({
			'error': err
		}))
	})
})

//noteServer
app.post('/note', (req, res) => {
	const parseURL = url.parse(req.url, true, true)
	const title = parseURL.query.title
	const content = parseURL.query.content
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.writelogs(title, content).then((info) => {
		res.end(JSON.stringify(info))
	})
})

//logslistServer
app.get('/logslist', (req, res) => {
	console.log(req.session.user)
	const parseURL = url.parse(req.url, true, true)
	const pageNumStr = parseURL.query.pageNum
	console.log(pageNumStr)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.getlogslist(pageNumStr).then((result) => {
		res.end(JSON.stringify(result))
	})
})

//findlogbytitleServer
app.post('/findlogbytitle', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	const parseURL = url.parse(req.url, true, true)
	const title = parseURL.query.title
	user.findlogbytitle(title).then((result) => {
		res.end(JSON.stringify(result))
	})
})

//findlogbyidServer
app.post('/findlogbyid', (req, res) => {
	const parseURL = url.parse(req.url, true, true)
	const idstr = parseURL.query.id
	res.setHeader('Access-Control-Allow-Origin', '*')
	// res.setHeader('Access-Control-Headers','X-Requested-With','Content-Type')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.findlogbyid(idstr).then((result) => {
		res.end(JSON.stringify(result))
	})
})

//editServer
app.post('/edit', (req, res) => {
	const parseURL = url.parse(req.url, true, true)
	const idstr = parseURL.query.id
	const content = parseURL.query.content
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.updatelog(idstr, content).then((info) => {
		if (JSON.stringify(info).affectedRows) {
			res.end(JSON.stringify(err))
		}
		res.end(JSON.stringify(info))
	})
})

app.get('/delete', (req, res) => {
	const parseURL = url.parse(req.url, true, true)
	const idstr = parseURL.query.id
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	user.log_delete(idstr).then((info) => {
		if (info) {
			res.end(JSON.stringify(info))
		}
	}).catch((err) => {
		res.end(JSON.stringify(err))
	})
})

app.use('/public', express.static('public'))

app.listen(8880, () => {
	console.log('this program is listening on 8880.....')
})

exports.app = app