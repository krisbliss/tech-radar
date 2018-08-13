const express = require('express');
var server = express();
var fs = require('fs');
var path = require('path');
var provider = require('./src/provider');
var request = require('request')



/****************************************************************************
 * setting headers for server
/****************************************************************************/
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



/****************************************************************************
 * Sets config.json data file
/****************************************************************************/
// retrieves uploaded data sent from app.js front end at localhost:8080/uploadNewFile
server.use(require('body-parser').text());
server.post('/setConfig',(request,response)=>{
    console.log(request.body);// returning "undefined" instead of json string

    // file reads and writes for config.json

    // var config = fs.readFileSync('./config.json');
    // config = JSON.parse(config);
    // var url = config["url"];

    fs.writeFileSync('./config.json',request.body);
    response.send("spaget"); // must send a response to complete the request
})



/****************************************************************************
 * Sends data.json info to frontend app page
/****************************************************************************/
server.get('/', (request, response) => {
    
    fs.stat('./src/data.json',(err,status)=> {
        
        if(err){
            provider.getBitBucketData((data) => {
                fs.writeFileSync('./src/data.json', data);

                response.send(data);
            })
        }

        else{
            let fileData = fs.readFileSync('./src/data.json');
            response.send(fileData);
        }
    })
})


/****************************************************************************
 * Reset Button to return data on radar back to data stored in bitBucket
/****************************************************************************/
server.post('/resetButton',(request, response)=>{

     provider.getBitBucketData((data) => {
            fs.writeFileSync('./src/data.json', data);
                let fileData = fs.readFileSync('./src/data.json')
                response.send(fileData);
            })
})



/****************************************************************************
 * Handles post from app.js for uploaded file (needs to be able to reject none .json files)
/****************************************************************************/
server.use(require('body-parser').text())

// retrieves uploaded data sent from app.js front end at localhost:8080/uploadNewFile
server.post('/uploadNewFile',(request,response)=>{
    console.log('post from new file',request.body);
    fs.writeFileSync('./src/data.json',request.body);
    response.send("spaget"); // must send a response to complete the request
})



/****************************************************************************
 * Handles post from DummyRadarProvider.js for modified data 
/****************************************************************************/
server.use(require('body-parser').text())

// retrieves uploaded data sent from app.js front end at localhost:8080/uploadNewFile
server.post('/uploadNewData',(request,response)=>{
    console.log(request.body);

        fs.writeFileSync('./src/data.json',request.body);
        response.send("spaget"); // must send a response to complete the request
})


/****************************************************************************
 * config.txt info for radar to read
/****************************************************************************/
//server.use(require('body-parser').text())
server.use('/team',(request,response)=>{

    let teamInfo = fs.readFileSync('./config.json');
    response.send(teamInfo);
    
 })
 


/****************************************************************************
 * Serving the index.html file (aka the radar application)
/****************************************************************************/
// serves app.js
server.use('/radar', express.static('./public')); //will read the index.html file by default

//listen for connections 
server.listen(8080, function() {
    console.log('Server listening at Port 8080');
});

