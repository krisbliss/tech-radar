const express = require('express');
var server = express();
var fs = require('fs');
var provider = require('./src/provider');
const cookieParser = require('cookie-parser');

// additional features from libraries for this instance of "server" to use
server.use(cookieParser());
server.use(require('body-parser').text());

/****************************************************************************
 * setting headers for server
/****************************************************************************/
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/****************************************************************************
 * Sets team-list.json data file (NEEDS WORK)
/****************************************************************************/
// sets and retrieves team-list data
server.post('/setConfig', (request, response) => {
    var config = fs.readFileSync('./team-data/team-list.json');
    config = JSON.parse(config);
    var newItem = JSON.parse(request.body);
    console.log('newItem: ', newItem);

    if (newItem['name'] === '') {
        response.send('somebody');
    } else {
        var i = 0; // set iterator

        for (var value in config) {
            if (config[value]['name'] === newItem['name']) {
                config[value]['url'] = newItem['url'];
                console.log('\nConfig[value]: ', config[value]);
                // console.log('\nObject value: ', Object.keys(config));
            } else if (i === (config.length - 1) && newItem['name'] !== null) {
                config.push(newItem);
            }
            i += 1;
        }

        console.log('\n/setConfig -config: ', config); // test
        i = 0;
        fs.writeFileSync('./team-data/team-list.json', JSON.stringify(config, null, 4), 'utf-8');
        response.send('somebody'); // must send a response to complete the request
    }
});

/****************************************************************************
 * Sends data.json info to frontend app page
/****************************************************************************/
server.get('/', (request, response) => {
    let teamName = request.cookies['x-team-name'];
    fs.stat('./data-files/' + teamName + '-data.json', (err, status) => {
        if (err) {
            provider.getBitBucketData(teamName, (data) => {
                fs.writeFileSync('./data-files/' + teamName + '-data.json', data, 'utf-8');
                response.send(data);
            });
        } else {
            let fileData = fs.readFileSync('./data-files/' + teamName + '-data.json');
            response.send(fileData);
        }
    });
});

/****************************************************************************
 * Reset Button to return data on radar back to data stored in bitBucket
/****************************************************************************/
server.post('/resetButton', (request, response) => {
    let teamName = request.cookies['x-team-name'];
    provider.getBitBucketData(teamName, (data) => {
        fs.writeFileSync('./data-files/' + teamName + '-data.json', data, 'utf-8');

        let fileData = fs.readFileSync('./data-files/' + teamName + '-data.json');
        response.send(fileData);
    });
});

/****************************************************************************
 * Handles post from app.js for uploaded file (needs to be able to reject none .json files)
/****************************************************************************/
// retrieves uploaded data sent from app.js front end at localhost:8080/uploadNewFile
server.post('/uploadNewFile', (request, response) => {
    let teamName = request.cookies['x-team-name'];
    console.log('Post from new file', request.body);

    fs.writeFileSync('./data-files/' + teamName + '-data.json', request.body, 'utf-8');
    response.send('touch\'a'); // must send a response to complete the request
});

/****************************************************************************
 * Handles post from DummyRadarProvider.js for modified data
/****************************************************************************/
// retrieves uploaded data sent from app.js front end at localhost:8080/uploadNewFile
server.post('/uploadNewData', (request, response) => {
    let teamName = request.cookies['x-team-name'];
    console.log(request.body);

    fs.writeFileSync('./data-files/' + teamName + '-data.json', request.body, 'utf-8');
    response.send('my'); // must send a response to complete the request
});

/****************************************************************************
 * List of teams
/****************************************************************************/
server.use('/radar', express.static('./team-data'));

/****************************************************************************
 * team-list.json info for radar to read
/****************************************************************************/

server.use('/team', (request, response) => {
    let teamInfo = fs.readFileSync('./team-data/team-list.json');

    teamInfo = JSON.parse(teamInfo);
    console.log('/server/team  teaminfo: ', teamInfo);
    response.send(teamInfo);
});

/****************************************************************************
 * Serving the index.html file (aka the radar application)
/****************************************************************************/
// serves the Team app.js
server.use('/radar/:teamName', function (request, response, next) {
    // uses cookies
    response.cookie('x-team-name', request.params.teamName);
    next();
}, express.static('./public')); // will read the index.html file by default

// listen for connections
server.listen(8080, function () {
    console.log('Server listening at Port 8080');
});
