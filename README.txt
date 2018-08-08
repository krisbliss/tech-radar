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

PUBLIC USAGE GUIDE:
    1) Open BitBucket and create a new repository. Preferably named something involving the name of your team followed by RadarData (i.e. SysEng-RadarData)
    2) In that repository create a new .JSON file and provied project elements in a mannor follwing this template:
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

        *note that '[]' are the outer moset brackets and must be at the start and end of your .JSON file
    3) Download image at: "https://......."  // <-- provide link
    4) run a new container of the image with ...  // <-- add info for file or command line inputs for container
    5) open web browser at "http://localhost:8080/radar/" to view radar





***********************************************************************************************************************************
DEV USAGE GUIDE: 

    Load and test program from Local Machine:
        1) run 'npm install'
        2) run 'npm build:dev'
        3) open web browser at "http://localhost:8080/radar/" to view radar

    Load Program through Docker:
        1) Can download working image at: "https://......."  // <-- provide link
        2) run a new container of immage 
        3) open web browser at "http://localhost:8080/radar/" to view radar

HOW IT WORKS:
    -  Uses 'technology-radar' library for graphics (more info on the library can be found here: https://www.npmjs.com/package/technology-radar)
    -  Back-end server to server the radar webapp and get methods to pull cross origin data from BitBucket
    - 'DummyRadarDataProvider.js' Reads a .JSON file pulled from BitBucket and uses 4 methods, { load(), updateItem(), addItem(), getMetaData() } to modify and/or add data points to the radar
    - 'app.j' is the Main Source file to compile the radar using web-pack

