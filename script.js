document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTOS ================= */
    const search = document.getElementById("search");
    const cards = Array.from(document.querySelectorAll(".card"));

    /* ================= SEARCH PREMIUM ================= */
    if (search) {
        search.addEventListener("input", () => {
            const value = search.value.toLowerCase().trim();

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                const match = text.includes(value);

                card.style.display = match ? "block" : "none";
            });
        });
    }

    /* ================= LIGHTBOX ULTRA ================= */
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    const img = document.createElement("img");
    img.id = "imagen";

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    function openLightbox(index){
        currentIndex = index;
        img.src = cards[currentIndex].querySelector("img").src;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox(){
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    function nextImage(){
        currentIndex = (currentIndex + 1) % cards.length;
        img.src = cards[currentIndex].querySelector("img").src;
    }

    function prevImage(){
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        img.src = cards[currentIndex].querySelector("img").src;
    }

    /* ================= EVENTO CLICK EN IMÁGENES ================= */
    cards.forEach((card, index) => {
        const image = card.querySelector("img");

        image.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    /* ================= LIGHTBOX CONTROLS ================= */
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });

    /* ================= SWIPE MOBILE ================= */
    let startX = 0;

    lightbox.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) nextImage();
        if (endX - startX > 50) prevImage();
    });

    /* ================= ANIMACIÓN PREMIUM DE ENTRADA ================= */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "0.7s ease";
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = "translateY(25px)";
        observer.observe(card);
    });

});