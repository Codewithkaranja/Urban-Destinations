/* ================================
   NJERU PREMIUM JS (wrapped)
   - Fixes mobile menu flashing/closing
   - Keeps typewriter, parallax, swipers, etc.
================================ */
(() => {
  "use strict";

  /* ---------- NAV: Mobile Menu (no flashing) ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobilePanel = document.getElementById("mobilePanel");
  const mobileCard = mobilePanel ? mobilePanel.querySelector(".mobileCard") : null;
  const navRoot = document.querySelector(".nav");

  let isOpen = false;
  let tapLockUntil = 0; // prevents open->immediate close from same tap

  const lockTap = (ms = 220) => (tapLockUntil = Date.now() + ms);
  const isTapLocked = () => Date.now() < tapLockUntil;

  function setMenu(open, reason = "") {
    isOpen = !!open;
    document.body.classList.toggle("mobile-open", isOpen);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(isOpen));

    // prevent background scroll
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    // small lock so the tap that opened can't immediately close it
    lockTap();
  }

  function toggleMenu() {
    setMenu(!isOpen, "toggle");
  }

  // Button: use pointerup ONLY (avoids pointerdown+click double fire on some devices)
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

    // Prevent default click from doing anything weird (some browsers fire it after pointer events)
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
        if (!clickedInsideCard) setMenu(false, "backdrop");
      },
      { passive: true }
    );

    // Close when clicking a link inside menu (but not instantly on same open tap)
    mobilePanel.addEventListener(
      "click",
      (e) => {
        if (!isOpen) return;
        if (isTapLocked()) return;

        const link = e.target.closest("a");
        if (link) setMenu(false, "link");
      },
      { passive: true }
    );
  }

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setMenu(false, "esc");
  });

  // Scroll polish: stronger contrast after slight scroll
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

  /* ---------- Typewriter effect (types + deletes) ---------- */
  (() => {
    const el = document.getElementById("typed-word");
    if (!el) return;

    const words = ["Explore", "Escape", "Safari", "Discover", "Experience"];
    const typingSpeed = 200;
    const deletingSpeed = 100;
    const pauseAfterType = 1200;
    const pauseAfterDelete = 250;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = words[wordIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }
        setTimeout(tick, typingSpeed);
        return;
      }

      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }

      setTimeout(tick, deletingSpeed);
    }

    tick();
  })();

  /* ---------- PARALLAX (smooth + mobile-safe) ---------- */
  (() => {
    const hero = document.querySelector(".hero-parallax");
    if (!hero) return;

    const layers = hero.querySelectorAll("[data-depth]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    function onMove(e) {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const x = (e.clientX - cx) / rect.width;
      const y = (e.clientY - cy) / rect.height;

      targetX = x;
      targetY = y;
    }

    function onScroll() {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
      );
      targetY = (0.5 - progress) * 0.35;
      targetX = 0;
    }

    function raf() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "0");
        const moveX = currentX * depth * 40;
        const moveY = currentY * depth * 40;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      requestAnimationFrame(raf);
    }

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    if (isCoarse) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    raf();
  })();

  /* ---------- Year ---------- */
  (() => {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  })();

  /* ---------- Swipers ---------- */
  (() => {
    if (typeof Swiper === "undefined") return;

    const main = document.querySelector(".swiper");
    if (main) {
      new Swiper(".swiper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 18,
        autoplay: { delay: 4200, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
          0: { slidesPerView: 1.08 },
          640: { slidesPerView: 1.35 },
          900: { slidesPerView: 2.15 },
          1200: { slidesPerView: 2.7 },
        },
      });
    }

    const t = document.querySelector(".t-swiper");
    if (t) {
      new Swiper(".t-swiper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 18,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: ".t-swiper .swiper-pagination", clickable: true },
        breakpoints: {
          0: { slidesPerView: 1.05 },
          700: { slidesPerView: 2.05 },
          1100: { slidesPerView: 3.05 },
        },
      });
    }
  })();

  /* ---------- WhatsApp Enquiry ---------- */
  window.openWhatsAppQuote = function openWhatsAppQuote(e) {
    if (e) e.preventDefault();

    const name = (document.getElementById("name")?.value || "").trim();
    const phone = (document.getElementById("phone")?.value || "").trim();
    const destination = document.getElementById("destination")?.value || "";
    const group = document.getElementById("group")?.value || "";
    const notes = (document.getElementById("notes")?.value || "").trim();

    const sourcePage = encodeURIComponent(window.location.href);

    const msg =
      `🌍 Luxury Safari Enquiry — Njeru Tours%0A` +
      `━━━━━━━━━━━━━━%0A` +
      `👤 Name: ${encodeURIComponent(name)}%0A` +
      `📞 Phone: ${encodeURIComponent(phone)}%0A` +
      `📍 Destination: ${encodeURIComponent(destination)}%0A` +
      `👥 Group Size: ${encodeURIComponent(group)}%0A` +
      `📝 Notes: ${encodeURIComponent(notes || "—")}%0A` +
      `🔗 Source: ${sourcePage}%0A` +
      `━━━━━━━━━━━━━━%0A` +
      `Sent from website`;

    const url = `https://wa.me/254722933305?text=${msg}`;

    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = url;
    }

    return false;
  };
})();