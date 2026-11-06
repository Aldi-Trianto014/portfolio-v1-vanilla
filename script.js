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

const elementsToReveal = document.querySelectorAll('.hero-content, .hero-image, .section-title, .about-left, .about-center, .about-right, .big-works-grid, .contact-layout');
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
let textIndex = 0; 
let charIndex = 0; 
let isDeleting = false; 

function typeAnimation() {
    if (!typingTextElement) return;

    const currentWord = textArray[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; 
        typingSpeed = 500; 
    }

    setTimeout(typeAnimation, typingSpeed);
}
document.addEventListener("DOMContentLoaded", typeAnimation);


// ==================== 4. HOVER FOTO HERO BUAT SWITCH (LOCKED!) ====================
const heroImageArea = document.querySelector('.hero-image');
if (heroImageArea) {
    heroImageArea.addEventListener('mouseenter', () => {
        heroImageArea.classList.add('switched');
    });

    heroImageArea.addEventListener('mouseleave', () => {
        heroImageArea.classList.remove('switched');
    });
}


// ==================== 5. HOVER SPIDERMAN RADIUS SENTER ====================
const spideyContainer = document.getElementById('spideyContainer');
const spideyPhoto = document.getElementById('spideyPhoto');

if (spideyContainer && spideyPhoto) {
    spideyContainer.addEventListener('mousemove', (e) => {
        const rect = spideyContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spideyPhoto.style.clipPath = `circle(60px at ${x}px ${y}px)`;
    });

    spideyContainer.addEventListener('mouseleave', () => {
        spideyPhoto.style.clipPath = `circle(0px at 50% 50%)`;
    });
}

// ==================== 6. UPDATE WARNA NAV ICON PAS SCROLL ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
});