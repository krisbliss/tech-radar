FROM node:8

# Create app directory
WORKDIR /usr/radar

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Copy app sources
COPY . . 

# If you are building your code for production
RUN npm install --only=production

# Else run
# RUN npm install

# Creates bundle.js 
RUN npm run build:prod

#port for server.js
EXPOSE 8080

#command start server.js
CMD [ "npm","start" ]
