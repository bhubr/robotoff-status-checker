const db = require('./mongo-client');
const { mongo: { database } } = require('./config');

const getRequests = () => {
  return new Promise((resolve, reject) => {
    const dbo = db.db(database);
    dbo.collection('randomQuestions').find({}).toArray((err, stats) => {
      if (err) return reject(err);
      return resolve(stats);
    });
  });
};

module.exports = getRequests;
