 // ===== Data (sample — replace with your real packages) =====
    const TOURS = [
      {
        id:"mara-lux-3d",
        name:"Maasai Mara Luxury Escape",
        dest:"mara",
        destLabel:"Maasai Mara",
        durationDays:3,
        style:"luxury",
        styleLabel:"Luxury",
        price:240000,
        popular: 98,
        img:"https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=75",
        desc:"Signature game drives, curated lodge stays, and premium logistics end-to-end.",
        highlights:["Private guide","Lodge stays","Transfers"]
      },
      {
        id:"amboseli-2d",
        name:"Amboseli Views & Elephants",
        dest:"amboseli",
        destLabel:"Amboseli",
        durationDays:2,
        style:"adventure",
        styleLabel:"Adventure",
        price:120000,
        popular: 90,
        img:"https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1600&q=75",
        desc:"Kilimanjaro moments, calm pacing, and a refined itinerary with expert coordination.",
        highlights:["Sunrise drives","Comfort stays","All logistics"]
      },
      {
        id:"diani-4d-hm",
        name:"Diani Coast Honeymoon Retreat",
        dest:"diani",
        destLabel:"Diani",
        durationDays:4,
        style:"honeymoon",
        styleLabel:"Honeymoon",
        price:210000,
        popular: 92,
        img:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=75",
        desc:"Beachfront comfort, curated activities, and premium planning for couples.",
        highlights:["Resort stay","Romantic add-ons","Transfers"]
      },
      {
        id:"nairobi-1d",
        name:"Nairobi Signature Day Tour",
        dest:"nairobi",
        destLabel:"Nairobi",
        durationDays:1,
        style:"family",
        styleLabel:"Family",
        price:55000,
        popular: 86,
        img:"https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1600&q=75",
        desc:"Curated city highlights with smooth timing, comfort, and premium support.",
        highlights:["Private transfer","Flexible stops","Fast booking"]
      },
      {
        id:"zanzibar-4d",
        name:"Zanzibar Premium Island Escape",
        dest:"zanzibar",
        destLabel:"Zanzibar",
        durationDays:4,
        style:"luxury",
        styleLabel:"Luxury",
        price:320000,
        popular: 88,
        img:"https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=75",
        desc:"Island luxury and culture with clean coordination, transfers, and premium add-ons.",
        highlights:["Island stays","Private transfers","Add-on tours"]
      }
    ];

    // ===== State =====
    const state = {
      dest: "all",
      duration: "all",
      budget: 250000,
      style: "all",
      sort: "popular",
      saved: new Set(JSON.parse(localStorage.getItem("njeru_saved") || "[]"))
    };

    // ===== Helpers =====
    const money = (n) => "KES " + n.toLocaleString();
    const durLabel = (d) => d === 1 ? "1 Day" : `${d} Days`;

    function applyFilters(list){
      return list.filter(t => {
        if(state.dest !== "all" && t.dest !== state.dest) return false;

        if(state.duration !== "all"){
          const d = Number(state.duration);
          if(d === 4){
            if(t.durationDays < 4) return false;
          }else{
            if(t.durationDays !== d) return false;
          }
        }

        if(t.price > state.budget) return false;

        if(state.style !== "all" && t.style !== state.style) return false;

        return true;
      });
    }

    function applySort(list){
      const copy = [...list];
      switch(state.sort){
        case "priceLow": return copy.sort((a,b)=>a.price-b.price);
        case "priceHigh": return copy.sort((a,b)=>b.price-a.price);
        case "durationShort": return copy.sort((a,b)=>a.durationDays-b.durationDays);
        case "durationLong": return copy.sort((a,b)=>b.durationDays-a.durationDays);
        default: return copy.sort((a,b)=>b.popular-a.popular);
      }
    }

    // ===== Render =====
    const grid = document.getElementById("grid");
    const count = document.getElementById("count");
    const countMobile = document.getElementById("countMobile");

    function render(){
      const filtered = applySort(applyFilters(TOURS));
      const label = `${filtered.length} tour${filtered.length===1?"":"s"} available`;
      count.textContent = label;
      if(countMobile) countMobile.textContent = label;

      grid.innerHTML = filtered.map(t => {
        const saved = state.saved.has(t.id);
        return `
          <article class="card" data-id="${t.id}">
            <div class="media">
              <img src="${t.img}" alt="${t.name}">
              <button class="save ${saved ? "active":""}" type="button" aria-label="Save tour" data-save="${t.id}">
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
                ${t.highlights.slice(0,2).map(h => `<span class="chip">${h}</span>`).join("")}
              </div>

              <div class="actions">
                <button class="btn btn-primary" type="button" data-open="${t.id}">View Details</button>
                <a class="btn btn-gold" href="https://wa.me/254722933305?text=${encodeURIComponent(`Hi Njeru Tours & Travels, I’d like a quote for: ${t.name}.`)}" target="_blank" rel="noopener">Request Quote</a>
              </div>
            </div>
          </article>
        `;
      }).join("");

      // attach handlers
      grid.querySelectorAll("[data-save]").forEach(btn=>{
        btn.addEventListener("click", (e)=>{
          e.stopPropagation();
          toggleSave(btn.getAttribute("data-save"));
        });
      });
      grid.querySelectorAll("[data-open]").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          openModal(btn.getAttribute("data-open"));
        });
      });
    }

    function persistSaved(){
      localStorage.setItem("njeru_saved", JSON.stringify([...state.saved]));
    }
    function toggleSave(id){
      if(state.saved.has(id)) state.saved.delete(id);
      else state.saved.add(id);
      persistSaved();
      render();
    }

    // ===== Filters wiring =====
    const dest = document.getElementById("dest");
    const duration = document.getElementById("duration");
    const budget = document.getElementById("budget");
    const budgetOut = document.getElementById("budgetOut");
    const sort = document.getElementById("sort");
    const applyBtn = document.getElementById("applyBtn");
    const clearBtn = document.getElementById("clearBtn");

    function syncUI(){
      dest.value = state.dest;
      duration.value = state.duration;
      budget.value = state.budget;
      budgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
      sort.value = state.sort;
      document.querySelectorAll(".style-pill").forEach(p=>{
        p.classList.toggle("active", p.dataset.style === state.style);
      });
    }

    budget.addEventListener("input", ()=>{
      state.budget = Number(budget.value);
      budgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
    });

    document.getElementById("stylePills").addEventListener("click",(e)=>{
      const pill = e.target.closest(".style-pill");
      if(!pill) return;
      state.style = pill.dataset.style;
      syncUI();
    });

    applyBtn.addEventListener("click", ()=>{
      state.dest = dest.value;
      state.duration = duration.value;
      state.sort = sort.value;
      render();
      closeFiltersModal();
    });

    clearBtn.addEventListener("click", ()=>{
      state.dest = "all";
      state.duration = "all";
      state.budget = 250000;
      state.style = "all";
      state.sort = "popular";
      syncUI();
      render();
    });

    sort.addEventListener("change", ()=>{
      state.sort = sort.value;
      render();
    });

    // ===== Modal (tour details) =====
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

    let currentModalId = null;

    function openModal(id){
      const t = TOURS.find(x=>x.id===id);
      if(!t) return;

      currentModalId = id;
      mTitle.textContent = "Tour Details";
      mImg.src = t.img;
      mImg.alt = t.name;
      mStyle.textContent = t.styleLabel;
      mMeta.textContent = `${durLabel(t.durationDays)} • ${t.destLabel} • ${money(t.price)}`;
      mName.textContent = t.name;
      mDesc.textContent = t.desc;

      mChips.innerHTML = t.highlights.map(h=>`<span class="chip">${h}</span>`).join("");
      mQuote.href = `https://wa.me/254722933305?text=${encodeURIComponent(`Hi Njeru Tours & Travels, I’d like a quote for: ${t.name}.`)}`;

      const saved = state.saved.has(id);
      mSave.textContent = saved ? "Saved ✓ (Remove)" : "Save to Wishlist";
      mSave.onclick = ()=> {
        toggleSave(id);
        const nowSaved = state.saved.has(id);
        mSave.textContent = nowSaved ? "Saved ✓ (Remove)" : "Save to Wishlist";
      };

      modal.classList.add("open");
      modal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }

    function closeModal(){
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
      currentModalId = null;
    }

    modalBackdrop.addEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e)=>{
      if(e.key === "Escape" && modal.classList.contains("open")) closeModal();
      if(e.key === "Escape" && filtersModal.classList.contains("open")) closeFiltersModal();
    });

    // ===== Mobile Filters Modal =====
    const openFilters = document.getElementById("openFilters");
    const filtersModal = document.getElementById("filtersModal");
    const filtersBackdrop = document.getElementById("filtersBackdrop");
    const closeFilters = document.getElementById("closeFilters");
    const filtersClone = document.getElementById("filtersClone");

    function openFiltersModal(){
      // clone the actual panel body so you maintain one source of truth
      filtersClone.innerHTML = "";
      const clone = document.querySelector(".panel").cloneNode(true);
      clone.style.position = "static";
      clone.style.top = "auto";
      clone.style.boxShadow = "none";
      clone.style.margin = "0";
      filtersClone.appendChild(clone);

      // re-wire inside clone
      const cDest = clone.querySelector("#dest");
      const cDuration = clone.querySelector("#duration");
      const cBudget = clone.querySelector("#budget");
      const cBudgetOut = clone.querySelector("#budgetOut");
      const cSort = clone.querySelector("#sort"); // not present in clone, ignore
      const cApply = clone.querySelector("#applyBtn");
      const cClear = clone.querySelector("#clearBtn");
      const cStyleWrap = clone.querySelector("#stylePills");

      // sync values
      cDest.value = state.dest;
      cDuration.value = state.duration;
      cBudget.value = state.budget;
      cBudgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
      clone.querySelectorAll(".style-pill").forEach(p=>{
        p.classList.toggle("active", p.dataset.style === state.style);
      });

      cBudget.addEventListener("input", ()=>{
        state.budget = Number(cBudget.value);
        cBudgetOut.textContent = `Up to ${state.budget.toLocaleString()}`;
      });

      cStyleWrap.addEventListener("click",(e)=>{
        const pill = e.target.closest(".style-pill");
        if(!pill) return;
        state.style = pill.dataset.style;
        clone.querySelectorAll(".style-pill").forEach(p=>{
          p.classList.toggle("active", p.dataset.style === state.style);
        });
      });

      cApply.addEventListener("click", ()=>{
        state.dest = cDest.value;
        state.duration = cDuration.value;
        render();
        closeFiltersModal();
        syncUI(); // keep desktop panel in sync
      });

      cClear.addEventListener("click", ()=>{
        state.dest = "all";
        state.duration = "all";
        state.budget = 250000;
        state.style = "all";
        syncUI();
        render();
      });

      filtersModal.classList.add("open");
      filtersModal.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }

    function closeFiltersModal(){
      filtersModal.classList.remove("open");
      filtersModal.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    }

    if(openFilters){
      openFilters.addEventListener("click", openFiltersModal);
      filtersBackdrop.addEventListener("click", closeFiltersModal);
      closeFilters.addEventListener("click", closeFiltersModal);
    }

    // ===== Init =====
    document.getElementById("year").textContent = new Date().getFullYear();
    syncUI();
    render();