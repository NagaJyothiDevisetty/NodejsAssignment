// JavaScript source code
const http=require('http');
console.log("Runniing on http:localhost:3000");

http.createServer(function(req,res)
{
    res.write("<h1>HW</h1>");
    res.end();
}).listen(3000);