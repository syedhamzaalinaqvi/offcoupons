// Load Header and Footer
document.addEventListener('DOMContentLoaded', async () => {
    // Load Header
    const headerResponse = await fetch('/components/header.html');
    const headerContent = await headerResponse.text();
    document.querySelector('header').innerHTML = headerContent;

    // Load Footer
    const footerResponse = await fetch('/components/footer.html');
    const footerContent = await footerResponse.text();
    document.querySelector('footer').innerHTML = footerContent;

    // Initialize mobile menu
    initMobileMenu();

    // Initialize search functionality
    initSearch();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const couponCards = document.querySelectorAll('.coupon-card');

            couponCards.forEach(card => {
                const title = card.querySelector('.coupon-title').textContent.toLowerCase();
                const description = card.querySelector('.coupon-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Copy Coupon Code
function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToast('✅ Coupon Copied!');
    }).catch(() => {
        showToast('❌ Failed to copy coupon');
    });
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
        document.body.removeChild(toast);
    }, 3000);
}

// Newsletter Validation
function validateNewsletter(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
        showToast('❌ Please enter a valid email address');
        return false;
    }

    showToast('✅ Thank you for subscribing!');
    emailInput.value = '';
    return false; // Prevent form submission for demo
}

// Contact Form Validation
function validateContactForm(form) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
        showToast('❌ Please fill in all fields');
        return false;
    }

    if (!emailRegex.test(email)) {
        showToast('❌ Please enter a valid email address');
        return false;
    }

    showToast('✅ Message sent successfully!');
    form.reset();
    return false; // Prevent form submission for demo
}

// Smooth Scroll
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
