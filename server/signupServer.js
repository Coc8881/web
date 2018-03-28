const mysql = require('mysql')
const url = require('url')
const http = require('http')
const dbServer = mysql.createConnection({
	host:'localhost',
	database:'sjh',
	port:'3306',
	user:'root',
	password:'sjh'
})

dbServer.connect()

var getXmlqqCodeStatus = (qqCode)=>{
	
}