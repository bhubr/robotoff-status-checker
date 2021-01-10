FROM node:lts-alpine

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

WORKDIR /app

COPY check-prod-env.sh package.json yarn.lock /app/
RUN ./check-prod-env.sh

RUN yarn

# ATTENTION pour les dossiers il faut préciser le répertoire cible !
# Disabled - use volumes so that we get hot reload
COPY public /app/public/
COPY src /app/src/
RUN npm run build

# Uses port which is used by the actual application
EXPOSE 5000

CMD [ "npm", "start" ]
