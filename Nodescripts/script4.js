var express = require('express');
const app =express();

var bodyparser =require("body-parser");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'electronicsdb'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{

    var data=req.body;
    var username= data.username;
    var phone= data.phone;
    var email=data.email;
    var password= data.password;

    connection.query("SELECT * FROM registration WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("User exists");
        }
        else{
            var insert_cmd ="INSERT INTO registration (username,phone,email,password) values (?,?,?,?)";
            var values=[username,phone,email,password];
            console.log(result);
            console.log("executing:" + insert_cmd + "" + values);
    
            connection.query(insert_cmd,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("registered !");
                console.log("successful.");
            });
        }


    });

});

app.post('/login/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var email=data.email;
    var password= data.password; 

    connection.query("SELECT * FROM registration WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            console.log(result);
     
            if(password==result[0].password){
             res.json("user logged in");
             res.end;
     
            }
            else{
                res.json("wrong password");
                res.end;
            }
        }
         else{
             res.json("User not found");
             res.end;
        }


    });

});


app.post('/product/',(req,res,next)=>{

    var data=req.body;
    var productname= data.productname;
    var description=data.description;
    var price= data.price;

    connection.query("SELECT * FROM products WHERE productname=?",[productname],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("Product exist");
        }
        else{
            var insert_pro ="INSERT INTO products (productname,description,price) values (?,?,?)";
            var values=[productname,description,price];
            console.log(result);
            console.log("executing:" + insert_pro + "" + values);
    
            connection.query(insert_pro,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("product added !");
                console.log("successful.");
            });
        }


    });

});

var server= app.listen(3300,function(){
    var port=server.address().port;
    console.log("server is running at http://localhost:%s",port);
});