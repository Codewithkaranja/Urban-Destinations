(() => {
  "use strict";

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // NAV: Mobile Menu
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

  if (menuBtn) {
    menuBtn.addEventListener(
      "pointerup",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMenu(!isOpen);
      },
      { passive: false }
    );

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) setMenu(false);
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!navRoot) return;
      navRoot.classList.toggle("is-scrolled", window.scrollY > 10);
    },
    { passive: true }
  );

  // DESTINATIONS DATA (unchanged)
 const DESTINATIONS = [
  {
    key: "mara",
    name: "Maasai Mara",
    tag: "Safari",
    hint: "Big five, luxury camps & iconic landscapes.",
    cover: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=75",
    desc: "Kenya’s most iconic safari destination — perfect for premium game drives, luxury camps, and unforgettable sunsets across the plains.",
    bullets: [
      "Best for: Big Five & migration season",
      "Ideal trip: 3–4 days",
      "Style: Luxury or Adventure safari"
    ],
    images: [
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2200&q=75"
    ]
  },
  {
    key: "amboseli",
    name: "Amboseli",
    tag: "Safari",
    hint: "Elephants with Mount Kilimanjaro views.",
    cover: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1600&q=75",
    desc: "Amboseli is famous for its elephant herds and postcard views of Kilimanjaro — a premium, calm-paced safari experience.",
    bullets: [
      "Best for: Elephants & photography",
      "Ideal trip: 2–3 days",
      "Style: Relaxed safari with comfort stays"
    ],
    images: [
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=2200&q=75"
    ]
  },
  {
    key: "diani",
    name: "Diani",
    tag: "Beach",
    hint: "White sands, resorts & honeymoon vibes.",
    cover: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=75",
    desc: "Diani is a premium coastal escape — beach resorts, water activities, and romantic experiences for couples and families.",
    bullets: [
      "Best for: Beach luxury & relaxation",
      "Ideal trip: 3–5 days",
      "Style: Honeymoon or family beach holiday"
    ],
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=70",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=60"
    ]
  },
  {
    key: "zanzibar",
    name: "Zanzibar",
    tag: "Island",
    hint: "Island luxury, culture & premium sunsets.",
    cover: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=75",
    desc: "A refined island experience — beaches, spice tours, Stone Town culture, and premium stays for a complete escape.",
    bullets: [
      "Best for: Island luxury & culture",
      "Ideal trip: 4–6 days",
      "Style: Luxury island + excursions"
    ],
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=70",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2200&q=60"
    ]
  },
  {
    key: "samburu",
    name: "Samburu",
    tag: "Wild North",
    hint: "Remote beauty & rare wildlife species.",
    cover: "https://images.unsplash.com/photo-1682681611078-2ba8a6f6e0fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "For travelers who want something different — Samburu offers rugged landscapes, unique wildlife, and a premium off-the-beaten path feel.",
    bullets: [
      "Best for: Unique species & scenery",
      "Ideal trip: 3–4 days",
      "Style: Adventure or luxury wilderness"
    ],
    images: [
      "https://images.unsplash.com/photo-1682681611078-2ba8a6f6e0fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=70",
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=2200&q=60"
    ]
  },
  {
    key: "mtkenya",
    name: "Mount Kenya",
    tag: "Nature",
    hint: "Hikes, cool air & scenic escapes.",
    cover: "https://images.unsplash.com/photo-1646159755791-54e741749028?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Fresh mountain air and scenic trails — ideal for weekend escapes, hiking experiences, and nature-focused trips.",
    bullets: [
      "Best for: Hiking & nature retreats",
      "Ideal trip: 2–4 days",
      "Style: Adventure or calm scenic getaway"
    ],
    images: [
      "https://images.unsplash.com/photo-1523419409543-a5e549c1faa0?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=75",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=75"
    ]
  }
];
  const grid = document.getElementById("destGrid");
  if (!grid) return;

  grid.innerHTML = DESTINATIONS.map((d) => `
    <article class="dest" tabindex="0" role="button" aria-label="${d.name}" data-open="${d.key}">
      <img src="${d.cover}" alt="${d.name}">
      <div class="inner">
        <p class="name">${d.name}</p>
        <p class="hint">${d.hint}</p>
        <div class="meta">
          <span class="chip"><strong>${d.tag}</strong></span>
          <span class="chip">Tap to view</span>
        </div>
        <div class="view"><span></span> View details</div>
      </div>
    </article>
  `).join("");

  // MODAL elements
  const modal = document.getElementById("modal");
  const backdrop = document.getElementById("backdrop");
  const closeBtn = document.getElementById("closeModal");

  const mTitle = document.getElementById("mTitle");
  const mTag = document.getElementById("mTag");
  const mName = document.getElementById("mName");
  const mDesc = document.getElementById("mDesc");
  const mBullets = document.getElementById("mBullets");
  const mSlides = document.getElementById("mSlides");
  const mPlan = document.getElementById("mPlan");
  const mExploreTours = document.getElementById("mExploreTours");
  const mSwiperEl = document.getElementById("mSwiper");

  if (!modal || !backdrop || !closeBtn || !mSwiperEl || !mSlides) return;

  let swiperInstance = null;

  function initSwiper() {
    if (typeof Swiper === "undefined") {
      mSwiperEl.classList.add("no-swiper");
      return;
    }

    // Destroy old instance
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    swiperInstance = new Swiper("#mSwiper", {
      loop: true,
      speed: 650,
      grabCursor: true,
      observer: true,
      observeParents: true,
      pagination: { el: "#mSwiper .swiper-pagination", clickable: true },
      navigation: {
        nextEl: "#mSwiper .swiper-button-next",
        prevEl: "#mSwiper .swiper-button-prev"
      }
    });

    // Force repaint/update after open
    swiperInstance.update();
  }

  function openModalFor(key) {
    const d = DESTINATIONS.find((x) => x.key === key);
    if (!d) return;

    // Fill content first (important)
    if (mTitle) mTitle.textContent = "Destination Details";
    if (mTag) mTag.textContent = d.tag;
    if (mName) mName.textContent = d.name;
    if (mDesc) mDesc.textContent = d.desc;
    if (mBullets) mBullets.innerHTML = d.bullets.map((b) => `<li>${b}</li>`).join("");

    mSlides.innerHTML = d.images.map((src) => `
      <div class="swiper-slide"><img src="${src}" alt="${d.name}"></div>
    `).join("");

    if (mExploreTours) mExploreTours.href = "tours.html#top";
    if (mPlan) {
      mPlan.href = `https://wa.me/254722933305?text=${encodeURIComponent(
        `Hi Njeru Tours & Travels, I’d like to plan a trip to ${d.name}. Please share package options and pricing.`
      )}`;
    }

    // Open modal
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Init swiper AFTER modal becomes visible
    requestAnimationFrame(() => {
      initSwiper();
      closeBtn.focus?.();
    });
  }

  function closeModalFn() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-open]");
    if (!card) return;
    openModalFor(card.getAttribute("data-open"));
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-open]");
    if (!card) return;
    e.preventDefault();
    openModalFor(card.getAttribute("data-open"));
  });

  backdrop.addEventListener("click", closeModalFn);
  closeBtn.addEventListener("click", closeModalFn);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModalFn();
  });
})();