// JavaScript source code

var mysql=require('mysql');
var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:""
});
connection.connect(function(err){
	if(err)throw err;
	console.log("Connected");
});