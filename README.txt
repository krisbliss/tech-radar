***********************************************************************************************************************************
████████╗███████╗ ██████╗██╗  ██╗███╗   ██╗ ██████╗ ██╗      ██████╗  ██████╗██╗   ██╗    ██████╗  █████╗ ██████╗  █████╗ ██████╗ 
╚══██╔══╝██╔════╝██╔════╝██║  ██║████╗  ██║██╔═══██╗██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗
   ██║   █████╗  ██║     ███████║██╔██╗ ██║██║   ██║██║     ██║   ██║██║  ███╗╚████╔╝     ██████╔╝███████║██║  ██║███████║██████╔╝
   ██║   ██╔══╝  ██║     ██╔══██║██║╚██╗██║██║   ██║██║     ██║   ██║██║   ██║ ╚██╔╝      ██╔══██╗██╔══██║██║  ██║██╔══██║██╔══██╗
   ██║   ███████╗╚██████╗██║  ██║██║ ╚████║╚██████╔╝███████╗╚██████╔╝╚██████╔╝  ██║       ██║  ██║██║  ██║██████╔╝██║  ██║██║  ██║
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝   ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                                                                                                                                  
███████╗ ██████╗ ██████╗     ██╗   ██╗██╗████████╗ █████╗ ██╗     ██╗███╗   ███╗ █████╗  ██████╗ ███████╗███████╗                 
██╔════╝██╔═══██╗██╔══██╗    ██║   ██║██║╚══██╔══╝██╔══██╗██║     ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝██╔════╝                 
█████╗  ██║   ██║██████╔╝    ██║   ██║██║   ██║   ███████║██║     ██║██╔████╔██║███████║██║  ███╗█████╗  ███████╗                 
██╔══╝  ██║   ██║██╔══██╗    ╚██╗ ██╔╝██║   ██║   ██╔══██║██║     ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝  ╚════██║                 
██║     ╚██████╔╝██║  ██║     ╚████╔╝ ██║   ██║   ██║  ██║███████╗██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗███████║                 
╚═╝      ╚═════╝ ╚═╝  ╚═╝      ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
***********************************************************************************************************************************

This application is intented to be used for any team that would like to have a Technology Radar to keep track of project in a non-linear fashion.
Using a single docker image, containers for radars can be personalized for the projects each team has. 
The data for these projects can be stored in BitBucket as a  .JSON file and can be edited either from 

PUBLIC USAGE:

    Setup Guide:
    1) Download the docker immage
    2) Open BitBucket and create a new repository. Preferably named something involving the name of your team followed by RadarData (i.e. SysEng-RadarData)
    3) In that repository create a new .JSON file ie.(your_team_name-data.json) and provied project a test elements in a mannor follwing this template (you may copie this template to start):
        [
            {
            "id" : 1,
            "radius" : 0.5,  // will alter the coordinates later after code modication to accept strings rather than numbers 
            "angle" : 45,    //
            "label" : "vitalimages",
            "link" : "https://vitalimages.com",
            "movementId" : 0
            },
        ]

        *note that '[]' are the outer moset brackets and MUST be at the start and end of your .JSON file as the application can only read the data in the form of an array of objects
    4) run a new container of the image in docker using this command "docker run --name your_radar_name_here -p 8080:8080 -d kbliss/vital-techradar"
    5) open web browser at "http://localhost:8080/radar/" to view radar 
    5.5) If this is the first time setting up the radar it will ask for the name you want to give the radar and a bitbucket link (you may skip step 6)
    6) Click "change URL" if the link to the old data file is corrupted or you want to pull data from a brand new repository
    
    Editing:
        - To add or move elemtns around the radar, press the "Edit" button once
            a) To add an item click and empty space in the radar and a prompt will appear to type in the element details
            b) To move and item, hold click and item and drag it to a new location

        - To remove an item, click the "data.json" link at the top of the radar and use you favortie text editor to delete the object from the file.
        Then upload the new file to the data repository on bitbucket



***********************************************************************************************************************************
DEV GUIDE:

   - The radar runs through server.js
   - To test the actual radar using the webpack dev server uncomment the 'fetch' function in the constructor DummyRadarDataProvider.js 

    Load and test program from Local Machine:
        1) run 'npm install'
        2) run 'npm run build:dev'
        4) run 'npm run start:dev'
        3) open web browser at "http://localhost:8080/radar/" to view radar


HOW IT WORKS:
    -  Uses 'technology-radar' library for graphics (more info on the library can be found here: https://www.npmjs.com/package/technology-radar)
    -  Back-end server to server the radar webapp and get methods to pull cross origin data from BitBucket
    - 'DummyRadarDataProvider.js' Reads a .JSON file pulled from BitBucket and uses 4 methods, { load(), updateItem(), addItem(), getMetaData() } to modify and/or add data points to the radar
    - 'app.j' is the Main Source file to compile the radar using web-pack

