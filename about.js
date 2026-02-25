(() => {
  "use strict";

  /* =========================
     NAV: Mobile Menu (stable)
  ========================== */
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
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    lockTap();
  }

  function toggleMenu() {
    setMenu(!isOpen);
  }

  // Toggle button
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

    // prevent “extra click” after pointer event
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // Close only when clicking backdrop (not the card)
  if (mobilePanel) {
    mobilePanel.addEventListener(
      "pointerup",
      (e) => {
        if (!isOpen) return;
        if (isTapLocked()) return;

        const clickedInside = mobileCard && mobileCard.contains(e.target);
        if (!clickedInside) setMenu(false);
      },
      { passive: true }
    );

    // Close on link click
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

  // OPTIONAL: logo swap (safe)
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

  /* =========================
     Testimonials (safe init)
  ========================== */

  // Helpers
  function starsHTML(rating) {
    const total = 5;
    let out = "";
    for (let i = 1; i <= total; i++) {
      out += `<span class="star ${i <= rating ? "" : "dim"}"></span>`;
    }
    return out;
  }

  const AVG_RATING = 4.8;
  const REVIEW_COUNT = 124;

  const avgRatingEl = document.getElementById("avgRating");
  const reviewCountEl = document.getElementById("reviewCount");
  const avgStarsEl = document.getElementById("avgStars");

  if (avgRatingEl) avgRatingEl.textContent = AVG_RATING.toFixed(1);
  if (reviewCountEl) reviewCountEl.textContent = String(REVIEW_COUNT);
  if (avgStarsEl) avgStarsEl.innerHTML = starsHTML(AVG_RATING);

  const TESTIMONIALS = [
    {
      name: "Sarah M.",
      location: "Nairobi",
      rating: 5,
      date: "2 weeks ago",
      text: "Everything was smooth — clear itinerary, on-time pickup, and the hotel options were exactly what we wanted. Very professional planning.",
      trip: "Diani Beach Escape",
      video: ""
    },
    {
      name: "James K.",
      location: "Machakos",
      rating: 5,
      date: "1 month ago",
      text: "We did a Mara trip as a group and it was well coordinated. Great communication and no surprises. Would book again.",
      trip: "Maasai Mara Safari",
      video: ""
    },
    {
      name: "Wanjiku N.",
      location: "Diaspora",
      rating: 5,
      date: "3 weeks ago",
      text: "They helped us plan from abroad and it felt like concierge service. Quick replies on WhatsApp and the schedule was perfect.",
      trip: "Kenya Highlights",
      video: "https://example.com/video-review"
    },
    {
      name: "Peter O.",
      location: "Mombasa",
      rating: 4,
      date: "2 months ago",
      text: "Comfortable transfers and very polite driver. They recommended a better route and saved us time. Solid service.",
      trip: "Airport & City Transfers",
      video: ""
    },
    {
      name: "Aisha T.",
      location: "Kajiado",
      rating: 5,
      date: "5 days ago",
      text: "Loved the attention to detail. They gave us options, explained costs clearly, and handled everything. Stress-free travel.",
      trip: "Amboseli Weekend",
      video: ""
    }
  ];

  const tSlides = document.getElementById("tSlides");

  function googleG() {
    return `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 12.2c0-.7-.06-1.2-.2-1.8H12v3.4h5.1c-.1.9-.7 2.2-2 3.1v2.2h3.2c1.9-1.7 2.7-4.1 2.7-6.9Z" fill="rgba(255,234,170,.92)"/>
        <path d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.2-2.2c-.9.6-2 .9-3.2.9-2.5 0-4.6-1.7-5.3-4.1H3.4v2.3C5 19.7 8.2 22 12 22Z" fill="rgba(15,106,82,.95)"/>
        <path d="M6.7 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V7.6H3.4C2.7 9 2.3 10.5 2.3 12s.4 3 1.1 4.4l3.3-2.3Z" fill="rgba(255,255,255,.25)"/>
        <path d="M12 5.8c1.8 0 3 .8 3.7 1.5l2.7-2.6C16.8 3.2 14.6 2 12 2 8.2 2 5 4.3 3.4 7.6l3.3 2.3C7.4 7.5 9.5 5.8 12 5.8Z" fill="rgba(201,162,39,.92)"/>
      </svg>
    `;
  }

  if (tSlides) {
    tSlides.innerHTML = TESTIMONIALS.map((t) => `
      <div class="swiper-slide">
        <article class="t-card">
          <div class="t-top">
            <div class="g-badge" aria-hidden="true">${googleG()}</div>
            <div class="t-meta">
              <div class="t-name">${t.name}</div>
              <div class="t-sub">${t.location} • ${t.date}</div>
              <div class="t-stars" aria-label="${t.rating} out of 5 stars">
                ${Array.from({ length: 5 })
                  .map((_, i) => `<span class="star ${i < t.rating ? "" : "dim"}"></span>`)
                  .join("")}
              </div>
            </div>
          </div>

          <div class="t-body">
            <p class="t-quote">“${t.text}”</p>
            <div class="t-foot">
              <span>Trip: <strong style="color:rgba(245,248,248,.90)">${t.trip}</strong></span>
              ${t.video
                ? `<a class="t-pill" href="${t.video}" target="_blank" rel="noopener"><span class="play"></span> Video review</a>`
                : `<span class="t-pill"><span class="play" style="opacity:.55"></span> Verified</span>`
              }
            </div>
          </div>
        </article>
      </div>
    `).join("");

    // Init Swiper ONLY if Swiper exists
    if (typeof Swiper !== "undefined") {
      new Swiper("#testimonialsSwiper", {
        loop: true,
        speed: 650,
        grabCursor: true,
        spaceBetween: 14,
        autoplay: { delay: 4200, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
          0: { slidesPerView: 1 },
          860: { slidesPerView: 2 }
        }
      });
    }
  }

  /* =========================
     Year (safe)
  ========================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();