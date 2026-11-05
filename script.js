console.log("JavaScript udah nyambung, siap eksekusi!");

// ==================== 1. ANIMASI MUNCUL WAKTU DI-SCROLL (REVEAL) ====================
const observerOptions = {
    root: null,
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active'); 
        }
    });
}, observerOptions);

const elementsToReveal = document.querySelectorAll('.hero-content, .hero-image, .section-title, .about-left, .about-center, .about-right, .portfolio-category, .project-card, .contact-info, .contact-form-container');
elementsToReveal.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ==================== 2. PARALLAX AMBIENT BACKGROUND ====================
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 40; 
        const moveX = x * speed;
        const moveY = y * speed;
        blob.style.marginLeft = `${moveX}px`;
        blob.style.marginTop = `${moveY}px`;
    });
});

// ==================== 3. ANIMASI TYPING (Ketik Otomatis) ====================
const textArray = ["Tech Enthusiast", "Digital Content Support", "Administration Support", "Graphic Designer", "Operational & Logistic"];
const typingTextElement = document.querySelector(".typing-text");
let textIndex = 0; // Mau ngetik kata yang ke berapa dari array di atas
let charIndex = 0; // Huruf ke berapa yang lagi diketik
let isDeleting = false; // Status apakah mesin ketik lagi proses hapus kata

function typeAnimation() {
    const currentWord = textArray[textIndex];
    
    // Kalau lagi mode hapus, kurangi 1 huruf. Kalau ngetik, nambah 1 huruf.
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Nentuin kecepatan ketik. Pas ngetik 100ms, pas ngehapus ngebut 50ms.
    let typingSpeed = isDeleting ? 50 : 100;

    // Kalau kata udah selesai diketik semua, diem dulu 2 detik baru mulai ngehapus
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } 
    // Kalau kata udah selesai dihapus sampe abis, lanjut ke kata berikutnya
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; // Loop balik ke kata pertama kalo udah mentok
        typingSpeed = 500; // Diem bentar sebelum mulai ngetik kata baru
    }

    setTimeout(typeAnimation, typingSpeed);
}
// Jalanin fungsi ngetik pas halaman web pertama dibuka
document.addEventListener("DOMContentLoaded", typeAnimation);


// ==================== 4. KLIK FOTO HERO BUAT SWITCH ====================
// Fitur ganti foto placeholder ke foto asli pas diklik
const heroImageArea = document.querySelector('.hero-image');

heroImageArea.addEventListener('click', () => {
    // Tombol on/off class "switched". CSS lu nanti yg ngatur animasinya pudar/muncul
    heroImageArea.classList.toggle('switched');
});


// ==================== 5. UPDATE WARNA NAV ICON PAS SCROLL ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let currentSectionId = "";

    // Ngecek tiap section, mana yang batas atasnya paling nyentuh layar atas
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Pake "padding" 200px biar ganti warnanya luwes nyocokin jarak mata lu
        if (pageYOffset >= (sectionTop - 200)) {
            currentSectionId = section.getAttribute("id");
        }
    });

    // Reset semua icon jadi abu, lalu kasih class 'active' (biru neon) ke icon yang ID-nya cocok
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});