FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

# ATTENTION pour les dossiers il faut préciser le répertoire cible !
# Disabled - use volumes so that we get hot reload
COPY public /app/public/
COPY src /app/src/
COPY node-tutorial.js /app/
RUN echo "*** THIS SHOULD PRINT THE ENV VAR: $REACT_APP_BACKEND_URL"
ARG REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
RUN echo "*** THIS SHOULD PRINT THE ENV VAR: $REACT_APP_BACKEND_URL"
RUN npm run build

# Uses port which is used by the actual application
EXPOSE 5000

CMD [ "npm", "start" ]