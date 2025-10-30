// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');


// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);


// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Add active class styles to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--middle-beige) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;


document.head.appendChild(style);
function tpFunc(section) {
    const target = document.getElementById(section);
    if (target) {
        const offset = 80; // pixels to offset from the top — adjust as needed
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }
};


let sectionFound = false;
window.addEventListener("scroll", () => {
    if (window.scrollY >= 4250 && !sectionFound) {
        sectionFound = true;
        document.querySelectorAll("#usedLangs > div > div").forEach((elem, index) => {
            const distance = (index + 1) * 150; // distance to move right
            const duration = 1000 + (index * 200); // duration increases for each element
            elem.animate([
                { left: '700px' },
                { left: `${700 - distance - 550}px` }
            ], {
                duration: duration,
                fill: 'forwards'
            });
        });
    } else if (window.scrollY < 4250 && sectionFound) {
        sectionFound = false;
        document.querySelectorAll("#usedLangs > div > div").forEach((elem) => {
            elem.animate([
                { left: getComputedStyle(elem).left },
                { left: '700px' }
            ], {
                duration: 800,
                fill: 'forwards'
            });
        });
    } else {
        // Do nothing
    };
});
