 // ===== Helpers =====
    function starsHTML(rating){
      const full = Math.floor(rating);
      const half = (rating - full) >= 0.5;
      const total = 5;
      let out = "";
      for(let i=1;i<=total;i++){
        // simulate google-ish: full stars, rest dim (keeping it simple/premium)
        out += `<span class="star ${i<=rating ? "" : "dim"}"></span>`;
      }
      return out;
    }

    // ===== Average rating (edit these) =====
    const AVG_RATING = 4.8;
    const REVIEW_COUNT = 124;

    document.getElementById("avgRating").textContent = AVG_RATING.toFixed(1);
    document.getElementById("reviewCount").textContent = REVIEW_COUNT;
    document.getElementById("avgStars").innerHTML = starsHTML(AVG_RATING);

    // ===== Testimonials Data (edit freely) =====
    // video: optional URL (YouTube/Drive/etc). If present, a "Video review" pill shows.
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

    // ===== Render slides =====
    const tSlides = document.getElementById("tSlides");

    function googleG(){
      // simple inline "G" mark (non-copyrighty, generic)
      return `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.2c0-.7-.06-1.2-.2-1.8H12v3.4h5.1c-.1.9-.7 2.2-2 3.1v2.2h3.2c1.9-1.7 2.7-4.1 2.7-6.9Z" fill="rgba(255,234,170,.92)"/>
          <path d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.2-2.2c-.9.6-2 .9-3.2.9-2.5 0-4.6-1.7-5.3-4.1H3.4v2.3C5 19.7 8.2 22 12 22Z" fill="rgba(15,106,82,.95)"/>
          <path d="M6.7 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1V7.6H3.4C2.7 9 2.3 10.5 2.3 12s.4 3 1.1 4.4l3.3-2.3Z" fill="rgba(255,255,255,.25)"/>
          <path d="M12 5.8c1.8 0 3 .8 3.7 1.5l2.7-2.6C16.8 3.2 14.6 2 12 2 8.2 2 5 4.3 3.4 7.6l3.3 2.3C7.4 7.5 9.5 5.8 12 5.8Z" fill="rgba(201,162,39,.92)"/>
        </svg>
      `;
    }

    tSlides.innerHTML = TESTIMONIALS.map(t => `
      <div class="swiper-slide">
        <article class="t-card">
          <div class="t-top">
            <div class="g-badge" aria-hidden="true">${googleG()}</div>
            <div class="t-meta">
              <div class="t-name">${t.name}</div>
              <div class="t-sub">${t.location} • ${t.date}</div>
              <div class="t-stars" aria-label="${t.rating} out of 5 stars">
                ${Array.from({length:5}).map((_,i)=>`<span class="star ${i < t.rating ? "" : "dim"}"></span>`).join("")}
              </div>
            </div>
          </div>

          <div class="t-body">
            <p class="t-quote">“${t.text}”</p>
            <div class="t-foot">
              <span>Trip: <strong style="color:rgba(245,248,248,.90)">${t.trip}</strong></span>
              ${t.video ? `<a class="t-pill" href="${t.video}" target="_blank" rel="noopener"><span class="play"></span> Video review</a>` : `<span class="t-pill"><span class="play" style="opacity:.55"></span> Verified</span>`}
            </div>
          </div>
        </article>
      </div>
    `).join("");

    // ===== Init Swiper =====
    const tSwiper = new Swiper("#testimonialsSwiper", {
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

    // Year
    document.getElementById("year").textContent = new Date().getFullYear();