var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    http = require('http'),
    fileReader = require('./fileReader.js'),
    dataBase = require('./dataBase.js');


module.exports.serverSettings = {};

module.exports.startServer = function (){
    app.listen(port, hostname, function(){
        console.log('server running at http://'+hostname+":"+port+"/"); 
    });
};


var hostname = this.serverSettings.hostname || process.env.IP || 'localhost';
var port = this.serverSettings.port || process.env.PORT || 3000;



var app = express();
app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(express.static(__dirname + "/page/html"));


app.get('/getFolders', function(req, res){
    //res.writeHead(200, {'Content-Type':'text/html'});
    res.end(getRespondData());
});

/*app.get('/getComents', function(req, res){
    console.log('get');
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(getRespondData());
});*/

app.post('/saveComment', function(req, res){
    console.log(req);
    console.log(req.body);
    saveDocument(req.body, function(info){
        res.send(info);
    });
    
    /*dataBase.findDocuments(path, function(docs){
        console.log(docs[0].comment);
        res.send(docs);
    });*/
    
    //findDocuments();
});

app.post('/login', function(req, res){
    handleLogin(req.body, function(result){
        res.send(result);
    });

});

app.get('/getComments', function(req, res){
    findDocuments(function(result){
        res.send(result);
    });

});



function getRespondData(){
    var data = fileReader.readDirectory();
    var json = JSON.stringify(data);
    
    return json;
}

function findDocuments(callback){
    dataBase.findDocuments(null, function(docs){
        callback(JSON.stringify(docs));
    });
}

function saveDocument(document, callback){
    dataBase.saveDocumentHandler(document, function(count){
        callback(count + ' entries being saved');
    });
};

function handleLogin(userData, callback){
    if(userData.eventType === 'signIn'){
        dataBase.checkLogin(userData, function(response){
            callback(JSON.stringify(response));
        });
    }else{
        dataBase.registerUser(userData, function(response){
            callback(JSON.stringify(response));
        });
    }
}
