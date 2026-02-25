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
     Year (SAFE)
  ========================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =========================
     TOURS DATA
  ========================== */
  const TOURS = [
    {
      id: "mara-lux-3d",
      name: "Maasai Mara Luxury Escape",
      dest: "mara",
      destLabel: "Maasai Mara",
      durationDays: 3,
      style: "luxury",
      styleLabel: "Luxury",
      price: 240000,
      popular: 98,
      img: "https://plus.unsplash.com/premium_photo-1661962656908-24102eafa8d4?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Signature game drives, curated lodge stays, and premium logistics end-to-end.",
      highlights: ["Private guide", "Lodge stays", "Transfers"]
    },
    {
      id: "amboseli-2d",
      name: "Amboseli Views & Elephants",
      dest: "amboseli",
      destLabel: "Amboseli",
      durationDays: 2,
      style: "adventure",
      styleLabel: "Adventure",
      price: 120000,
      popular: 90,
      img: "https://images.unsplash.com/photo-1592670130915-d3dcd94675a9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Kilimanjaro moments, calm pacing, and a refined itinerary with expert coordination.",
      highlights: ["Sunrise drives", "Comfort stays", "All logistics"]
    },
    {
      id: "diani-4d-hm",
      name: "Diani Coast Honeymoon Retreat",
      dest: "diani",
      destLabel: "Diani",
      durationDays: 4,
      style: "honeymoon",
      styleLabel: "Honeymoon",
      price: 210000,
      popular: 92,
      img: "https://images.unsplash.com/photo-1633345778967-3760204a4c57?q=80&w=1545&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Beachfront comfort, curated activities, and premium planning for couples.",
      highlights: ["Resort stay", "Romantic add-ons", "Transfers"]
    },
    {
      id: "nairobi-1d",
      name: "Nairobi Signature Day Tour",
      dest: "nairobi",
      destLabel: "Nairobi",
      durationDays: 1,
      style: "family",
      styleLabel: "Family",
      price: 55000,
      popular: 86,
      img: "https://images.unsplash.com/photo-1635595358293-03620e36be48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "Curated city highlights with smooth timing, comfort, and premium support.",
      highlights: ["Private transfer", "Flexible stops", "Fast booking"]
    },
    {
      id: "zanzibar-4d",
      name: "Zanzibar Premium Island Escape",
      dest: "zanzibar",
      destLabel: "Zanzibar",
      durationDays: 4,
      style: "luxury",
      styleLabel: "Luxury",
      price: 320000,
      popular: 88,
      img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=75",
      desc: "Island luxury and culture with clean coordination, transfers, and premium add-ons.",
      highlights: ["Island stays", "Private transfers", "Add-on tours"]
    }
  ];

  /* =========================
     TOURS STATE
  ========================== */
  const state = {
    dest: "all",
    duration: "all",
    budget: 250000,
    style: "all",
    sort: "popular",
    saved: new Set(JSON.parse(localStorage.getItem("njeru_saved") || "[]"))
  };

  const money = (n) => "KES " + Number(n).toLocaleString();
  const durLabel = (d) => (d === 1 ? "1 Day" : `${d} Days`);

  function applyFilters(list) {
    return list.filter((t) => {
      if (state.dest !== "all" && t.dest !== state.dest) return false;

      if (state.duration !== "all") {
        const d = Number(state.duration);
        if (d === 4) {
          if (t.durationDays < 4) return false;
        } else {
          if (t.durationDays !== d) return false;
        }
      }

      if (t.price > state.budget) return false;
      if (state.style !== "all" && t.style !== state.style) return false;

      return true;
    });
  }

  function applySort(list) {
    const copy = [...list];
    switch (state.sort) {
      case "priceLow":
        return copy.sort((a, b) => a.price - b.price);
      case "priceHigh":
        return copy.sort((a, b) => b.price - a.price);
      case "durationShort":
        return copy.sort((a, b) => a.durationDays - b.durationDays);
      case "durationLong":
        return copy.sort((a, b) => b.durationDays - a.durationDays);
      default:
        return copy.sort((a, b) => b.popular - a.popular);
    }
  }

  function persistSaved() {
    localStorage.setItem("njeru_saved", JSON.stringify([...state.saved]));
  }

  function toggleSave(id) {
    if (!id) return;
    if (state.saved.has(id)) state.saved.delete(id);
    else state.saved.add(id);
    persistSaved();
    render();
  }

  /* =========================
     DOM: required for tours page
  ========================== */
  const grid = document.getElementById("grid");
  const count = document.getElementById("count");
  const countMobile = document.getElementById("countMobile");

  // If tours grid isn’t on this page, stop safely (navbar still works)
  if (!grid) return;

  /* =========================
     Modal (tour details) - safe
  ========================== */
  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModalBtn = document.getElementById("closeModal");

  const mTitle = document.getElementById("mTitle");
  const mImg = document.getElementById("mImg");
  const mStyle = document.getElementById("mStyle");
  const mMeta = document.getElementById("mMeta");
  const mName = document.getElementById("mName");
  const mDesc = document.getElementById("mDesc");
  const mChips = document.getElementById("mChips");
  const mQuote = document.getElementById("mQuote");
  const mSave = document.getElementById("mSave");

  function openModal(id) {
    if (!modal) return;

    const t = TOURS.find((x) => x.id === id);
    if (!t) return;

    if (mTitle) mTitle.textContent = "Tour Details";
    if (mImg) {
      mImg.src = t.img;
      mImg.alt = t.name;
    }
    if (mStyle) mStyle.textContent = t.styleLabel;
    if (mMeta) mMeta.textContent = `${durLabel(t.durationDays)} • ${t.destLabel} • ${money(t.price)}`;
    if (mName) mName.textContent = t.name;
    if (mDesc) mDesc.textContent = t.desc;

    if (mChips) mChips.innerHTML = t.highlights.map((h) => `<span class="chip">${h}</span>`).join("");
    if (mQuote) {
      mQuote.href = `https://wa.me/254722933305?text=${encodeURIComponent(
        `Hi Njeru Tours & Travels, I’d like a quote for: ${t.name}.`
      )}`;
    }

    if (mSave) {
      const saved = state.saved.has(id);
      mSave.textContent = saved ? "Saved ✓ (Remove)" : "Save to Wishlist";
      mSave.onclick = () => {
        toggleSave(id);
        const nowSaved = state.saved.has(id);
        mSave.textContent = nowSaved ? "Saved ✓ (Remove)" : "Save to Wishlist";
      };
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

  /* =========================
     Mobile Filters Modal
  ========================== */
  const openFilters = document.getElementById("openFilters");
  const filtersModal = document.getElementById("filtersModal");
  const filtersBackdrop = document.getElementById("filtersBackdrop");
  const closeFilters = document.getElementById("closeFilters");
  const filtersClone = document.getElementById("filtersClone");

  function closeFiltersModal() {
    if (!filtersModal) return;
    filtersModal.classList.remove("open");
    filtersModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openFiltersModal() {
    if (!filtersModal || !filtersClone) return;

    filtersClone.innerHTML = "";
    const panel = document.querySelector(".panel");
    if (!panel) return;

    const clone = panel.cloneNode(true);
    clone.style.position = "static";
    clone.style.top = "auto";
    clone.style.boxShadow = "none";
    clone.style.margin = "0";
    filtersClone.appendChild(clone);

    const cDest = clone.querySelector("#dest");
    const cDuration = clone.querySelector("#duration");
    const cBudget = clone.querySelector("#budget");
    const cBudgetOut = clone.querySelector("#budgetOut");
    const cApply = clone.querySelector("#applyBtn");
    const cClear = clone.querySelector("#clearBtn");
    const cStyleWrap = clone.querySelector("#stylePills");

    if (cDest) cDest.value = state.dest;
    if (cDuration) cDuration.value = state.duration;
    if (cBudget) cBudget.value = state.budget;
    if (cBudgetOut) cBudgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;

    clone.querySelectorAll(".style-pill").forEach((p) => {
      p.classList.toggle("active", p.dataset.style === state.style);
    });

    if (cBudget && cBudgetOut) {
      cBudget.addEventListener("input", () => {
        state.budget = Number(cBudget.value);
        cBudgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
      });
    }

    if (cStyleWrap) {
      cStyleWrap.addEventListener("click", (e) => {
        const pill = e.target.closest(".style-pill");
        if (!pill) return;
        state.style = pill.dataset.style;
        clone.querySelectorAll(".style-pill").forEach((p) => {
          p.classList.toggle("active", p.dataset.style === state.style);
        });
      });
    }

    if (cApply) {
      cApply.addEventListener("click", () => {
        if (cDest) state.dest = cDest.value;
        if (cDuration) state.duration = cDuration.value;
        render();
        closeFiltersModal();
        syncUI();
      });
    }

    if (cClear) {
      cClear.addEventListener("click", () => {
        state.dest = "all";
        state.duration = "all";
        state.budget = 250000;
        state.style = "all";
        syncUI();
        render();
      });
    }

    filtersModal.classList.add("open");
    filtersModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (openFilters) openFilters.addEventListener("click", openFiltersModal);
  if (filtersBackdrop) filtersBackdrop.addEventListener("click", closeFiltersModal);
  if (closeFilters) closeFilters.addEventListener("click", closeFiltersModal);

  /* =========================
     Filters wiring (desktop panel)
  ========================== */
  const dest = document.getElementById("dest");
  const duration = document.getElementById("duration");
  const budget = document.getElementById("budget");
  const budgetOut = document.getElementById("budgetOut");
  const sort = document.getElementById("sort");
  const applyBtn = document.getElementById("applyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const stylePills = document.getElementById("stylePills");

  function syncUI() {
    if (dest) dest.value = state.dest;
    if (duration) duration.value = state.duration;
    if (budget) budget.value = state.budget;
    if (budgetOut) budgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
    if (sort) sort.value = state.sort;

    document.querySelectorAll(".style-pill").forEach((p) => {
      p.classList.toggle("active", p.dataset.style === state.style);
    });
  }

  if (budget && budgetOut) {
    budget.addEventListener("input", () => {
      state.budget = Number(budget.value);
      budgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
    });
  }

  if (stylePills) {
    stylePills.addEventListener("click", (e) => {
      const pill = e.target.closest(".style-pill");
      if (!pill) return;
      state.style = pill.dataset.style;
      syncUI();
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      if (dest) state.dest = dest.value;
      if (duration) state.duration = duration.value;
      if (sort) state.sort = sort.value;
      render();
      closeFiltersModal();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.dest = "all";
      state.duration = "all";
      state.budget = 250000;
      state.style = "all";
      state.sort = "popular";
      syncUI();
      render();
    });
  }

  if (sort) {
    sort.addEventListener("change", () => {
      state.sort = sort.value;
      render();
    });
  }

  /* =========================
     Render
  ========================== */
  function render() {
    const filtered = applySort(applyFilters(TOURS));
    const label = `${filtered.length} tour${filtered.length === 1 ? "" : "s"} available`;
    if (count) count.textContent = label;
    if (countMobile) countMobile.textContent = label;

    grid.innerHTML = filtered
      .map((t) => {
        const saved = state.saved.has(t.id);
        return `
          <article class="card" data-id="${t.id}">
            <div class="media">
              <img src="${t.img}" alt="${t.name}">
              <button class="save ${saved ? "active" : ""}" type="button" aria-label="Save tour" data-save="${t.id}">
                ${saved ? "★" : "☆"}
              </button>
            </div>
            <div class="body">
              <div class="kicker">
                <span class="tag">${t.styleLabel}</span>
                <span class="meta">${durLabel(t.durationDays)} • ${t.destLabel}</span>
              </div>
              <h3 class="title">${t.name}</h3>
              <p class="desc">${t.desc}</p>

              <div class="chips">
                <span class="chip">${money(t.price)}</span>
                ${t.highlights.slice(0, 2).map((h) => `<span class="chip">${h}</span>`).join("")}
              </div>

              <div class="actions">
                <button class="btn btn-primary" type="button" data-open="${t.id}">View Details</button>
                <a class="btn btn-gold" href="https://wa.me/254722933305?text=${encodeURIComponent(
                  `Hi Njeru Tours & Travels, I’d like a quote for: ${t.name}.`
                )}" target="_blank" rel="noopener">Request Quote</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // handlers (fresh each render)
    grid.querySelectorAll("[data-save]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSave(btn.getAttribute("data-save"));
      });
    });

    grid.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openModal(btn.getAttribute("data-open"));
      });
    });
  }

  /* =========================
     Global ESC handling (after filtersModal defined)
  ========================== */
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (modal && modal.classList.contains("open")) closeModal();
    if (filtersModal && filtersModal.classList.contains("open")) closeFiltersModal();
  });

  /* =========================
     Init
  ========================== */
  syncUI();
  render();
})();