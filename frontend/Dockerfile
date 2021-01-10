FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY public /app/public/
# ATTENTION pour les dossiers il faut préciser le répertoire cible !
COPY src /app/src/
COPY node-tutorial.js /app/

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
# CMD [ "node", "node-tutorial" ]
CMD [ "npm", "start" ]