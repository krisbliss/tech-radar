var provider = require('./src/provider');

// koa is here just for experemintation and trial
const koa = require('koa');
var k_server = new koa();

// express is primary form of node.js server
const express = require('express');
var e_server = express();

//set headers
e_server.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin',['*']);
    resp.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    //resp.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //resp.append('Access-Control-Allow-Headers','Content-Type');
    next();
});

//get request for json data from website of choice
e_server.get('/',(request,response) => {
    
    //Promise Function
    provider.getData().then((data)=>{
        response.send(JSON.stringify(data,null,4));  //Using JSON.stringify with (null,4) command formats data neatly but servers no other perpous 
    })

}) 

//app.js
e_server.use('/radar', express.static('./public'));

//listing port
e_server.listen(8080,function(){
    console.log('server is listening on 8080');
});