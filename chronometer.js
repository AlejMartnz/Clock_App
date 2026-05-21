import { animateNumberChange } from "./animations.js";

let startTime = 0;
let elapsedTime = 0;
let timerRaf = null; // Switched from interval to RequestAnimationFrame
let isRunning = false;

function formatElapsedTime(ms) {
  const safeMs = Math.max(0, ms);
  const minutes = String(Math.floor(safeMs / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((safeMs % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor(safeMs % 1000)).padStart(3, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTimerDisplay() {
  // FIXED: Changed from "timer-display" to match your HTML ID "chronometer-display"
  const display = document.getElementById("chronometer-display");
  if (!display) return;

  const nextValue = formatElapsedTime(elapsedTime);

  if (display.textContent !== nextValue) {
    display.textContent = nextValue;

    // Safety check before running heavy UI animation modules
    if (typeof animateNumberChange === "function") {
      animateNumberChange(display);
    }
  }
}

function loopTimer() {
  if (!isRunning) return;

  elapsedTime = performance.now() - startTime;
  updateTimerDisplay();

  // Continuously request the next available rendering frame
  timerRaf = requestAnimationFrame(loopTimer);
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startTime = performance.now() - elapsedTime;

  // Begin the high-performance animation frame loop
  timerRaf = requestAnimationFrame(loopTimer);
}

function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  if (timerRaf) {
    cancelAnimationFrame(timerRaf);
    timerRaf = null;
  }
}

function resetTimer() {
  isRunning = false;
  if (timerRaf) {
    cancelAnimationFrame(timerRaf);
    timerRaf = null;
  }
  elapsedTime = 0;
  updateTimerDisplay();
}

// FIXED: Renamed to match the import expectations used in your central main.js file
export function initializeChronometer() {
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const resetBtn = document.getElementById("reset-btn");

  // Safety Gate: Ensure elements exist before appending listeners
  if (!startBtn || !pauseBtn || !resetBtn) {
    console.warn("Chronometer UI elements missing from the DOM.");
    return;
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateTimerDisplay();
}
