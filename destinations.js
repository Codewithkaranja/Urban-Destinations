 // ===== Data =====
    const DESTINATIONS = [
      {
        key: "mara",
        name: "Maasai Mara",
        tag: "Safari",
        hint: "Big five, luxury camps & iconic landscapes.",
        cover: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1600&q=75",
        desc: "Kenya’s most iconic safari destination — perfect for premium game drives, luxury camps, and unforgettable sunsets across the plains.",
        bullets: ["Best for: Big Five & migration season", "Ideal trip: 3–4 days", "Style: Luxury or Adventure safari"],
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
        bullets: ["Best for: Elephants & photography", "Ideal trip: 2–3 days", "Style: Relaxed safari with comfort stays"],
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
        bullets: ["Best for: Beach luxury & relaxation", "Ideal trip: 3–5 days", "Style: Honeymoon or family beach holiday"],
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
        bullets: ["Best for: Island luxury & culture", "Ideal trip: 4–6 days", "Style: Luxury island + excursions"],
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
        cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=75",
        desc: "For travelers who want something different — Samburu offers rugged landscapes, unique wildlife, and a premium off-the-beaten path feel.",
        bullets: ["Best for: Unique species & scenery", "Ideal trip: 3–4 days", "Style: Adventure or luxury wilderness"],
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2200&q=75",
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=70",
          "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=2200&q=60"
        ]
      },
      {
        key: "mtkenya",
        name: "Mount Kenya",
        tag: "Nature",
        hint: "Hikes, cool air & scenic escapes.",
        cover: "https://images.unsplash.com/photo-1523419409543-a5e549c1faa0?auto=format&fit=crop&w=1600&q=75",
        desc: "Fresh mountain air and scenic trails — ideal for weekend escapes, hiking experiences, and nature-focused trips.",
        bullets: ["Best for: Hiking & nature retreats", "Ideal trip: 2–4 days", "Style: Adventure or calm scenic getaway"],
        images: [
          "https://images.unsplash.com/photo-1523419409543-a5e549c1faa0?auto=format&fit=crop&w=2200&q=75",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=75",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=75"
        ]
      }
    ];

    // ===== Render Grid =====
    const grid = document.getElementById("destGrid");
    grid.innerHTML = DESTINATIONS.map(d => `
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

    // ===== Modal Logic + Swiper =====
    const modal = document.getElementById("modal");
    const backdrop = document.getElementById("backdrop");
    const closeModal = document.getElementById("closeModal");

    const mTitle = document.getElementById("mTitle");
    const mTag = document.getElementById("mTag");
    const mName = document.getElementById("mName");
    const mDesc = document.getElementById("mDesc");
    const mBullets = document.getElementById("mBullets");
    const mSlides = document.getElementById("mSlides");
    const mPlan = document.getElementById("mPlan");
    const mExploreTours = document.getElementById("mExploreTours");

    let swiperInstance = null;

    function openModalFor(key){
      const d = DESTINATIONS.find(x => x.key === key);
      if(!d) return;

      mTitle.textContent = "Destination Details";
      mTag.textContent = d.tag;
      mName.textContent = d.name;
      mDesc.textContent = d.desc;
      mBullets.innerHTML = d.bullets.map(b => `<li>${b}</li>`).join("");

      // Slides
      mSlides.innerHTML = d.images.map(src => `
        <div class="swiper-slide">
          <img src="${src}" alt="${d.name}">
        </div>
      `).join("");

      // CTA links
      mExploreTours.href = `tours.html#top`;
      mPlan.href = `https://wa.me/254722933305?text=${encodeURIComponent(`Hi Njeru Tours & Travels, I’d like to plan a trip to ${d.name}. Please share package options and pricing.`)}`;

      // Open modal
      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";

      // Init / re-init Swiper
      if(swiperInstance) swiperInstance.destroy(true, true);
      swiperInstance = new Swiper("#mSwiper", {
        loop: true,
        speed: 650,
        grabCursor: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
      });
    }

    function closeModalFn(){
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
      if(swiperInstance){
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }

    grid.addEventListener("click", (e)=>{
      const card = e.target.closest("[data-open]");
      if(!card) return;
      openModalFor(card.getAttribute("data-open"));
    });

    grid.addEventListener("keydown", (e)=>{
      if(e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest("[data-open]");
      if(!card) return;
      e.preventDefault();
      openModalFor(card.getAttribute("data-open"));
    });

    backdrop.addEventListener("click", closeModalFn);
    closeModal.addEventListener("click", closeModalFn);
    window.addEventListener("keydown", (e)=>{
      if(e.key === "Escape" && modal.classList.contains("open")) closeModalFn();
    });

    // Year
    document.getElementById("year").textContent = new Date().getFullYear();