const db = require('./mongo-client');
const { mongo: { database } } = require('./config');

const insertRequest = (data) => {
  return new Promise((resolve, reject) => {
    const dbo = db.db(database);
    dbo.collection('randomQuestions').insertOne(data, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports = insertRequest;
