const path = require('path');
const express = require('express');
const cors = require('cors');
const store = require('./store');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

const MOVES = ['rock', 'paper', 'scissors'];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

app.post('/api/play', (req, res) => {
  const move = req.body && req.body.move;
  if (!MOVES.includes(move)) {
    return res.status(400).json({ error: 'move must be rock, paper or scissors' });
  }
  const computerMove = MOVES[Math.floor(Math.random() * MOVES.length)];
  let result = 'draw';
  if (BEATS[move] === computerMove) result = 'win';
  else if (BEATS[computerMove] === move) result = 'lose';
  res.json({ computerMove, result });
});

app.get('/api/leaderboard', async (req, res) => {
  res.json(await store.topTen());
});

app.post('/api/scores', async (req, res) => {
  const name = String((req.body && req.body.name) || '').trim().slice(0, 20);
  const streak = Number(req.body && req.body.streak);
  if (!name || !Number.isInteger(streak) || streak < 1) {
    return res.status(400).json({ error: 'a name and a streak of at least 1 are required' });
  }
  await store.add(name, streak);
  res.json(await store.topTen());
});

const PORT = process.env.PORT || 3000;
store.init().then(() => {
  app.listen(PORT, () => console.log('Rock Paper Scissors running at http://localhost:' + PORT));
});
