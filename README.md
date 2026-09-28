# Rock Paper Scissors

A bright and playful Rock Paper Scissors game. You play against the computer, build a win streak, and when your streak ends you can put your name on the top 10 leaderboard of the longest streaks ever.

- `frontend/` - the website (plain HTML/CSS/JS, no build step)
- `backend/` - a small Node.js + Express server that picks the computer's move, decides the winner, and keeps the leaderboard (MongoDB, or in memory when no database is connected)

## Play it locally

You need [Node.js](https://nodejs.org) installed.

```
npm install
npm start
```

Then open http://localhost:3000 and play. The backend serves the frontend for you locally, so that one command is all you need. No database required - the leaderboard just lives in memory until you restart.

## Deploy checklist

Follow these in order. Steps 1-2 give you a database, 3-4 a live backend, 5-6 a live website.

1. **Push this project to GitHub.** Create a repository and push the whole folder (frontend and backend together is fine).

2. **Create the database on MongoDB Atlas.**
   1. Sign up at https://www.mongodb.com/cloud/atlas and create a free (M0) cluster.
   2. Create a database user with a username and password (Database Access).
   3. Under Network Access, allow access from anywhere (0.0.0.0/0) so Render can reach it.
   4. Click Connect > Drivers and copy the connection string. It looks like `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/`. Keep it handy for step 3.

3. **Deploy the backend on Render.**
   1. Sign up at https://render.com and create a New Web Service from your GitHub repository.
   2. Set **Root Directory** to `backend`.
   3. Build command: `npm install`. Start command: `npm start`.
   4. Add an environment variable: `MONGODB_URI` = the Atlas connection string from step 2.
   5. Deploy, then copy your backend URL (something like `https://my-rps-backend.onrender.com`).

4. **Check the backend is alive.** Open `https://YOUR-BACKEND-URL/api/leaderboard` in a browser. You should see `[]` (or scores). The Render logs should say "Leaderboard connected to MongoDB."

5. **Point the frontend at your backend.** Open `frontend/config.js` and set:
   ```js
   const BACKEND_URL = "https://YOUR-BACKEND-URL.onrender.com";
   ```
   Commit and push.

6. **Deploy the frontend on Vercel.**
   1. Sign up at https://vercel.com and create a New Project from the same GitHub repository.
   2. Set **Root Directory** to `frontend` and Framework Preset to **Other**. No build command needed.
   3. Deploy and open your Vercel URL. Play a round to confirm everything works end to end.

Note: Render's free tier puts the backend to sleep after inactivity, so the first round after a while can take ~30 seconds to wake it up.

## API (for the curious)

- `POST /api/play` with `{ "move": "rock" }` - returns the computer's move and the result
- `GET /api/leaderboard` - top 10 longest streaks
- `POST /api/scores` with `{ "name": "Sam", "streak": 7 }` - saves a streak, returns the updated top 10
