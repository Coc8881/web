// const http = require('http')
// const url = require('url')
// var fs = require('fs')
const mysql = require('mysql')
//create a dblink
const dbServer = mysql.createConnection({
	host: 'localhost',
	database: 'sjh',
	port: '3306',
	user: 'root',
	password: 'sjh'
})

dbServer.connect()

//user's loginController
var login = (username, passwd) => {
	return new Promise((reslove, reject) => {
		const sql = 'select * from users where username="' + username + '" and passwd="' + passwd + '"'
		dbServer.query(sql, (err, result) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				// console.log('result>>>>>>>>>>>>>>.'+JSON.stringify(result))
				reslove(result)
			}
		})
	})
}

//login_recording
var record = (cookies, username) => {
	return new Promise((reslove, reject) => {
		var date = new Date()
		var year = date.getFullYear()
		var month = date.getMonth()+1
		var datetime = date.getDay()
		const sql = 'insert into login_record (cookies,username,loginDate) values("' + cookies + '","' + username + '","'+datetime+'")'
		dbServer.query(sql, (err, info) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				console.log('info>>>>>>>>>>>' + JSON.stringify(info))
				reslove(info)
			}
		})
	})
}

var responseRecord = () => {
	return new Promise((reslove, reject) => {
		const sql = 'select count(*)as times,loginDate from login_record where loginDate GROUP BY loginDate'
		dbServer.query(sql, (err, result) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				console.log('result>>>>>>>>>>' + JSON.stringify(result))
				reslove(result)
			}
		})
	})
}
//user's registerController
var signup = (username, passwd) => {
	return new Promise((reslove, reject) => {
		const sql = 'insert into users (username,passwd) values("' + username + '","' + passwd + '")'
		dbServer.query(sql, (err, info) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				console.log('info>>>>>>>>>>>' + JSON.stringify(info))
				reslove(info)
			}
		})
	})
}

//lwiriteAction(for writing page) 
var writelogs = (title, content) => {
	return new Promise((reslove, reject) => {
		// const sql = 'insert into logs (title,content,state) values("' + title + '","' + content + '",'+0+')'
		const sql = "insert into logs (title,content,state) values('" + title + "'" + "," + "'" + content + "'" + "," + 0 + ")"
		dbServer.query(sql, (err, info) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				console.log('info>>>>>>>>>>>' + JSON.stringify(info))
				reslove(info)
			}
		})
	})
}

//logslist(for get logs)
var getlogslist = (pageNumStr) => {
	var pageSize = 10
	var pageNum = parseInt(pageNumStr)
	return new Promise((reslove, reject) => {
		const sql = 'select * from logs limit ' + ((pageNum - 1) * pageSize) + ',' + pageSize
		dbServer.query(sql, (err, result) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				// console.log('result:>>>>>>>>'+JSON.stringify(result))
				reslove(result)
			}
		})
	})
}

//search by title(for the search form)
var findlogbytitle = (title) => {
	return new Promise((reslove, reject) => {
		const sql = 'select * from logs where title="' + title + '"';
		const query = 'select * from logs where title like "%' + title + '%"'
		dbServer.query(query, (err, result) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				// console.log('result:>>>>>>>>'+JSON.stringify(result))
				reslove(result)
			}
		})
	})
}

//search by id (for detail)
var findlogbyid = (idstr) => {
	return new Promise((reslove, reject) => {
		var id = parseInt(idstr)
		console.log('id:' + typeof(id))
		const sql = 'select * from logs where id="' + id + '"';
		dbServer.query(sql, (err, result) => {
			if (err) {
				reject(err)
				return
			} else {
				// console.log('result:>>>>>>>>>>'+JSON.stringify(result))
				reslove(result)
			}
		})
	})
}

//update logs controller
var updatelog = (idstr, content) => {
	return new Promise((reslove, reject) => {
		var id = parseInt(idstr)
		console.log(id)
		const sql = 'update logs set content=' + "'" + content + "'" + 'where id=' + id
		dbServer.query(sql, (err, info) => {
			if (err) {
				reject(err)
				console.error(err)
				return
			} else {
				console.log(info)
				reslove(info)
			}
		})
	})
}

//logs delete resolver
var log_delete = (idstr) => {
	return new Promise((reslove, reject) => {
		var id = parseInt(idstr)
		const sql = 'delete from logs where id=' + id
		dbServer.query(sql, (err, info) => {
			if (err) {
				reject(err)
				console.error(err)
			} else {
				console.log(info)
				reslove(info)
			}
		})
	})
}

var insertPath = (path)=>{
    return new Promise((reslove,reject)=>{
     	const sql = 'insert into user_Image (url) values("' + path + '")'
	    dbServer.query(sql,(err,info)=>{
	    	if (err) {
	    		reject(err)
	    		console.error(err)
	    	}else{
	    		reslove(info)
	    		console.log(info)
	    	}
	     })
    })
}

var getPath = ()=>{
	return new Promise((reslove,reject)=>{
		const sql = 'select * from user_Image'
		dbServer.query(sql,(err,result)=>{
			if (err) {
				reject(err)
			}else{
				reslove(result)
				console.log(JSON.stringify(result))
			}
		})
	})
}

exports.login = login
exports.signup = signup
exports.writelogs = writelogs
exports.getlogslist = getlogslist
exports.findlogbytitle = findlogbytitle
exports.findlogbyid = findlogbyid
exports.updatelog = updatelog
exports.log_delete = log_delete
exports.record = record
exports.responseRecord = responseRecord
exports.insertPath = insertPath
exports.getPath = getPath