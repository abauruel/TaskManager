FROM node:14-alpine

WORKDIR /usr/src/app

COPY . . 

RUN npm install && npm run tsc  

EXPOSE 3000

CMD [ "npm", "start" ]