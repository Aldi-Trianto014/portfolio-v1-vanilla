console.log("JavaScript udah nyambung, bro!");

// ==================== 1. SCROLL REVEAL ANIMATION ====================
// Fitur ini bikin elemen muncul mulus pas lu scroll ke bawah

const observerOptions = {
    root: null,
    threshold: 0.1, // Animasi jalan pas elemen kelihatan 10% di layar
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Hapus class active kalo elemen di luar layar, biar pas di-scroll lagi animasinya ngulang
            entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

// Pilih elemen mana aja yang mau dikasih efek muncul
const elementsToReveal = document.querySelectorAll('.hero-content, .hero-image, .section-title, .about-left, .about-center, .about-right, .project-card, .contact-container');
elementsToReveal.forEach(el => {
    el.classList.add('reveal'); // JS otomatis nambahin class 'reveal' ke HTML lu
    observer.observe(el);
});

// ==================== 2. PARALLAX AMBIENT BACKGROUND ====================
// Bikin bola-bola neon di belakang sedikit goyang ngikutin kursor mouse lu

document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    // Hitung posisi mouse dari tengah layar
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 40; // Tiap bola punya kecepatan gerak beda-beda
        const moveX = x * speed;
        const moveY = y * speed;
        
        // Geser bola pelan-pelan pakai margin biar gak nabrak sama @keyframes CSS
        blob.style.marginLeft = `${moveX}px`;
        blob.style.marginTop = `${moveY}px`;
    });
});