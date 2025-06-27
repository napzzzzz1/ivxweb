// Alpine.js initialization
document.addEventListener('alpine:init', () => {
    Alpine.data('scrollBehavior', () => ({
        shown: false,
        init() {
            this.shown = true;
        }
    }));
});

// Scroll to Top functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.getElementsByTagName('a');
    Array.from(mobileLinks).forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            isMenuOpen = false;
        });
    });

    // Hide mobile menu on window resize if screen becomes larger
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // md breakpoint
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            isMenuOpen = false;
        }
    });

    // Add scroll event listener for nav background opacity
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            nav.classList.remove('bg-gray-900/95');
            nav.classList.add('bg-gray-900');
        } else {
            nav.classList.remove('bg-gray-900');
            nav.classList.add('bg-gray-900/95');
        }
    });

    // Scroll animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}); 