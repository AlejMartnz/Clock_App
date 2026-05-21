export function initializeSections() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const sections = document.querySelectorAll(".panel");

  // Safety check: Exit early if no tabs or panels exist in the DOM
  if (tabButtons.length === 0 || sections.length === 0) {
    console.warn(
      "Sections initialization skipped: Missing .tab-button or .panel elements.",
    );
    return;
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSectionId = button.dataset.section;

      // Handle Section Toggling
      sections.forEach((section) => {
        section.classList.toggle("active", section.id === targetSectionId);
      });

      // Handle Tab Selection Highlight Toggling
      tabButtons.forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });
    });
  });
}
