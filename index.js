document.addEventListener('DOMContentLoaded', () => {
    
    // --- RESPONSIVE HAMBURGER NAVIGATION CONFIGURATION ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close mobile dropdown view on selection link tracking
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- ACCURATE ACTIVE LINK VIEWPORT TRACKING ---
    const sections = document.querySelectorAll('section');
    
    const scrollTracking = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Structural offset matching navigation header clearance

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollTracking);


    // --- PROFESSIONAL TESTIMONIALS CAROUSEL CONTROLLER ---
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    
    let currentIndex = 0;

    // Dynamically build navigation confirmation indicators (dots)
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateCarouselView = (targetIndex) => {
        // Safe bound structural loop wraps
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }
        
        // Compute precise percentage transform offset execution
        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        
        // Sync indicator states
        dots[currentIndex].classList.remove('active');
        dots[targetIndex].classList.add('active');
        
        currentIndex = targetIndex;
    };

    // User Event Binding
    nextBtn.addEventListener('click', () => updateCarouselView(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateCarouselView(currentIndex - 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarouselView(index));
    });

    // Optional Auto-scrolling logs validation rotation loop (Every 8 seconds)
    let autoRotationTimer = setInterval(() => updateCarouselView(currentIndex + 1), 8000);
    
    const resetRotationTimer = () => {
        clearInterval(autoRotationTimer);
        autoRotationTimer = setInterval(() => updateCarouselView(currentIndex + 1), 8000);
    };

    [prevBtn, nextBtn, dotsContainer].forEach(element => {
        element.addEventListener('click', resetRotationTimer);
    });
});