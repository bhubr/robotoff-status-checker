const express = require('express');
const { port } = require('./config');
const db = require('./mongo-client');
const { mongo: { database } } = require('./config');
require('./run');

const app = express();

app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/api/questions-stats', (req, res) => {
  const dbo = db.db(database);
  dbo.collection('randomQuestions').find({}).toArray((err, stats) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(stats);
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Running on ${port}`);
});

