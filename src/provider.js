const fs = require('fs');
const fetch = require('isomorphic-fetch');
var request = require('request');

/// Controler modules for retriving data

/************************************************************************
 * Funtion to get data from bit bucket
/************************************************************************/
module.exports.getBitBucketData = function (cookie, callback) {
    // takes url from team-list.json
    var config = fs.readFileSync('./team-data/team-list.json');
    config = JSON.parse(config);

    // uses cookie value to look for proper 'url' value in config{}
    for (var value in config) {
        if (config[value]['name'] === cookie) {
            var url = config[value]['url'];
        }
    }

    // option requirments for request library
    let options = {
        url: url,
        rejectUnauthorized: false
    };

    // retrieves data from bitbucket
    request.get(options, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        console.log('\nRESPONSE: ' + JSON.stringify(response) + '\n');
        console.log('\nBODY: ' + (body) + '\n');

        // stores json data from web page into page
        fs.writeFile('./data-files/' + cookie + '-data.json', body, 'utf-8', function (err) {
            if (err) {
                throw err;
            };
            console.log('\nServer\'s copy of data.json writen!');
        });

        callback(body);
    });
}; // end of getBitBucketData module

/************************************************************************
 * get data for DummyRadarProvider in app.js
/************************************************************************/
module.exports.fetchData = function () {
    var webData = fetch('http://localhost:8080/', { mode: 'cors' }) // fetch is properly making call to the backend server but server is not returning data properly
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log('\nprovider/fetchData Response: ', jsonData);
            return jsonData;
        }).catch((err) => {
            alert('ERROR: Data could not be loaded');
            console.log('\nError in loading data ', err);
        });

    return webData;
};

/************************************************************************
 * get cookie data on client side
/************************************************************************/
module.exports.getCookie = function (cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};
