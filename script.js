// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Duplicate the banner content for a seamless loop
    const bannerContent = document.querySelector('.banner-content');
    bannerContent.innerHTML = bannerContent.innerHTML + bannerContent.innerHTML;

    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navSocial = document.querySelector('.nav-social');

    // Handle mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        navSocial.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);

        if (!isClickInsideNav && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            navSocial.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('show');
            navSocial.classList.remove('show');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Change nav background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add a simple fade-in effect for sections
    const sections = document.querySelectorAll('section');

    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transition = "opacity 1s ease-in-out";
        fadeInObserver.observe(section);
    });

    // Add class to trigger the fade-in
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            const position = section.getBoundingClientRect();

            // If section is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                section.style.opacity = "1";
            }
        });
    });

    // Add touch support for video items
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(item => {
        // Add active class on touch for mobile devices
        item.addEventListener('touchstart', function() {
            // Remove active class from all other items
            videoItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('touch-active');
                }
            });

            // Toggle active class on current item
            item.classList.toggle('touch-active');
        }, { passive: true });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
