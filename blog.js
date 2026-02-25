(() => {
  "use strict";

  /* =========================
     NAV: Mobile Menu (no flashing)
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

    // kill extra click after pointer events
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  if (mobilePanel) {
    // close only on backdrop click
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

    // close when clicking links inside panel
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
     BLOG INDEX (safe)
  ========================== */
  const POSTS = [
    {
      slug: "blog/ultimate-maasai-mara-safari-guide.html",
      title: "The Ultimate Maasai Mara Safari Guide (2026): Seasons, Costs & What to Expect",
      cat: "safari",
      tags: ["Safari", "Maasai Mara", "Game Drives"],
      excerpt: "A practical, premium planning guide to the Mara: best months, park fees, where to stay, what to pack, and how to book smart.",
      date: "Updated 2026"
    },
    {
      slug: "blog/kenya-safari-packing-list.html",
      title: "Kenya Safari Packing List: What to Pack for Comfort, Safety & Great Photos",
      cat: "packing",
      tags: ["Packing", "Safari", "Checklist"],
      excerpt: "The complete safari packing checklist: clothes, shoes, camera gear, meds, and smart extras most people forget.",
      date: "Updated 2026"
    },
    {
      slug: "blog/best-time-to-visit-kenya.html",
      title: "Best Time to Visit Kenya (Month-by-Month): Safari, Beach & Weather",
      cat: "seasons",
      tags: ["Best Time", "Weather", "Seasons"],
      excerpt: "A month-by-month planning breakdown: rain patterns, wildlife viewing, crowds, and the best time for beaches and safaris.",
      date: "Updated 2026"
    },
    {
      slug: "blog/amboseli-vs-maasai-mara.html",
      title: "Amboseli vs Maasai Mara: Which Safari Should You Choose?",
      cat: "safari",
      tags: ["Comparison", "Amboseli", "Mara"],
      excerpt: "Short on time or budget? Compare wildlife, landscapes, travel time, costs, and the best fit for families, couples and photographers.",
      date: "Updated 2026"
    },
    {
      slug: "blog/diani-beach-travel-guide.html",
      title: "Diani Beach Travel Guide: Where to Stay, What to Do & 3-Day Itinerary",
      cat: "planning",
      tags: ["Beach", "Diani", "Itinerary"],
      excerpt: "A premium guide to Diani: best hotels, activities, dining, safety tips, and a clean 3-day plan you can copy.",
      date: "Updated 2026"
    },
    {
      slug: "blog/zanzibar-travel-tips-from-kenya.html",
      title: "Zanzibar from Kenya: Travel Tips, Costs, Documents & Best Places to Stay",
      cat: "planning",
      tags: ["Zanzibar", "Cross-border", "Costs"],
      excerpt: "Everything you need to know traveling from Kenya to Zanzibar: entry docs, budgets, where to stay, and how to plan smoothly.",
      date: "Updated 2026"
    },
    {
      slug: "blog/kenya-safari-cost-breakdown.html",
      title: "How Much Does a Kenya Safari Cost? A Clear Budget Breakdown (2026)",
      cat: "planning",
      tags: ["Costs", "Budget", "Safari"],
      excerpt: "A practical cost guide: park fees, transport, accommodation tiers, tips, and how to get value without cutting safety.",
      date: "Updated 2026"
    },
    {
      slug: "blog/family-safari-kenya.html",
      title: "Family Safari in Kenya: Best Parks, Safety Tips & Kid-Friendly Planning",
      cat: "safari",
      tags: ["Family", "Safety", "Planning"],
      excerpt: "Planning for kids? Here’s how to choose parks, manage travel days, pick the right lodges, and keep it fun and safe.",
      date: "Updated 2026"
    },
    {
      slug: "blog/nairobi-day-trips.html",
      title: "Best Nairobi Day Trips: 8 Easy Escapes (With Times & Planning Tips)",
      cat: "planning",
      tags: ["Nairobi", "Day Trips", "Itineraries"],
      excerpt: "Short on time? These day trips are realistic, time-friendly, and high value — plus how to plan pickups and routes.",
      date: "Updated 2026"
    },
    {
      slug: "blog/travel-safety-kenya.html",
      title: "Travel Safety in Kenya: Practical Tips for Tours, Transfers & Solo Travelers",
      cat: "planning",
      tags: ["Safety", "Transfers", "Advice"],
      excerpt: "Straightforward safety guidance: transport choices, scams to avoid, what to carry, and how to plan confidently.",
      date: "Updated 2026"
    }
  ];

  const postsEl = document.getElementById("posts");
  const q = document.getElementById("q");
  const cat = document.getElementById("cat");

  function render() {
    if (!postsEl) return;

    const term = (q?.value || "").trim().toLowerCase();
    const c = cat?.value || "all";

    const filtered = POSTS.filter((p) => {
      const hay = (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase();
      const okTerm = !term || hay.includes(term);
      const okCat = c === "all" || p.cat === c;
      return okTerm && okCat;
    });

    postsEl.innerHTML =
      filtered
        .map(
          (p) => `
        <a class="post" href="${p.slug}" aria-label="${p.title}">
          <div class="cover">
            <img src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=75" alt="">
          </div>
          <div class="inner">
            <div class="tagrow">
              <span class="chip"><strong>${p.tags[0]}</strong></span>
              ${p.tags.slice(1, 3).map((t) => `<span class="chip">${t}</span>`).join("")}
            </div>
            <h3 class="title">${p.title}</h3>
            <p class="excerpt">${p.excerpt}</p>
            <div class="meta">
              <span>${p.date}</span>
              <span class="read"><span></span> Read guide</span>
            </div>
          </div>
        </a>
      `
        )
        .join("") ||
      `<p style="color:rgba(245,248,248,.72);font-weight:800;margin:0;">No posts found. Try another keyword.</p>`;
  }

  if (q) q.addEventListener("input", render);
  if (cat) cat.addEventListener("change", render);
  if (postsEl) render();

  /* =========================
     Year (safe)
  ========================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();