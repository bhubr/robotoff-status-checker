FROM node:lts-alpine

WORKDIR /app

# Copy package.json only 
COPY package.json /app/

# Install deps
RUN yarn

# Copy app files
COPY *.js /app/

# Run the app
CMD ["npm", "start"]
