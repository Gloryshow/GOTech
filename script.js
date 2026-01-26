// ============================================
// GOTECH - PROFESSIONAL JAVASCRIPT
// ============================================

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavbar();
  initializeContactForm();
  initializeGetQuoteButtons();
  initializeScrollAnimations();
  initializeScrollToTop();
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

function initializeNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-sm');
    } else {
      navbar.classList.remove('shadow-sm');
    }
  });

  // Close navbar on link click
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// ============================================
// GET QUOTE BUTTONS FUNCTIONALITY
// ============================================

function initializeGetQuoteButtons() {
  const quoteButtons = document.querySelectorAll('.pricing-card .btn');
  
  quoteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const sendViaEmailBtn = document.getElementById('sendViaEmailBtn');
  const sendViaWhatsappBtn = document.getElementById('sendViaWhatsappBtn');
  const contactOptionCards = document.querySelectorAll('.contact-option-card');

  // Handle contact option selection
  contactOptionCards.forEach(card => {
    card.addEventListener('click', function() {
      contactOptionCards.forEach(c => c.classList.remove('border-primary', 'bg-primary-light'));
      this.classList.add('border-primary');
      this.style.backgroundColor = '#e7f1ff';
    });
  });

  // Send via Email
  if (sendViaEmailBtn) {
    sendViaEmailBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (validateForm()) {
        sendViaEmail();
      }
    });
  }

  // Send via WhatsApp
  if (sendViaWhatsappBtn) {
    sendViaWhatsappBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (validateForm()) {
        sendViaWhatsApp();
      }
    });
  }
}

// Validate contact form
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // Check if name is not empty
  if (!name) {
    showError('Please enter your name');
    return false;
  }

  // Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address');
    return false;
  }

  // Check if phone is provided
  if (!phone) {
    showError('Please enter your phone/WhatsApp number');
    return false;
  }

  // Check if message is not empty
  if (!message) {
    showError('Please enter your message');
    return false;
  }

  return true;
}

// Send via Email
function sendViaEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // Create email message format
  const subject = `New Project Inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone}\n\nMessage:\n${message}`;
  
  // Detect if user is on mobile/smartphone
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile: Open Gmail or email client directly
    const mailtoLink = `mailto:omoglo567@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showSuccess('Opening your email client...');
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);
  } else {
    // On desktop: Copy to clipboard first, then offer mailto fallback
    const fullMessage = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullMessage).then(() => {
      showSuccess('Message copied to clipboard! Send to: omoglo567@gmail.com');
      
      // Also try to open email client as fallback
      const mailtoLink = `mailto:omoglo567@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => {
        window.location.href = mailtoLink;
      }, 1500);
    }).catch(err => {
      // Fallback if clipboard fails
      showSuccess('Opening your email client...');
      const mailtoLink = `mailto:omoglo567@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();
      }, 500);
    });
  }
}

// Send via WhatsApp
function sendViaWhatsApp() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const userEmail = document.getElementById('email').value;

  // Create WhatsApp message
  const whatsappMessage = `Hello! I'm ${name}\n\nEmail: ${userEmail}\nPhone: ${phone}\n\nProject Details:\n${message}`;
  
  // Your WhatsApp number
  const whatsappNumber = '13092565601';
  
  // Create WhatsApp link
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  // Show success message
  showSuccess('Opening WhatsApp...');
  
  // Open WhatsApp
  setTimeout(() => {
    window.open(whatsappLink, '_blank');
  }, 500);
}

// Show success message
function showSuccess(message) {
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');
  
  errorMsg.classList.add('d-none');
  successMsg.textContent = message || 'Message sent successfully!';
  successMsg.classList.remove('d-none');

  setTimeout(() => {
    successMsg.classList.add('d-none');
  }, 3000);
}

// Show error message
function showError(message) {
  const errorMsg = document.getElementById('errorMessage');
  const successMsg = document.getElementById('successMessage');
  
  successMsg.classList.add('d-none');
  document.getElementById('errorText').textContent = message;
  errorMsg.classList.remove('d-none');

  setTimeout(() => {
    errorMsg.classList.add('d-none');
  }, 5000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll('.card, .service-card, .portfolio-card, .pricing-card, .testimonial-card, .feature-box');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'fadeInUp 0.6s ease-out forwards';
    observer.observe(el);
  });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initializeScrollToTop() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'btn-scroll-top';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('title', 'Scroll to Top');
  document.body.appendChild(scrollTopBtn);

  // Show/hide button on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Scroll to top on button click
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Counter animation for stats
function animateCounter(element, target, duration = 1500) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(function() {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animations when in view
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const number = entry.target.textContent;
      animateCounter(entry.target, parseInt(number));
      entry.target.classList.add('animated');
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('#about h4').forEach(el => {
  counterObserver.observe(el);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images when they become visible
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  }
});

console.log('GOTech website initialized successfully!');
