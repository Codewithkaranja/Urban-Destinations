 // Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Swiper init (premium + uncluttered)
    new Swiper(".swiper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 18,
      autoplay: { delay: 4200, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        0:   { slidesPerView: 1.08 },
        640: { slidesPerView: 1.35 },
        900: { slidesPerView: 2.15 },
        1200:{ slidesPerView: 2.7 }
      }
    });

    // Send enquiry via WhatsApp (no clutter: simple + direct)
    function openWhatsAppQuote(e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const destination = document.getElementById("destination").value;
      const group = document.getElementById("group").value;
      const notes = document.getElementById("notes").value.trim();

      const msg =
        `Hi Njeru Tours & Travels,%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Destination: ${encodeURIComponent(destination)}%0A` +
        `Group size: ${encodeURIComponent(group)}%0A` +
        `Notes: ${encodeURIComponent(notes || "—")}`;

      window.open(`https://wa.me/254722933305?text=${msg}`, "_blank");
      return false;
    }