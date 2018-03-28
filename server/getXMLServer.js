var soap = require('soap');
var url = 'http://220.169.236.108:4020/hnjyjcService/service1.asmx?wsdl';
var args = {
	untcode: 'oldwiner',
	deviceld: "x674361",
	username: "18071996460",
	password: '我是朗杰'
};
soap.createClient(url, function(err, client) {
	client.Login(args, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	});
});