FROM node:18.2.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# both package.json AND package-lock.json are copied by a wildcard
COPY package*.json ./

RUN npm i

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]