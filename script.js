// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle with Enhanced Animation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    var scrollY = 0;
    var html = document.documentElement;

    function preventTouchMove(e) {
        // Only allow scrolling inside the language dropdown list
        var target = e.target;
        while (target && target !== document) {
            if (target.classList && target.classList.contains('nav-lang-list')) return;
            target = target.parentElement;
        }
        e.preventDefault();
    }

    function lockScroll() {
        scrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = '-' + scrollY + 'px';
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        html.style.height = '100%';
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
    }

    function unlockScroll() {
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        html.style.overflow = '';
        html.style.height = '';
        document.removeEventListener('touchmove', preventTouchMove);
        window.scrollTo(0, scrollY);
    }

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            lockScroll();
        } else {
            unlockScroll();
        }
    });

    // Close mobile menu when clicking on a link (skip language trigger)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (this.classList.contains('nav-lang-trigger')) return;
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            unlockScroll();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            unlockScroll();
        }
    });

    // Navbar scroll effect - ONLY for home page
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    // Check if we're on the home page using data attribute
    const isHomePage = document.body.getAttribute('data-page') === 'home';

    // Only apply transparent navbar logic on home page
    if (isHomePage) {
        // Start transparent if at top
        if (window.pageYOffset <= 50) {
            navbar.classList.add('navbar-transparent');
        }

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('navbar-transparent');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('navbar-transparent');
            }

            lastScroll = currentScroll;
        });
    } else {
        // For non-home pages, just handle the scrolled state for shadow
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                const headerOffset = 80;
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.product-card, .service-card-large, .blog-card, .opportunity-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Form submissions - Removed contact form handler as it's now handled inline in index.html

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would normally send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            showNotification('Thank you for subscribing to our newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }

    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #06438c 0%, #0856b3 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-brand');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${currentYear} RB Labs. All rights reserved.`;
    }

    // Lazy loading for images (when real images are added)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add active state to current navigation item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-based functions
    const debouncedHighlight = debounce(highlightNavigation, 100);
    window.addEventListener('scroll', debouncedHighlight);

    // Initialize AOS-like animations for elements entering viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('aos-animated')) {
                element.classList.add('aos-animated');
                const animation = element.getAttribute('data-aos');
                element.style.animation = `${animation} 0.8s ease-out forwards`;
            }
        });
    };

    window.addEventListener('scroll', debounce(animateOnScroll, 100));
    animateOnScroll(); // Run once on load

    // Preloader (optional - uncomment if you want to add a preloader)
    /*
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
    */

    // Video control - add delay after videos end
    //const videosWithDelay = document.querySelectorAll('video.hero-sphere, video.innovation-video');
    //videosWithDelay.forEach(video => {
    //    video.addEventListener('ended', function() {
    //        setTimeout(() => {
    //            video.play();
    //        }, 3000); // 3 second delay before replaying
    //    });
    //});

    console.log('RB Labs website initialized successfully');
});