// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPreloader();
    initNavigation();
    initHeroSlider();
    initQuickBooking();
    initRoomModals();
    initBookingModal();
    initVideoModal();
    initBackToTop();
    initAnimations();
    initFormValidation();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Navigation Functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const bookNowButtons = document.querySelectorAll('#navBookNow, #navBookNow2');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Book Now buttons
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openBookingModal();
        });
    });
}

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });
    
    // Auto slide functionality
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Start the auto slide
    startSlideInterval();
    
    // Pause auto slide on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    hero.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
}

// Quick Booking Widget
function initQuickBooking() {
    const bookingWidget = document.querySelector('.quick-booking-widget');
    const bookingToggle = document.querySelector('.booking-toggle');
    const quickBookingForm = document.querySelector('.quick-booking-form');
    
    // Toggle widget visibility
    bookingToggle.addEventListener('click', function() {
        bookingWidget.classList.toggle('active');
    });
    
    // Quick booking form submission
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = document.getElementById('widgetCheckin').value;
            const checkout = document.getElementById('widgetCheckout').value;
            const guests = document.getElementById('widgetGuests').value;
            
            if (checkin && checkout) {
                showNotification('Checking availability for your selected dates...', 'info');
                // In a real application, you would check availability here
                setTimeout(() => {
                    openBookingModal();
                    // Pre-fill booking form with widget values
                    document.getElementById('checkin').value = checkin;
                    document.getElementById('checkout').value = checkout;
                    document.getElementById('adults').value = guests;
                }, 1500);
            }
        });
    }
    
    // Set minimum dates for check-in and check-out
    const today = new Date().toISOString().split('T')[0];
    const widgetCheckin = document.getElementById('widgetCheckin');
    const widgetCheckout = document.getElementById('widgetCheckout');
    
    if (widgetCheckin) {
        widgetCheckin.min = today;
        
        widgetCheckin.addEventListener('change', function() {
            widgetCheckout.min = this.value;
            
            // If checkout date is before checkin date, reset it
            if (widgetCheckout.value && widgetCheckout.value < this.value) {
                widgetCheckout.value = this.value;
            }
        });
    }
}

// Room Modals
function initRoomModals() {
    const roomModal = document.getElementById('roomModal');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const closeModal = roomModal.querySelector('.close-modal');
    
    // Room data
    const roomData = {
        king: {
            title: 'King Suite',
            description: 'Experience ultimate luxury in our spacious King Suite, featuring a queen bed, private entrance, and stunning pool views. This 80m² suite offers premium amenities for a comfortable and memorable stay.',
            images: [
                'images/b1.jpg',
                'images/b2.jpg',
                'images/b3.jpg'
            ],
            highlights: [
                { icon: 'fas fa-bed', text: '1 Queen Bed' },
                { icon: 'fas fa-expand', text: '80 m² Spacious' },
                { icon: 'fas fa-eye', text: 'Pool View' },
                { icon: 'fas fa-tv', text: 'Flat-screen TV' },
                { icon: 'fas fa-wifi', text: 'Free WiFi' },
                { icon: 'fas fa-bath', text: 'Private Bathroom' },
                { icon: 'fas fa-coffee', text: 'Tea/Coffee Maker' },
                { icon: 'fas fa-door-open', text: 'Private Entrance' }
            ],
            price: 'ZAR 1,800',
            taxes: '+ZAR 158 taxes & fees per night'
        },
        superior: {
            title: 'Superior Suite',
            description: 'Indulge in our Superior Suite with breathtaking garden and pool views. This premium 80m² accommodation features a patio, terrace, and all the amenities for an exceptional stay.',
            images: [
                'images/b5.jpg',
                'images/b6.jpg',
                'images/b7.jpg'
            ],
            highlights: [
                { icon: 'fas fa-bed', text: '1 Queen Bed' },
                { icon: 'fas fa-expand', text: '80 m² Spacious' },
                { icon: 'fas fa-eye', text: 'Garden & Pool View' },
                { icon: 'fas fa-umbrella-beach', text: 'Private Patio' },
                { icon: 'fas fa-door-open', text: 'Terrace Access' },
                { icon: 'fas fa-tv', text: 'Flat-screen TV' },
                { icon: 'fas fa-wifi', text: 'Free WiFi' },
                { icon: 'fas fa-wind', text: 'Air Conditioning' }
            ],
            price: 'ZAR 2,070',
            taxes: '+ZAR 182 taxes & fees per night'
        }
    };
    
    // Open room modal
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const roomType = this.getAttribute('data-room');
            openRoomModal(roomType);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closeRoomModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === roomModal) {
            closeRoomModal();
        }
    });
    
    function openRoomModal(roomType) {
        const room = roomData[roomType];
        const modalBody = roomModal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="room-gallery">
                ${room.images.map(img => `
                    <div class="gallery-item">
                        <img src="${img}" alt="${room.title}">
                    </div>
                `).join('')}
            </div>
            <div class="room-details-content">
                <h2>${room.title}</h2>
                <p>${room.description}</p>
                
                <div class="room-highlights">
                    ${room.highlights.map(highlight => `
                        <div class="highlight-item">
                            <div class="highlight-icon">
                                <i class="${highlight.icon}"></i>
                            </div>
                            <span>${highlight.text}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="room-price-large">
                    <span class="price">${room.price}</span>
                    <span class="taxes">${room.taxes}</span>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeRoomModal()">Close</button>
                    <button class="btn btn-primary" onclick="bookRoom('${roomType}')">Book This Room</button>
                </div>
            </div>
        `;
        
        roomModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    window.openRoomModal = openRoomModal;
    window.closeRoomModal = closeRoomModal;
    window.bookRoom = function(roomType) {
        closeRoomModal();
        openBookingModal(roomType);
    };
    
    function closeRoomModal() {
        roomModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Booking Modal
function initBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = bookingModal.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const roomOptions = document.querySelectorAll('.room-option');
    const bookRoomButtons = document.querySelectorAll('.book-room-btn');
    
    // Room option selection
    roomOptions.forEach(option => {
        option.addEventListener('click', function() {
            roomOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateBookingSummary();
        });
    });
    
    // Book room buttons
    bookRoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const roomType = this.getAttribute('data-room');
            openBookingModal(roomType);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closeBookingModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processBooking();
        });
    }
    
    // Date change handlers
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.min = today;
        
        checkinInput.addEventListener('change', function() {
            checkoutInput.min = this.value;
            if (checkoutInput.value && checkoutInput.value < this.value) {
                checkoutInput.value = this.value;
            }
            updateBookingSummary();
        });
    }
    
    if (checkoutInput) {
        checkoutInput.addEventListener('change', updateBookingSummary);
    }
    
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    
    function openBookingModal(roomType = 'king') {
        // Set active room option
        roomOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-room') === roomType) {
                option.classList.add('active');
            }
        });
        
        // Set minimum dates
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkin').min = today;
        
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateBookingSummary();
    }
    
    function closeBookingModal() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function updateBookingSummary() {
        const checkin = new Date(document.getElementById('checkin').value);
        const checkout = new Date(document.getElementById('checkout').value);
        const activeRoom = document.querySelector('.room-option.active');
        
        if (checkin && checkout && !isNaN(checkin) && !isNaN(checkout) && activeRoom) {
            const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
            
            if (nights > 0) {
                const roomType = activeRoom.getAttribute('data-room');
                const roomRate = roomType === 'king' ? 1800 : 2070;
                const taxRate = roomType === 'king' ? 158 : 182;
                
                const roomTotal = roomRate * nights;
                const taxTotal = taxRate * nights;
                const finalTotal = roomTotal + taxTotal;
                
                document.getElementById('roomTotal').textContent = `ZAR ${roomTotal.toLocaleString()}`;
                document.getElementById('taxTotal').textContent = `ZAR ${taxTotal.toLocaleString()}`;
                document.getElementById('finalTotal').textContent = `ZAR ${finalTotal.toLocaleString()}`;
            }
        }
    }
    
    function processBooking() {
        const formData = new FormData(bookingForm);
        const bookingData = {
            checkin: formData.get('checkin'),
            checkout: formData.get('checkout'),
            adults: formData.get('adults'),
            children: formData.get('children'),
            roomType: document.querySelector('.room-option.active').getAttribute('data-room'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            specialRequests: formData.get('specialRequests')
        };
        
        // Simulate booking processing
        showNotification('Processing your booking...', 'info');
        
        setTimeout(() => {
            showNotification('Booking confirmed! We have sent a confirmation email.', 'success');
            closeBookingModal();
            bookingForm.reset();
        }, 2000);
    }
}

// Video Modal
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoBtn = document.getElementById('watchVideo');
    const closeModal = videoModal.querySelector('.close-modal');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeModal.addEventListener('click', function() {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Back to Top
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animations
function initAnimations() {
    // Simple scroll animation implementation
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
    
    function getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8',
            warning: '#ffc107'
        };
        return colors[type] || '#17a2b8';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});