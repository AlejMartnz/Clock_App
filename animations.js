// Keep track of the active animation object to prevent memory leaks and thread thrashing
let activeAnimation = null;

export function animateNumberChange(element) {
  if (!element) return;

  // Respect system accessibility rules for reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) return;

  // CRITICAL FIX: Kill any running animation frame before creating a new one
  if (activeAnimation) {
    activeAnimation.cancel();
  }

  // Assign and execute the safe, single-frame Web Animation API instance
  activeAnimation = element.animate(
    [
      { opacity: 0.78, transform: "translateY(4px) scale(0.99)" }, // Subtler values look smoother at high refresh rates
      { opacity: 1, transform: "translateY(0) scale(1)" },
    ],
    {
      duration: 120, // Slightly reduced duration so the animation keeps pace with high-speed updates
      easing: "ease-out",
    },
  );
}
