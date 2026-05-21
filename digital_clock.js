import { animateNumberChange } from "./animations.js";

// Helper function to handle pad styling uniformly
function formatTime(value) {
  return String(value).padStart(2, "0");
}

export function updateClock() {
  const now = new Date();

  const hours = formatTime(now.getHours());
  const minutes = formatTime(now.getMinutes());
  const seconds = formatTime(now.getSeconds());

  const timeString = `${hours}:${minutes}:${seconds}`;
  const dateString = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const clockDisplay = document.getElementById("clock-display");
  const clockDate = document.getElementById("clock-date");

  // Safeguard: Check if elements exist in the current DOM before manipulating them
  if (!clockDisplay || !clockDate) return;

  if (clockDisplay.textContent !== timeString) {
    clockDisplay.textContent = timeString;
    // Call animation module safely if available
    if (typeof animateNumberChange === "function") {
      animateNumberChange(clockDisplay);
    }
  }

  if (clockDate.textContent !== dateString) {
    clockDate.textContent = dateString;
  }
}

export function startClock() {
  updateClock(); // Run immediately on initialization to avoid standard 1-second lag gap
  return setInterval(updateClock, 1000); // Return interval ID so it can be cleared or paused if needed
}
