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
     Gallery + Lightbox (SAFE)
  ========================== */
  const mainImg = document.getElementById("mainImg");
  const thumbs = document.getElementById("thumbs");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbBackdrop = document.getElementById("lbBackdrop");
  const lbClose = document.getElementById("lbClose");
  const openGalleryBtn = document.getElementById("openGalleryBtn");

  function openLightbox(src) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (thumbs && mainImg) {
    thumbs.addEventListener("click", (e) => {
      const t = e.target.closest(".thumb");
      if (!t) return;
      const src = t.getAttribute("data-src");
      if (src) mainImg.src = src;
    });
  }

  if (openGalleryBtn && mainImg) {
    openGalleryBtn.addEventListener("click", () => {
      openLightbox(mainImg.src);
    });
  }

  if (lbBackdrop) lbBackdrop.addEventListener("click", closeLightbox);
  if (lbClose) lbClose.addEventListener("click", closeLightbox);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) closeLightbox();
  });

  /* =========================
     Booking CTA: WhatsApp enquiry (SAFE)
  ========================== */
  const sendWhatsApp = document.getElementById("sendWhatsApp");

  if (sendWhatsApp) {
    sendWhatsApp.addEventListener("click", () => {
      const title = document.getElementById("tourTitle")?.textContent?.trim() || "Tour Enquiry";
      const date = document.getElementById("date")?.value || "";
      const group = document.getElementById("group")?.value || "";
      const name = document.getElementById("name")?.value?.trim() || "";
      const phone = document.getElementById("phone")?.value?.trim() || "";
      const notes = document.getElementById("notes")?.value?.trim() || "";

      if (!date || !group || !name || !phone) {
        alert("Please fill in your travel date, group size, name and phone.");
        return;
      }

      const msg =
        `Hi Njeru Tours & Travels,%0A` +
        `Tour: ${encodeURIComponent(title)}%0A` +
        `Date: ${encodeURIComponent(date)}%0A` +
        `Group: ${encodeURIComponent(group)}%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Notes: ${encodeURIComponent(notes || "—")}`;

      window.open(`https://wa.me/254722933305?text=${msg}`, "_blank", "noopener,noreferrer");
    });
  }

  /* =========================
     Optional: dynamic tour loading (?tour=...)
  ========================== */
  const TOURS = {
    "mara-lux-3d": {
      title: "Maasai Mara Luxury Escape",
      subtitle:
        "Curated lodge stays, iconic game drives, and premium planning — designed for comfort and unforgettable moments.",
      price: "KES 240,000",
      duration: "3 Days",
      location: "Maasai Mara",
      style: "Luxury",
      heroImg:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=75",
    },
    "diani-4d-hm": {
      title: "Diani Coast Honeymoon Retreat",
      subtitle:
        "Beachfront comfort, romantic add-ons, and smooth logistics — designed for premium couple experiences.",
      price: "KES 210,000",
      duration: "4 Days",
      location: "Diani",
      style: "Honeymoon",
      heroImg:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=75",
    },
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("tour");

  if (key && TOURS[key]) {
    const t = TOURS[key];

    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("tourTitle", t.title);
    setText("tourSubtitle", t.subtitle);
    setText("tourPrice", t.price);
    setText("sidePrice", t.price);
    setText("tourDuration", t.duration);
    setText("tourLocation", t.location);
    setText("tourStyle", t.style);

    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.setProperty("--heroImg", `url('${t.heroImg}')`);
      // keep your premium overlay approach; this just swaps the source variable
    }
  }
})();