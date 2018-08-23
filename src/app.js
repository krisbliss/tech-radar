'use strict';
// import * as d3 from 'd3';
import Radar from 'technology-radar/src/Radar';
import DummyRadarDataProvider from './DummyRadarDataProvider';
import request from 'request';
var provider = require('./provider');

// global variables to set the name of the radar app by team link
var header = document.getElementById('htmlHeader');
var cookie = provider.getCookie('x-team-name');
header.innerHTML = cookie;

// global variable to take a dictionar of 2 items for initial setup of the radar and for any future URL changes
var configData;

/************************************************************************
* Button for editing url
************************************************************************/
// var setConfig = document.getElementById('setConfig').addEventListener('click', () => {
document.getElementById('setConfig').addEventListener('click', () => {
    request.get('http://localhost:8080/team', (error, response, body) => {
        configData = (JSON.parse(body));
        
        if (error) {
            console.log(error);
        }
        
        // Posting new "this.data" JSON object to server '/uploadNewData'
        for (var value in configData) {
            if (configData[value]['name'] === cookie) {
                configData[value]['url'] = prompt('Copy & Paste link for RAW data file from BitBucket', '');
                console.log('/app/Change Url: ', configData);

                // Posting new "this.data" JSON object to server '/uploadNewData'
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    alert('Ready to Save Modified Data');
                };
                xhr.open('post', '/setConfig');

                // send data to the server path '/setConfig'
                xhr.send(JSON.stringify(configData[value]));
            }
        }
    });
});

/************************************************************************
* Sets the options for the 'tech-radar' library in the './node_modules'
************************************************************************/
var radarOptions = {
    canvasWidth: 1300,
    enableMove: true,
    enableAddNew: true
};

/************************************************************************
 * Sets up the radar to be displayed in the './public/index.html'
/************************************************************************/
var radarDataProvider = new DummyRadarDataProvider();

// pulls data from  localhost:8080/ of server
provider.fetchData().then((value) => {
    radarDataProvider.data = value; // constructs "this.data value" for class DummyRadarDataProvider()
    var radar = new Radar('#techradarContainer', radarDataProvider, radarOptions);
    radar.render();

    // This section is only for the addition of an edit button
    // var button = document.getElementById('editButton').addEventListener('click', function () {
    document.getElementById('editButton').addEventListener('click', function () {
        radar.setEditMode(!radar.getEditMode());
    });
});

/************************************************************************
 * Takes data from uploaded file and sends it to '/uploadNewFile'
/************************************************************************/
// references to buttons below radar (index.html)
let fileInput = document.getElementById('fileInput');
let uploadButton = document.getElementById('uploadButton');

// creates array of files (only every reads one file)
uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        alert('Ready to Upload File');
    };
    xhr.open('post', '/uploadNewFile');
    var reader = new FileReader();

    // send data to the server path '/uploadNewFile'
    reader.onload = () => {
        xhr.send(reader.result);
    };
    reader.readAsText(file);
});

/************************************************************************
 * Rest Button to revert values in radar back to BitBucket Default
/************************************************************************/
let restButton = document.getElementById('bitBucketReset');
restButton.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        alert('Local Data Reverting to BitBucket Data');
    };
    xhr.open('post', '/resetButton');
    xhr.send('spaghet');
});

/************************************************************************
 * this is for webpack dev-server hot swap module
/************************************************************************/
// if(module.hot){
// module.hot.accept();
// }
