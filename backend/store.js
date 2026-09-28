const { MongoClient } = require('mongodb');

let collection = null;
let memoryScores = [];

async function init() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('No MONGODB_URI set, keeping the leaderboard in memory.');
    return;
  }
  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    collection = client.db('rps').collection('scores');
    console.log('Leaderboard connected to MongoDB.');
  } catch (err) {
    console.log('Could not reach MongoDB, keeping the leaderboard in memory. (' + err.message + ')');
  }
}

async function topTen() {
  if (collection) {
    return collection
      .find({}, { projection: { _id: 0, name: 1, streak: 1, date: 1 } })
      .sort({ streak: -1, date: 1 })
      .limit(10)
      .toArray();
  }
  return memoryScores
    .slice()
    .sort((a, b) => b.streak - a.streak || a.date - b.date)
    .slice(0, 10);
}

async function add(name, streak) {
  const entry = { name, streak, date: Date.now() };
  if (collection) {
    await collection.insertOne({ ...entry });
  } else {
    memoryScores.push(entry);
  }
}

module.exports = { init, topTen, add };
