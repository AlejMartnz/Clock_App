import { initializeSections } from "./sections.js";
import { startClock } from "./digital_clock.js";
import { initializeChronometer } from "./chronometer.js";
import { initializeCountdownTimer } from "./countdown_timer.js";

// Wrap execution inside a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  try {
    initializeSections();
    startClock();
    initializeChronometer();
    initializeCountdownTimer();
  } catch (error) {
    console.error("Initialization failed in main.js:", error);
  }
});
