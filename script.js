const MALA_SIZE = 108;

let count = parseInt(localStorage.getItem("count")) || 0;
let goal = parseInt(localStorage.getItem("goal")) || 5;
let dark = localStorage.getItem("dark") === "true";

const goalInput = document.getElementById("goal");
const signal = document.getElementById("signal");

if (dark) document.body.classList.add("dark");
goalInput.value = goal;

function updateUI() {
  const malas = Math.floor(count / MALA_SIZE);
  const current = count % MALA_SIZE;
  const progress = Math.min(malas / goal, 1) * 100;

  document.getElementById("count").textContent = count;
  document.getElementById("malas").textContent = malas;
  document.getElementById("current").textContent = current;
  document.getElementById("progress").style.width = progress + "%";

  localStorage.setItem("count", count);
  localStorage.setItem("goal", goal);
  localStorage.setItem("dark", dark);
}

function showSignal() {
  signal.classList.remove("hidden");
  signal.style.animation = "none";
  signal.offsetHeight; 
  signal.style.animation = null;

  setTimeout(() => {
    signal.classList.add("hidden");
  }, 2500);
}

function increment() {
  count++;

  if (count % MALA_SIZE === 0) {
    showSignal();
  }

  updateUI();
}

function resetCounter() {
  count = 0;
  updateUI();
}

goalInput.addEventListener("change", (e) => {
  goal = parseInt(e.target.value) || 1;
  updateUI();
});

function toggleDarkMode() {
  dark = !dark;
  document.body.classList.toggle("dark");
  updateUI();
}

updateUI();
