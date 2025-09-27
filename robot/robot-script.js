// Robot Product Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Personality data
    const personalities = {
        finance: {
            icon: 'fa-chart-line',
            text: 'Finance Expert',
            color: '#06438c'
        },
        realestate: {
            icon: 'fa-home',
            text: 'Real Estate Agent',
            color: '#10b981'
        },
        sales: {
            icon: 'fa-handshake',
            text: 'Sales Agent',
            color: '#f59e0b'
        },
        legal: {
            icon: 'fa-gavel',
            text: 'Legal Assistant',
            color: '#8b5cf6'
        },
        teacher: {
            icon: 'fa-graduation-cap',
            text: 'Educator',
            color: '#3b82f6'
        },
        pricing: {
            icon: 'fa-robot',
            text: 'Your Robot',
            color: '#06438c'
        },
        intro: {
            icon: 'fa-robot',
            text: 'Your Robot Employee',
            color: '#06438c'
        }
    };

    // Get elements
    const badge = document.getElementById('personalityBadge');
    const badgeIcon = badge?.querySelector('.badge-icon i');
    const badgeText = badge?.querySelector('.badge-text');
    const sections = document.querySelectorAll('[data-personality]');

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    // Update personality badge based on visible section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const personality = entry.target.dataset.personality;
                if (personality && personalities[personality]) {
                    updatePersonalityBadge(personality);
                }
            }
        });
    }, observerOptions);

    // Observe personality sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Function to update personality badge
    function updatePersonalityBadge(personality) {
        if (!badge || !personalities[personality]) return;

        const data = personalities[personality];

        // Update icon
        if (badgeIcon) {
            badgeIcon.className = `fas ${data.icon}`;
        }

        // Update text
        if (badgeText) {
            badgeText.textContent = data.text;
        }

        // Add animation effect
        badge.style.transform = 'translateX(-50%) scale(0.95)';
        setTimeout(() => {
            badge.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
    }


    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(section);
    });

    // Form handling with Google Sheets integration
    const contactForm = document.getElementById('robotContactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Get user IP and country
                async function getUserIPAndCountry() {
                    try {
                        const response = await fetch('https://ipapi.co/json/');
                        const data = await response.json();
                        return {
                            ip: data.ip || 'Unknown',
                            country: data.country_name || 'Unknown'
                        };
                    } catch (error) {
                        try {
                            const ipResponse = await fetch('https://api.ipify.org?format=json');
                            const ipData = await ipResponse.json();
                            return {
                                ip: ipData.ip || 'Unknown',
                                country: 'Unknown'
                            };
                        } catch (ipError) {
                            return {
                                ip: 'Unknown',
                                country: 'Unknown'
                            };
                        }
                    }
                }

                // Get user info
                const userInfo = await getUserIPAndCountry();

                // Get browser information
                const userAgent = navigator.userAgent;
                let browserName = 'Unknown';
                if (userAgent.includes('Firefox')) {
                    browserName = 'Firefox';
                } else if (userAgent.includes('Chrome')) {
                    if (userAgent.includes('Edg')) {
                        browserName = 'Edge';
                    } else {
                        browserName = 'Chrome';
                    }
                } else if (userAgent.includes('Safari')) {
                    browserName = 'Safari';
                } else if (userAgent.includes('Opera')) {
                    browserName = 'Opera';
                }

                // Get form values
                const fullName = contactForm.name.value.trim();
                const nameParts = fullName.split(' ');
                const firstName = nameParts[0] || fullName;
                const lastName = nameParts.slice(1).join(' ') || '';
                const email = contactForm.email.value.trim();
                const phone = contactForm.phone?.value.trim() || '';
                const company = contactForm.company.value.trim();
                const companySize = contactForm.size?.value || 'Not specified';
                const industry = contactForm.industry.value;
                const country = contactForm.country.value.trim();
                const useCase = contactForm.usecase.value;
                const timeline = contactForm.timeline?.value || 'Not specified';
                const budget = contactForm.budget?.value || 'Not specified';
                const personalities = contactForm.personalities?.value || 'Not specified';
                const vision = contactForm.message?.value.trim() || '';

                // Get checked contact preferences
                const contactMethods = [];
                const contactCheckboxes = contactForm.querySelectorAll('input[name="contact-method"]:checked');
                contactCheckboxes.forEach(cb => contactMethods.push(cb.value));

                // Prepare message with all robot-specific info
                const message = `[ROBOT INQUIRY]
Company: ${company}
Company Size: ${companySize}
Industry: ${industry}
Country: ${country}
Primary Use Case: ${useCase}
Implementation Timeline: ${timeline}
Number of Personalities: ${personalities}
Budget Range: ${budget}
Preferred Contact Methods: ${contactMethods.length > 0 ? contactMethods.join(', ') : 'Not specified'}

Vision/Goals:
${vision || 'No additional information provided'}`;

                // Prepare form data for Google Sheets
                const formData = {
                    fname: firstName,
                    lname: lastName,
                    email: email,
                    phone: phone || 'Not provided',
                    message: message,
                    created_at: new Date().toISOString(),
                    ip: userInfo.ip,
                    country: userInfo.country,
                    browser: browserName
                };

                // Submit to Google Sheets
                await fetch('https://script.google.com/macros/s/AKfycbzyfwlw7yLJdk5foMtzm-RayTBj4OBcwsJ-Qvq8wFSM2bfxO7fvycEmZU9Bl9PO2v_v0w/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                submitBtn.textContent = 'Thank you! We\'ll be in touch soon.';
                submitBtn.style.background = '#10b981';

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.textContent = 'Error - Please try again';
                submitBtn.style.background = '#ef4444';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // Auto-save form data
    let autoSaveTimer;
    const formInputs = contactForm?.querySelectorAll('input, select, textarea');

    formInputs?.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                // Save to localStorage
                const formData = {};
                formInputs.forEach(field => {
                    if (field.type === 'checkbox') {
                        formData[field.name] = field.checked;
                    } else {
                        formData[field.name] = field.value;
                    }
                });
                localStorage.setItem('robotFormData', JSON.stringify(formData));

                // Show save indicator
                showSaveIndicator();
            }, 1000);
        });
    });

    // Load saved form data
    const savedData = localStorage.getItem('robotFormData');
    if (savedData && contactForm) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = contactForm.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = data[key];
                    } else {
                        field.value = data[key];
                    }
                }
            });
        } catch (e) {
            console.error('Error loading saved form data:', e);
        }
    }

    // Show save indicator
    function showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.textContent = 'Form data saved';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(indicator);

        setTimeout(() => {
            indicator.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }, 2000);
    }

    // Add CSS animations
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

    // Smooth scroll for anchor links
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

    // Video scroll control
    const robotVideo = document.getElementById('robotVideo');
    let videoReady = false;

    if (robotVideo) {
        // Pause video initially
        robotVideo.pause();

        // Wait for video metadata to load
        robotVideo.addEventListener('loadedmetadata', function() {
            videoReady = true;
            updateVideoProgress();
        });

        // If metadata already loaded
        if (robotVideo.readyState >= 1) {
            videoReady = true;
        }
    }

    // Update video progress based on scroll
    function updateVideoProgress() {
        if (!robotVideo || !videoReady) return;

        const scrollStart = window.innerHeight * 0.5; // Start after hero
        const scrollEnd = document.documentElement.scrollHeight - window.innerHeight;
        const scrollRange = scrollEnd - scrollStart;
        const scrolled = window.pageYOffset;

        // Calculate progress (0 to 1)
        let progress = (scrolled - scrollStart) / scrollRange;
        progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

        // Set video time based on scroll progress
        const videoDuration = robotVideo.duration;
        if (videoDuration) {
            robotVideo.currentTime = videoDuration * progress;
        }
    }

    // Throttled scroll handler for video
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                updateVideoProgress();
            }, 10); // Update every 10ms for smooth video scrubbing
        }
    });

    // PiP (Picture-in-Picture) Controls
    const pipContainer = document.querySelector('.product-visual');
    const pipMinimize = document.getElementById('pipMinimize');
    const pipExpand = document.getElementById('pipExpand');
    const pipClose = document.getElementById('pipClose');
    let pipManuallyHidden = false;

    // PiP minimize/maximize functionality
    if (pipMinimize) {
        pipMinimize.addEventListener('click', function() {
            if (pipContainer) {
                pipContainer.classList.toggle('minimized');
                pipContainer.classList.remove('expanded');
            }
        });
    }

    if (pipExpand) {
        pipExpand.addEventListener('click', function() {
            if (pipContainer) {
                pipContainer.classList.toggle('expanded');
                pipContainer.classList.remove('minimized');
            }
        });
    }

    if (pipClose) {
        pipClose.addEventListener('click', function() {
            if (pipContainer) {
                pipContainer.style.display = 'none';
                pipManuallyHidden = true;
            }
        });
    }

    // Scroll-based PiP visibility (only on tablet/mobile)
    function updatePiPVisibility() {
        // Check if PiP container exists
        if (!pipContainer) return;
        if (pipManuallyHidden) return;

        // Only apply PiP visibility logic on tablet/mobile
        if (window.innerWidth > 1024) {
            // Reset all PiP-specific styles for desktop
            pipContainer.style.display = '';
            pipContainer.style.opacity = '';
            pipContainer.style.transform = '';
            pipContainer.style.pointerEvents = '';
            pipContainer.style.position = '';
            pipContainer.style.bottom = '';
            pipContainer.style.right = '';
            pipContainer.style.width = '';
            pipContainer.style.height = '';
            return;
        }

        // Get scroll position
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Show PiP if user has scrolled down (like navbar behavior)
        if (scrollY > 100) {
            pipContainer.style.display = 'block';
            // Small delay to ensure display is set before animation
            setTimeout(() => {
                pipContainer.style.opacity = '1';
                pipContainer.style.transform = 'scale(1)';
                pipContainer.style.pointerEvents = 'auto';
            }, 10);
        } else {
            pipContainer.style.opacity = '0';
            pipContainer.style.transform = 'scale(0.8)';
            pipContainer.style.pointerEvents = 'none';
            // Hide completely after transition
            setTimeout(() => {
                if (pipContainer.style.opacity === '0') {
                    pipContainer.style.display = 'none';
                }
            }, 300);
        }
    }

    // Add scroll listener for PiP visibility
    window.addEventListener('scroll', function() {
        updatePiPVisibility();
    });

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updatePiPVisibility();

            // Force reflow/repaint for better responsiveness
            if (pipContainer) {
                pipContainer.offsetHeight; // Force reflow
            }
        }, 150);
    });

    // Initial check - ensure PiP starts hidden and check visibility
    if (window.innerWidth <= 1024) {
        if (pipContainer) {
            pipContainer.style.display = 'none';
            pipContainer.style.opacity = '0';
            pipContainer.style.transform = 'scale(0.8)';
            pipContainer.style.pointerEvents = 'none';
        }
        // Check visibility after DOM settles
        setTimeout(function() {
            updatePiPVisibility();
        }, 100);
    }

    // Drag functionality for PiP
    let isDragging = false;
    let startX, startY;
    let pipX, pipY;

    if (pipContainer) {
        // Only enable drag on tablet/mobile (< 1024px)
        function checkDragEnable() {
            if (window.innerWidth <= 1024) {
                pipContainer.style.cursor = 'move';
                pipContainer.addEventListener('mousedown', dragStart, { passive: false });
                pipContainer.addEventListener('touchstart', dragStart, { passive: false });
            } else {
                // Reset drag state for desktop
                pipContainer.style.cursor = 'default';
                pipContainer.removeEventListener('mousedown', dragStart);
                pipContainer.removeEventListener('touchstart', dragStart);
                // Reset position for desktop
                isDragging = false;
                pipContainer.style.left = '';
                pipContainer.style.top = '';
                pipContainer.style.right = '';
                pipContainer.style.bottom = '';
                pipContainer.style.transform = '';
            }
        }

        function dragStart(e) {
            // Don't drag if clicking on controls
            if (e.target.closest('.pip-controls')) {
                return;
            }

            // Prevent default touch behavior
            if (e.type === 'touchstart') {
                e.preventDefault();
            }

            const rect = pipContainer.getBoundingClientRect();

            // Get starting position
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else {
                startX = e.clientX;
                startY = e.clientY;
            }

            // Store current position
            pipX = rect.left;
            pipY = rect.top;

            if (e.target === pipContainer || e.target.closest('.product-visual')) {
                isDragging = true;
                // Switch to absolute positioning for dragging - use setProperty to override !important
                pipContainer.style.setProperty('right', 'auto', 'important');
                pipContainer.style.setProperty('bottom', 'auto', 'important');
                pipContainer.style.setProperty('left', pipX + 'px', 'important');
                pipContainer.style.setProperty('top', pipY + 'px', 'important');
            }
        }

        function dragEnd(e) {
            isDragging = false;
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();

            let clientX, clientY;

            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            // Calculate new position
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            let newX = pipX + deltaX;
            let newY = pipY + deltaY;

            // Get PiP dimensions
            const rect = pipContainer.getBoundingClientRect();

            // Keep within viewport bounds
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            // Apply new position - use setProperty to ensure it overrides CSS
            pipContainer.style.setProperty('left', newX + 'px', 'important');
            pipContainer.style.setProperty('top', newY + 'px', 'important');
        }

        // Add event listeners
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);

        // Check on load and resize
        checkDragEnable();
        window.addEventListener('resize', checkDragEnable);
    }
});