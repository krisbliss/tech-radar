var request = require('request');

module.exports.getData = function(){

    return new Promise((resolve, reject)=>{
                        
        let options = {
            url: 'https://raw.githubusercontent.com/krisbliss/tech-radar/master/data.json',
            rejectUnauthorized: false, // ! learn more about this !
        }// need to create a let function for options such as url

        request(options, (error, response, body)=>{
            console.log("Response: " + JSON.stringify(response));
            console.log('Body: '+body);

            // Not sure if this try statment will catch errors
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject('json parsing error');
            }
        });
    }).catch((err) => { console.log('could not load data',err); })
}