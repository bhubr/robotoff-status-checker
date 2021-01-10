const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { port } = require('./config');
const db = require('./mongo-client');
const { mongo: { database } } = require('./config');
const getRequests = require('./get-requests');
require('./run');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.get('/api/questions-stats', async (req, res) => {
  try {
    const stats = await getRequests();
    res.send(stats);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

app.get('/api/questions-stats/export', async (req, res) => {
  try {
    const stats = await getRequests();
    const statsWithoutIds = stats.map(({ _id, ...rest }) => rest);
    const statsJson = JSON.stringify(statsWithoutIds, null, 2);
    const outputFile = `/app-data/export${Date.now()}.json`;
    await fs.writeFile(outputFile, statsJson);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Running on ${port}`);
});

