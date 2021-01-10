const { MongoClient } = require('mongodb');
const { mongo: { host, port, database } } = require('./config');

console.log('mongo config', host, port, database);

// Connection URI
const uri = `mongodb://${host}:${port}/${database}?poolSize=20&w=majority`;
console.log('mongo uri', uri);

// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db('admin').command({ ping: 1 });
  console.log('Connected successfully to server');
}
run().catch(console.dir);

module.exports = client;

