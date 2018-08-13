const request = require('request');
const fs = require('fs');
const fetch = require('isomorphic-fetch');

/// Controler  modules for retriving data

/************************************************************************
 * Funtion to get data from bit bucket
/************************************************************************/
module.exports.getBitBucketData = function(callback){

    //takes url from config.json file made by docker and
    var config = fs.readFileSync('./config.json');
    config = JSON.parse(config);
    
    var url = config["url"];
    let options = {
        url: url,
        rejectUnauthorized: false,
    }


    request.get(options, (error, response, body) => {
        console.log("RESPONSE: "+ JSON.stringify(response) +"\n");
        console.log("\nBODY: "+ (body)+"\n");


        
        // stores json data from web page into page
            fs.writeFile('./src/data.json', body, 'utf-8', function(err) {
                if (err) throw err
                console.log('Server\'s copy of data.json writen!');
            });


        callback(body);
        });

} //end of getBitBucketData module

/************************************************************************
 * get data for DummyRadarProvider in app.js
/************************************************************************/
module.exports.fetchData = function() {
    var webData = fetch('http://localhost:8080',{mode:'cors'}) //fetch is properly making call to the backend server but server is not returning data properly
     .then((response) => {
         return response.json();
         }).then((jsonData) => {
     console.log("Response: ", jsonData);
         return jsonData;
     }).catch((err) => { 
         alert("ERROR: Data could not be loaded");
         console.log("Error in loading data "); 
     });
     
         return webData;
 }        