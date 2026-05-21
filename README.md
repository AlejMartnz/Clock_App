# 🕒 Clock App

A sleek, lightweight, and high-performance web-based timekeeping application. Built using modern vanilla web technologies, the app features a localized Digital Clock, a high-precision Chronometer (Stopwatch), and a customizable Countdown Timer inside an integrated tab-based single-page ecosystem.

---

## ✨ Features

* **Digital Clock:** Displays a real-time 24-hour localized clock paired with a cleanly formatted full date string.
* **High-Precision Chronometer:** Tracks elapsed time down to the millisecond, optimized for modern high-refresh-rate displays.
* **Countdown Timer:** A configurable input-driven timer that tracks remaining durations with smooth visual frame counting.
* **Modern Tab Navigation:** Fluid panel switching using CSS Grid stacking layout logic to avoid absolute-position clipping or content shifting.
* **Hardware-Accelerated Micro-Animations:** Micro-interactions on text transformations driven by the Web Animations API, with active thread protection.
* **Accessibility First:** Native support for the `prefers-reduced-motion` media query to ensure zero-lag compliance for sensitive system profiles.

---

## 🛠️ Tech Stack & Architecture

This project is authored with performance and clean code isolation in mind, utilizing zero external library dependencies:

* **HTML5:** Structured semantic markup using an overlay matrix paradigm.
* **CSS3 (Modern Grid & Variables):** Utilizes single-cell grid stacking layouts (`grid-column: 1 / -1`) to cleanly handle variable-height tab views without page layout collapse.
* **Vanilla ES6+ Modules:** Code is organized into cleanly decoupled, single-responsibility files imported natively by the browser.

### 📂 File Structure

Clock_App/
├── index.html            # Main application structure and DOM nodes
├── css/
│   └── style.css         # Reset styles, themes, and CSS Grid layout layers
└── js/
    ├── main.js           # Central app hub; initializes DOM bindings
    ├── sections.js       # Orchestrates tab-switching navigation states
    ├── digital_clock.js  # Live clock interval loops & localization formatting
    ├── chronometer.js    # Performance-stamp driven stopwatch module
    ├── countdown_timer.js# Dynamic timer control systems
    └── animations.js     # Throttled Web Animation API engine

## 🚀 Performance Optimizations

Unlike basic tutorials that leverage primitive loops, this app is built for production environments:

* **`requestAnimationFrame` Over `setInterval`:** The Chronometer and Countdown systems hook directly into the browser's native graphic rendering pipeline rather than hammering a heavy 10ms background interval thread. This prevents frame dropping, skips jitter, and cuts CPU utilization.
* **Animation Thrashing Protection:** The animation engine actively stores references to running element interactions and enforces a `.cancel()` interception loop before spawning subsequent ticks. This protects threads from bloating or crashing.
* **Tabular Numbers:** Text readouts leverage `font-variant-numeric: tabular-nums` to ensure monospaced numerical alignments, eliminating layout jitter while numbers increment.

---

## ⚙️ Installation & Local Development

Because this project relies strictly on native browser-supported ES Modules (`type="module"`), security rules require it to be served via a local web server rather than opened directly as a file.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/AlejMartnz/Clock_App.git](https://github.com/AlejMartnz/Clock_App.git)

2. **Navigate into the folder directory**:

   ```Bash
   cd Clock_App
3. **Boot a local development server (Choose one):**
   * **VS Code:** Install the **Live Server** extension, right-click `index.html`, and select *Open with Live Server*.
   * **NodeJS/npm:** Run `npx serve` in your terminal.
   * **Python:** Run `python -m http.server 8000` in your terminal.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
