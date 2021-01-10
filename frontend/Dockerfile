FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

# ATTENTION pour les dossiers il faut préciser le répertoire cible !
# Disabled - use volumes so that we get hot reload
# COPY public /app/public/
# COPY src /app/src/
COPY node-tutorial.js /app/

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
# CMD [ "node", "node-tutorial" ]
CMD [ "npm", "start" ]