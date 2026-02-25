(() => {
  "use strict";

  // Year (SAFE)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- NAV: Mobile Menu (no flashing) ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobilePanel = document.getElementById("mobilePanel");
  const mobileCard = mobilePanel ? mobilePanel.querySelector(".mobileCard") : null;
  const navRoot = document.querySelector(".nav");

  let isOpen = false;
  let tapLockUntil = 0;

  const lockTap = (ms = 220) => (tapLockUntil = Date.now() + ms);
  const isTapLocked = () => Date.now() < tapLockUntil;

  function setMenu(open) {
    isOpen = !!open;
    document.body.classList.toggle("mobile-open", isOpen);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(isOpen));

    // prevent background scroll
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    // small lock so the tap that opened can't immediately close it
    lockTap();
  }

  function toggleMenu() {
    setMenu(!isOpen);
  }

  // Button: use pointerup ONLY (avoids pointerdown+click double fire)
  if (menuBtn) {
    menuBtn.addEventListener(
      "pointerup",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      },
      { passive: false }
    );

    // Prevent default click after pointer events
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // Backdrop close: only if you click backdrop, NOT inside card
  if (mobilePanel) {
    mobilePanel.addEventListener(
      "pointerup",
      (e) => {
        if (!isOpen) return;
        if (isTapLocked()) return;

        const clickedInsideCard = mobileCard && mobileCard.contains(e.target);
        if (!clickedInsideCard) setMenu(false);
      },
      { passive: true }
    );

    // Close when clicking a link inside menu
    mobilePanel.addEventListener(
      "click",
      (e) => {
        if (!isOpen) return;
        if (isTapLocked()) return;

        if (e.target.closest("a")) setMenu(false);
      },
      { passive: true }
    );
  }

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setMenu(false);
  });

  // Scroll polish
  window.addEventListener(
    "scroll",
    () => {
      if (!navRoot) return;
      navRoot.classList.toggle("is-scrolled", window.scrollY > 10);
    },
    { passive: true }
  );

  // OPTIONAL: auto-detect logo presence and swap mark->logo when it loads
  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo-img");
    const mark = document.querySelector(".mark");
    if (!logo) return;

    logo.addEventListener("load", () => {
      logo.style.display = "block";
      if (mark) mark.style.display = "none";
    });

    logo.addEventListener("error", () => {
      logo.style.display = "none";
      if (mark) mark.style.display = "block";
    });
  });
})();