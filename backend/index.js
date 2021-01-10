const express = require('express');
const { port } = require('./config');
const db = require('./mongo-client');

const app = express();

app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/movies', (req, res) => {
  db.db('moviesdb').collection('movies').find({}).toArray((err, movies) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(movies);
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Running on ${port}`);
});

