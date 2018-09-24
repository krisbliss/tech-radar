# Free Technology Radar ![CI status](https://img.shields.io/badge/techradar-brightgreen.svg)

### Requirements & Overiew
* Docker

### How it Works
* Uses 'technology-radar' library for graphics (more info on the library can be found here: https://www.npmjs.com/package/technology-radar)
* *Note* there is a "recursive promise" bug in the native library of the Technology Radar dependency making there be 2 prompts for inputitng "blip" info when editing radar data
* Back-end server to server the radar webapp and get methods to pull cross origin data from BitBucket
* 'DummyRadarDataProvider.js' Reads a .JSON file pulled from BitBucket and uses 4 methods, { load(), updateItem(), addItem(), getMetaData() } to modify and/or add data points to the radar
* 'app.j' is the Main Source file to compile the radar using web-pack

### Implantation
* This application is intented to be used for any team that would like to have a Technology Radar to keep track of project in a non-linear fashion.
* Using a single docker container, host a server for radars that can be personalized for any team.
* The data for these projects can be stored in BitBucket, Github, etc... as a `.JSON` file and can be edited either from the GUI radar app or from your favorite text editor.


## Team Usage
### Setup Guide:
1) Create a new repository in either Github, BitBucket, etc. Preferably name it something involving the name of your team followed by RadarData (i.e. SysEng-RadarData)

2) In that repository create a new `.JSON` file ie.(your_team_name-data.json) and provied project a test elements in a mannor follwing this template ( you may copy this template to start )

```
[
    {
        "id" : 1,
        "radius" : 0.5, 
        "angle" : 45, 
        "label" : "vitalimages",
        "link" : "https://vitalimages.com",
        "movementId" : 0
    },
]
```
* *Note* that `[ ]` are the outer moset brackets and MUST be at the start and end of your .JSON file as the application can only read the data in the form of an array of objects

4) Open web browser at "http://<container_ip>/radar/" to view radar
5) Click "Add Team" and follow the prompts
6) (OPTIONAL) Click "change URL" if the link to the old data file is corrupted or you want to pull data from a brand new repository
    

### Editing:
* To add or move elemtns around the radar, press the "Edit" button once
    - To add an item click and empty space in the radar and a prompt will appear to type in the element details
    - To move and item, hold click and item and drag it to a new location
    - To remove an item, click the "data.json" link at the top of the radar and download .json file. That file will contain all the data that is currently visable on the Radar page. Then that file can be modified and/or pushed to the data file repository to permanetly save changes to the radar


### Setup Guide:
* Load in Docker Container
    - Download Docker Image kbliss/vita-techradar OR run " docker build -t kbliss/vital-techradar . "
    - Run a new container of the image in docker using this command "docker run --name vitalRadar -p 8080:8080 -d kbliss/vital-techradar"


### Dev Guide:
* The radar runs through server.js so it will not be included into the webpack-dev-tools
* To test the actual radar, run "npm run build:dev" and open the server with "npm start" in a seperate terminal
* *Note* ./team-data/team-list.json MUST have at least one dummy value in there (right now the default is a radar for "SysEng" Team)
   

### Load and test program from Local Machine:
1) run 'npm install'
2) run 'npm run build:dev'
3) run 'npm start' in a seperate terminal
4) open web browser at "http://localhost:8080/radar/" to view radar
* *Note* webpack will only watch the "DummyRadarDataProvider", "provider.js", & "app.js")
    

## License
[MIT](https://choosealicense.com/licenses/mit/)

