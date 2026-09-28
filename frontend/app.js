const API = BACKEND_URL || "";

const EMOJI = { rock: "✊", paper: "✋", scissors: "✌️" };
const RESULT_TEXT = {
  win: ["You win! 🎉", "Nailed it! 🙌", "Too easy! 😎"],
  lose: ["Computer wins! 🤖", "Ouch, you lost! 💥", "Beaten by a bot! 😅"],
  draw: ["It's a draw! 🤝", "Great minds... 🧠", "Copycat! 👯"]
};

let streak = 0;
let playing = false;

const streakEl = document.getElementById("streak");
const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultEl = document.getElementById("result");
const moveButtons = document.querySelectorAll(".move-btn");
const leaderboardList = document.getElementById("leaderboard-list");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const skipBtn = document.getElementById("skip-btn");

let endedStreak = 0;

moveButtons.forEach(btn => {
  btn.addEventListener("click", () => play(btn.dataset.move));
});

async function play(move) {
  if (playing) return;
  playing = true;
  moveButtons.forEach(b => (b.disabled = true));

  resultEl.textContent = "Rock... paper... scissors...";
  resultEl.className = "result";
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  playerHand.className = "hand shaking";
  computerHand.className = "hand shaking";

  try {
    const [data] = await Promise.all([
      fetchJson("/api/play", { move }),
      wait(800)
    ]);
    reveal(move, data.computerMove, data.result);
  } catch (err) {
    playerHand.textContent = "❔";
    computerHand.textContent = "❔";
    playerHand.className = "hand";
    computerHand.className = "hand";
    resultEl.textContent = "Can't reach the game server 😢 Try again!";
  }

  playing = false;
  moveButtons.forEach(b => (b.disabled = false));
}

function reveal(playerMove, computerMove, result) {
  playerHand.textContent = EMOJI[playerMove];
  computerHand.textContent = EMOJI[computerMove];
  playerHand.className = "hand reveal";
  computerHand.className = "hand reveal";

  const lines = RESULT_TEXT[result];
  resultEl.textContent = lines[Math.floor(Math.random() * lines.length)];
  resultEl.className = "result bounce " + result;

  if (result === "win") {
    streak++;
    updateStreak();
  } else if (result === "lose") {
    if (streak > 0) {
      endedStreak = streak;
      showModal();
    }
    streak = 0;
    updateStreak();
  }
}

function updateStreak() {
  streakEl.textContent = streak;
}

function showModal() {
  modalText.textContent =
    endedStreak === 1
      ? "You won 1 in a row. Add it to the leaderboard!"
      : "You won " + endedStreak + " in a row. Add it to the leaderboard!";
  modal.classList.remove("hidden");
  nameInput.value = localStorage.getItem("rps-name") || "";
  nameInput.focus();
}

function hideModal() {
  modal.classList.add("hidden");
}

nameForm.addEventListener("submit", async e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (!name) return;
  localStorage.setItem("rps-name", name);
  hideModal();
  try {
    const top = await fetchJson("/api/scores", { name, streak: endedStreak });
    renderLeaderboard(top, name, endedStreak);
  } catch (err) {
    resultEl.textContent = "Couldn't save your streak 😢";
  }
});

skipBtn.addEventListener("click", hideModal);

async function fetchJson(path, body) {
  const res = await fetch(API + path, body
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    : undefined);
  if (!res.ok) throw new Error("Request failed: " + res.status);
  return res.json();
}

function renderLeaderboard(entries, highlightName, highlightStreak) {
  leaderboardList.innerHTML = "";
  if (!entries.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No streaks yet. Be the first!";
    leaderboardList.appendChild(li);
    return;
  }
  const medals = ["🥇", "🥈", "🥉"];
  let highlighted = false;
  entries.forEach((entry, i) => {
    const li = document.createElement("li");
    if (!highlighted && entry.name === highlightName && entry.streak === highlightStreak) {
      li.className = "you";
      highlighted = true;
    }
    const rank = medals[i] || (i + 1) + ".";
    const nameSpan = document.createElement("span");
    nameSpan.textContent = rank + " " + entry.name;
    const streakSpan = document.createElement("span");
    streakSpan.className = "streak-value";
    streakSpan.textContent = "🔥 " + entry.streak;
    li.append(nameSpan, streakSpan);
    leaderboardList.appendChild(li);
  });
}

async function loadLeaderboard() {
  try {
    const top = await fetchJson("/api/leaderboard");
    renderLeaderboard(top);
  } catch (err) {
    leaderboardList.innerHTML = "";
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Leaderboard unavailable right now.";
    leaderboardList.appendChild(li);
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

loadLeaderboard();
