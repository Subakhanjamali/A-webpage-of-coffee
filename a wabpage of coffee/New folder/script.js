// ==================== DOM ELEMENTS ====================
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const menuGrid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickView = document.getElementById('closeQuickView');
const quickViewContent = document.getElementById('quickViewContent');

// ==================== SHOW/HIDE FUNCTIONS ====================
function showElement(element) {
    element.style.display = 'block';
    setTimeout(() => {
        element.classList.add('active');
    }, 10);
}

function hideElement(element) {
    element.classList.remove('active');
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);
}

// ==================== LOGIN MODAL FUNCTIONALITY ====================
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showElement(loginModal);
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        hideElement(loginModal);
    });
}

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        hideElement(loginModal);
    }
});

// Switch between login and signup forms
if (showSignup) {
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });
}

if (showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });
}

// Password visibility toggle
function setupPasswordToggle(passwordInputId, toggleButtonId) {
    const passwordInput = document.getElementById(passwordInputId);
    const toggleButton = document.getElementById(toggleButtonId);
    
    if (passwordInput && toggleButton) {
        toggleButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleButton.querySelector('i').classList.toggle('fa-eye');
            toggleButton.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
}

setupPasswordToggle('loginPassword', 'showLoginPassword');
setupPasswordToggle('signupPassword', 'showSignupPassword');

// Form submissions
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');

if (loginFormElement) {
    loginFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Login successful!');
        hideElement(loginModal);
    });
}

if (signupFormElement) {
    signupFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Account created successfully!');
        hideElement(loginModal);
    });
}

// ==================== NOTIFICATION FUNCTIONALITY ====================
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('active');
    
    setTimeout(() => {
        hideElement(notification);
    }, 3000);
}

// ==================== MOBILE MENU TOGGLE ====================
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== STICKY NAVBAR ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// ==================== BACK TO TOP ====================
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== MENU FILTER FUNCTIONALITY ====================
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== ADD TO CART FUNCTIONALITY ====================
if (addToCartBtns.length > 0) {
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.getAttribute('data-id');
            const itemName = btn.closest('.menu-item').querySelector('h3').textContent;
            const itemPrice = btn.closest('.menu-item').querySelector('.price').textContent;
            
            // Add animation
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = 'white';
            
            // Show notification
            showNotification(`${itemName} added to cart!`);
            
            // Reset button after animation
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
            
            // Here you would normally add the item to cart storage
            console.log(`Added item ${itemId} to cart: ${itemName} - ${itemPrice}`);
        });
    });
}

// ==================== QUICK VIEW FUNCTIONALITY ====================
const menuItemsData = {
    1: {
        name: 'Espresso',
        price: '$3.50',
        category: 'Hot Coffee',
        description: 'Strong and concentrated coffee served in small shots. Perfect for a quick caffeine boost.',
        details: 'Made with our finest single-origin beans, carefully roasted to perfection. Served in a 2oz demitasse cup.',
        calories: '5',
        preparation: '30 seconds',
        rating: '4.5',
        reviews: '45'
    },
    2: {
        name: 'Cappuccino',
        price: '$4.50',
        category: 'Hot Coffee',
        description: 'Equal parts espresso, steamed milk, and milk foam. A classic Italian favorite.',
        details: 'Crafted with double espresso shots, velvety steamed milk, and a thick layer of microfoam. Sprinkled with cocoa powder.',
        calories: '120',
        preparation: '2 minutes',
        rating: '5.0',
        reviews: '62'
    },
    3: {
        name: 'Caramel Latte',
        price: '$5.00',
        category: 'Hot Coffee',
        description: 'Espresso with steamed milk and sweet caramel syrup. A sweet treat in a cup.',
        details: 'Features our signature espresso blended with steamed whole milk and homemade caramel syrup. Topped with whipped cream and caramel drizzle.',
        calories: '250',
        preparation: '3 minutes',
        rating: '4.5',
        reviews: '58'
    },
    // Add more items as needed
};

if (quickViewBtns.length > 0) {
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.getAttribute('data-id');
            const itemData = menuItemsData[itemId];
            
            if (itemData) {
                quickViewContent.innerHTML = `
                    <div class="quick-view-image">
                        <img src="images/${itemData.name.toLowerCase().replace(' ', '-')}.jpg" alt="${itemData.name}">
                    </div>
                    <div class="quick-view-details">
                        <div class="quick-view-header">
                            <h3>${itemData.name}</h3>
                            <span class="price">${itemData.price}</span>
                        </div>
                        <div class="quick-view-category">
                            <span class="badge">${itemData.category}</span>
                            <div class="rating">
                                ${generateStars(itemData.rating)} <span>(${itemData.reviews} reviews)</span>
                            </div>
                        </div>
                        <p class="description">${itemData.description}</p>
                        <div class="quick-view-info">
                            <div class="info-item">
                                <i class="fas fa-fire"></i>
                                <span>${itemData.calories} Calories</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <span>${itemData.preparation} Prep Time</span>
                            </div>
                        </div>
                        <p class="details">${itemData.details}</p>
                        <div class="quick-view-actions">
                            <button class="add-to-cart" data-id="${itemId}">
                                <i class="fas fa-plus"></i> Add to Cart
                            </button>
                            <button class="btn-secondary">
                                <i class="fas fa-heart"></i> Add to Favorites
                            </button>
                        </div>
                    </div>
                `;
                
                // Reattach event listener to the new add to cart button
                const newAddToCartBtn = quickViewContent.querySelector('.add-to-cart');
                if (newAddToCartBtn) {
                    newAddToCartBtn.addEventListener('click', function() {
                        const itemName = itemData.name;
                        showNotification(`${itemName} added to cart!`);
                        hideElement(quickViewModal);
                    });
                }
                
                showElement(quickViewModal);
            }
        });
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Close quick view modal
if (closeQuickView) {
    closeQuickView.addEventListener('click', () => {
        hideElement(quickViewModal);
    });
}

quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        hideElement(quickViewModal);
    }
});

// ==================== MENU ITEM CLICK EFFECTS ====================
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.zIndex = '100';
    });
    
    item.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!item.matches(':hover')) {
                item.style.zIndex = '';
            }
        }, 300);
    });
    
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.add-to-cart') && !e.target.closest('.quick-view-btn')) {
            const itemId = item.querySelector('.add-to-cart').getAttribute('data-id');
            const quickViewBtn = item.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                quickViewBtn.click();
            }
        }
    });
});

// ==================== CONTACT FORM SUBMISSION ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ==================== NEWSLETTER SUBSCRIPTION ====================
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterBtn = newsletterForm.querySelector('button');
    
    newsletterBtn.addEventListener('click', () => {
        if (newsletterInput.value && newsletterInput.value.includes('@')) {
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterInput.value = '';
        } else {
            showNotification('Please enter a valid email address.');
        }
    });
    
    newsletterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            newsletterBtn.click();
        }
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.menu-item, .feature, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
});