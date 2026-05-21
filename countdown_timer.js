import { animateNumberChange } from "./animations.js";

let countdownRaf = null; // Switched from interval to RequestAnimationFrame
let isRunning = false;
let endTime = 0;
let remainingTime = 0;
let initialDuration = 0;

function formatCountdown(ms) {
  const safeMs = Math.max(0, ms);
  const minutes = String(Math.floor(safeMs / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((safeMs % 60000) / 1000)).padStart(2, "0");

  // Truncate to hundreds or tens digit if you prefer cleaner visual performance,
  // but keeping 3-digits here to align exactly with your UI display template:
  const milliseconds = String(Math.floor(safeMs % 1000)).padStart(3, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateCountdownDisplay() {
  const display = document.getElementById("countdown-display");
  if (!display) return;

  const nextValue = formatCountdown(remainingTime);

  if (display.textContent !== nextValue) {
    display.textContent = nextValue;
    // Safety: only trigger heavy animation modules on change boundaries if needed
    if (typeof animateNumberChange === "function") {
      animateNumberChange(display);
    }
  }
}

function getInputDuration() {
  const minutesInput = document.getElementById("minutes-input");
  const secondsInput = document.getElementById("seconds-input");

  if (!minutesInput || !secondsInput) return 0;

  const minutes = Number.isNaN(minutesInput.valueAsNumber)
    ? 0
    : minutesInput.valueAsNumber;
  const seconds = Number.isNaN(secondsInput.valueAsNumber)
    ? 0
    : secondsInput.valueAsNumber;

  return (minutes * 60 + seconds) * 1000;
}

function loopCountdown() {
  if (!isRunning) return;

  remainingTime = Math.max(0, endTime - performance.now());
  updateCountdownDisplay();

  if (remainingTime <= 0) {
    cancelAnimationFrame(countdownRaf);
    countdownRaf = null;
    isRunning = false;
  } else {
    // Keep looping natively alongside browser refresh frame ticks
    countdownRaf = requestAnimationFrame(loopCountdown);
  }
}

function startCountdown() {
  if (isRunning) return;

  if (remainingTime <= 0) {
    initialDuration = getInputDuration();
    remainingTime = initialDuration;
  }

  if (remainingTime <= 0) return;

  isRunning = true;
  endTime = performance.now() + remainingTime;

  // Fire frame-loop chain
  countdownRaf = requestAnimationFrame(loopCountdown);
}

function pauseCountdown() {
  if (!isRunning) return;

  if (countdownRaf) {
    cancelAnimationFrame(countdownRaf);
    countdownRaf = null;
  }
  isRunning = false;

  remainingTime = Math.max(0, endTime - performance.now());
  updateCountdownDisplay();
}

function resetCountdown() {
  if (countdownRaf) {
    cancelAnimationFrame(countdownRaf);
    countdownRaf = null;
  }
  isRunning = false;

  remainingTime = getInputDuration();
  initialDuration = remainingTime;
  updateCountdownDisplay();
}

function syncDisplayWithInputs() {
  if (isRunning) return;

  remainingTime = getInputDuration();
  initialDuration = remainingTime;
  updateCountdownDisplay();
}

export function initializeCountdownTimer() {
  const startBtn = document.getElementById("countdown-start-btn");
  const pauseBtn = document.getElementById("countdown-pause-btn");
  const resetBtn = document.getElementById("countdown-reset-btn");

  const minutesInput = document.getElementById("minutes-input");
  const secondsInput = document.getElementById("seconds-input");

  // Safety gate checks for DOM parsing safety
  if (!startBtn || !pauseBtn || !resetBtn || !minutesInput || !secondsInput) {
    console.warn("Countdown UI elements missing from the DOM.");
    return;
  }

  startBtn.addEventListener("click", startCountdown);
  pauseBtn.addEventListener("click", pauseCountdown);
  resetBtn.addEventListener("click", resetCountdown);

  minutesInput.addEventListener("input", syncDisplayWithInputs);
  secondsInput.addEventListener("input", syncDisplayWithInputs);

  // Set initial display matching baseline input options on page load
  syncDisplayWithInputs();
}
