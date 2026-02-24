// Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // ===== Gallery behavior =====
    const mainImg = document.getElementById("mainImg");
    const thumbs = document.getElementById("thumbs");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbBackdrop = document.getElementById("lbBackdrop");
    const lbClose = document.getElementById("lbClose");
    const openGalleryBtn = document.getElementById("openGalleryBtn");

    function openLightbox(src){
      lbImg.src = src;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox(){
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden","true");
      document.body.style.overflow = "";
    }

    thumbs.addEventListener("click", (e)=>{
      const t = e.target.closest(".thumb");
      if(!t) return;
      const src = t.getAttribute("data-src");
      mainImg.src = src;
    });

    openGalleryBtn.addEventListener("click", ()=>{
      openLightbox(mainImg.src);
    });
    lbBackdrop.addEventListener("click", closeLightbox);
    lbClose.addEventListener("click", closeLightbox);
    window.addEventListener("keydown", (e)=>{
      if(e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });

    // ===== Booking CTA: Send WhatsApp enquiry =====
    const sendWhatsApp = document.getElementById("sendWhatsApp");
    sendWhatsApp.addEventListener("click", ()=>{
      const title = document.getElementById("tourTitle").textContent.trim();
      const date = document.getElementById("date").value;
      const group = document.getElementById("group").value;
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const notes = document.getElementById("notes").value.trim();

      if(!date || !group || !name || !phone){
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

      window.open(`https://wa.me/254722933305?text=${msg}`, "_blank");
    });

    // ===== Optional: "dynamic" tour loading (simple demo via URL param ?tour=mara-lux-3d) =====
    const TOURS = {
      "mara-lux-3d": {
        title: "Maasai Mara Luxury Escape",
        subtitle: "Curated lodge stays, iconic game drives, and premium planning — designed for comfort and unforgettable moments.",
        price: "KES 240,000",
        duration: "3 Days",
        location: "Maasai Mara",
        style: "Luxury",
        heroImg: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=75"
      },
      "diani-4d-hm": {
        title: "Diani Coast Honeymoon Retreat",
        subtitle: "Beachfront comfort, romantic add-ons, and smooth logistics — designed for premium couple experiences.",
        price: "KES 210,000",
        duration: "4 Days",
        location: "Diani",
        style: "Honeymoon",
        heroImg: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2200&q=75"
      }
    };

    const params = new URLSearchParams(window.location.search);
    const key = params.get("tour");
    if(key && TOURS[key]){
      const t = TOURS[key];
      document.getElementById("tourTitle").textContent = t.title;
      document.getElementById("tourSubtitle").textContent = t.subtitle;
      document.getElementById("tourPrice").textContent = t.price;
      document.getElementById("sidePrice").textContent = t.price;
      document.getElementById("tourDuration").textContent = t.duration;
      document.getElementById("tourLocation").textContent = t.location;
      document.getElementById("tourStyle").textContent = t.style;

      // swap hero background image
      document.querySelector(".hero").style.setProperty("--heroImg", `url('${t.heroImg}')`);
      // easiest: directly update the ::after bg via inline style:
      document.querySelector(".hero").style.backgroundImage = `linear-gradient(180deg, transparent, transparent)`;
      // NOTE: Keeping CSS ::after for premium look. If you want per-tour hero images,
      // you can set a data attribute and use JS to update a real <img> layer instead.
    }