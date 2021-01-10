require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongo: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_NAME || 'mydb',
  },
};

