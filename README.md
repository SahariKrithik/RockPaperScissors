# ✊ ✋ ✌️ Rock Paper Scissors

Hi! This is a game YOU can play, and it was built with the help of an
AI robot friend called Claude. You play Rock Paper Scissors against
the computer, win rounds in a row to grow your streak 🔥, and if your
streak is long enough... your name goes on the leaderboard 🏆 for the
whole world to see!

## 🗺️ What is inside this backpack?

Coders call this whole folder a **repository** (repo for short). It is
like a magic backpack that keeps our game safe. Inside there are two
pockets:

| Pocket | What it is | Coders call it |
|--------|-----------|----------------|
| `frontend/` | The part you SEE: buttons, colors, emoji | the **frontend** |
| `backend/` | The hidden brain that picks the computer's move and decides who won | the **backend** |

The brain also remembers the leaderboard in a memory box called
**MongoDB**, a real **database**. If no memory box is connected, it
just remembers things in its head until you restart (then it forgets,
just like all of us before morning coffee).

## 🏠 Play it at home (on localhost)

You need [Node.js](https://nodejs.org) on your computer. Ask a
grown-up to install it, it is free!

Then open the magic typing window (Windows: **PowerShell**, Mac:
**Terminal**) in this folder and say the two magic words:

```
npm install
npm start
```

Now open **http://localhost:3000** in your browser and play! 🎉

"localhost" means the game is running on YOUR computer only. It is
your private practice stage. Nobody else can see it... yet!

## 🚀 The Big Deploy Adventure (put it on the REAL internet)

"Deploying" is coder speak for putting your game on the internet.
It is a treasure hunt with 5 steps, and everything is FREE. Bring a
grown-up helper for the account-making parts!

### Step 1: 🗃️ Make the memory box (MongoDB Atlas)

The leaderboard needs a place to live forever.

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and make a free account.
2. Create a **free cluster** (the M0 one; that is the memory box).
3. In **Database Access**, make a database user: pick a username and password.
4. In **Network Access**, click "Allow access from anywhere" (0.0.0.0/0) so the kitchen can reach the pantry.
5. Click **Connect > Drivers** and copy the **connection string**. It looks like `mongodb+srv://user:password@cluster...`.

> 🔑 That string is the SECRET KEY to your memory box. It is like a
> house key: NEVER show it to anyone, never put it in your code, and
> never share it in a video!

### Step 2: 🍳 Wake up the brain (Render)

Render is the kitchen where the backend cooks, day and night.

1. Go to [render.com](https://render.com) and sign in with your GitHub account.
2. Click **New > Web Service** and pick THIS repository (your backpack!).
3. Set **Root Directory** to `backend` (that tells Render which pocket the brain is in).
4. Build command: `npm install`. Start command: `npm start`.
5. Add an **Environment Variable**: name it `MONGODB_URI` and paste your secret key from Step 1. This is you handing the kitchen a key to the pantry.
6. Click **Deploy** and watch it cook! When it is done, copy your backend's web address (it looks like `https://something.onrender.com`).

### Step 3: 🩺 Check the brain is awake

Open `https://YOUR-BACKEND-ADDRESS/api/leaderboard` in your browser.
If you see `[]` (two little brackets), the brain is alive and the
leaderboard is just empty. High five! ✋

### Step 4: 🔌 Tell the face where the brain lives

Open `frontend/config.js` and put your Render address in it:

```js
const BACKEND_URL = "https://YOUR-BACKEND-ADDRESS.onrender.com";
```

Save it, and push the change to GitHub (ask your grown-up helper, or
ask Claude to do it!). Without this step, the pretty face and the
brain cannot talk to each other.

### Step 5: 🚀 Launch the face (Vercel)

Vercel is the launchpad that shows your game to the whole world.

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New > Project** and pick this same repository.
3. Set **Root Directory** to `frontend` and Framework Preset to **Other**. No build command needed; our frontend is ready as it is.
4. Press the big **Deploy** button. 3... 2... 1... LIFTOFF! 🚀

Vercel gives you a magic link. Open it, play a round, win a streak,
and watch your name land on a leaderboard that lives on the REAL
internet. You did it!

> 😴 One funny thing: the free kitchen takes a nap when nobody plays
> for a while. The first round after a nap can take about 30 seconds
> while the brain wakes up and stretches. Totally normal!

## 📽️ Want to learn how this was made?

- Open `slides.html` on the website for the quick story of this game.
- Open `video-slides.html` for the full "Let's put a game on the internet!" slide deck.

## 🤓 For curious coders: how the face talks to the brain

The frontend and backend talk by sending little messages called
**API requests**:

- `POST /api/play` with `{ "move": "rock" }` - the brain picks its own move and answers who won
- `GET /api/leaderboard` - the top 10 longest streaks ever
- `POST /api/scores` with `{ "name": "Sam", "streak": 7 }` - saves a streak to the memory box

That is the whole game. Three messages, one brain, one memory box,
and a lot of ✊ ✋ ✌️.

**Now go beat that leaderboard!** 🏆
