var express = require('express'),
    http = require('http');
    
var hostname = 'localhost';
var port = 3000;

var app = express();

var htmlData = getHtmlData();

app.use(function(req, res, next){
    console.log(req.headers);
    
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(htmlData);
    
});

var server = http.createServer(app);

server.listen(port, hostname, function(){
   console.log('server running at http://'+hostname+":"+port+"/"); 
});




function getHtmlData(){
    return '<html><body><h1>Hello World</h1></body></html>';
}
