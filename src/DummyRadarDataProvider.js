const fetch = require('isomorphic-fetch');;
var fs = require('fs');
const path = require('path');

//Visual File for handling 


export default class DummyRadarDataProvider {
        constructor() {
            // no data is needed as app.js creates this.data for the class
        }


        load() {                                              
            return new Promise(function(resolve, reject) {
                window.setTimeout(function() {
                    resolve(this.data);
                }.bind(this), 100);
            }.bind(this));
        }
    
        updateItem(item) {
            for(var i = 0; i < (item.id); i++ ){ if (i==this.item-1){this.data[i] = item}} 
                this.sendUpdate();

            return new Promise(function(resolve, reject) {
                resolve(item);
            })
        }
    
        addItem(radius, angle) {
            return new Promise(function(resolve, reject) {
                var label = prompt("Please enter the label of the new blip:", "");
                if (label === null || label === "") {
                    reject();
                } else {
                    this.data.push({"id" : this.data.length + 1, "radius" : radius, "angle" : angle, "label" : label});
                    resolve(this.data[this.data.length - 1]);

                   sendUpdate(); // do not need this. infront of value because the function is using (.bind(this)) 
                }
            }.bind(this));
        }

       /**********************************************************************************************
        * Added function to base format that handles data modifications that need to be sent to server
        /*********************************************************************************************/
        sendUpdate() {
            // Posting new "this.data" JSON object to server '/uploadNewData'
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                alert('Ready to Save Modifyed Data');
            };
            xhr.open('post', '/uploadNewData');

            // send data to the server path '/uploadNewFile'
            xhr.send(JSON.stringify(this.data,null,4));
        }

    
        getMetaData() {
            return {
                "quadrants" : [
                    {
                        "id" : 0,
                        "name" : "Tools",
                        "color" : {
                            "blip" : "#86B782",
                            "text" : "#000000"
                        }
                    },
                    {
                        "id" : 1,
                        "name" : "Techniques",
                        "color" : {
                            "blip" : "#1EBCCD",
                            "text" : "#000000"
                        }
                    },
                    {
                        "id" : 2,
                        "name" : "Platforms",
                        "color" : {
                            "blip" : "#F38A3E",
                            "text" : "#000000"
                        }
                    },
                    {
                        "id" : 3,
                        "name" : "Languages & Frameworks",
                        "color" : {
                            "blip" : "#B32059",
                            "text" : "#000000"
                        }
                    },
                ],
                "states" : [
                    {
                        "id" : 0,
                        "name" : "ADOPT",
                        "backgroundColor" : "#BFC0BF"
                    },
                    {
                        "id" : 1,
                        "name" : "TRIAL",
                        "backgroundColor" : "#CBCCCB"
                    },
                    {
                        "id" : 2,
                        "name" : "ASSESS",
                        "backgroundColor" : "#D7D8D6"
                    },
                    {
                        "id" : 3,
                        "name" : "HOLD",
                        "backgroundColor" : "#E4E5E4"
                    },
                ],
                "movements" : [
                    {
                        "id" : 0,
                        "description" : "not changed",
                        "blipIcon" : "circle"
                    },
                    {
                        "id" : 1,
                        "description" : "changed since last release",
                        "blipIcon" : "rectangle"
                    }
                ]
            }
        }
    }

// this is for webpack dev-server hot swap module (not nessesary for production)
    if(module.hot){
        module.hot.accept();
    }