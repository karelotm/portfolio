// ===== PORTFOLIO MAIN JAVASCRIPT FILE =====

// ===== GLOBAL VARIABLES =====
let isDarkMode = false;
let isMenuOpen = false;
let currentLanguage = 'en';

// ===== TRANSLATIONS =====
const translations = {
    en: {
        nav: {
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact',
            contactMe: 'Contact Me'
        },
        hero: {
            subtitle: 'Data Specialist & Excel Master',
            description: 'I transform complex data into interactive dashboards and automated solutions that drive decision-making and optimize business processes.',
            discoverProjects: 'Discover My Projects',
            getInTouch: 'Get In Touch',
            downloadResume: 'Download Resume'
        },
        about: {
            title: 'Hello, I\'m Karim.',
            description: 'Passionate about problem-solving, I specialize in creating tools in Excel and Power BI to make data clear, accessible, and actionable. My goal is to build effective solutions that eliminate manual tasks, ensure reliable reporting, and provide valuable insights for business growth. Having worked at Amazon and as a freelancer, I know how to adapt to various needs and deliver concrete results.'
        },
        skills: {
            title: 'Technical Skills',
            description: 'Here are the key technologies and tools I work with to deliver exceptional results.'
        },
        projects: {
            title: 'My Main Projects',
            description: 'Here is a selection of projects that illustrate my expertise in dashboard creation, analysis, and automation.'
        },
        contact: {
            title: 'Let\'s work together',
            description: 'I am available for freelance missions and open to opportunities. Feel free to contact me.',
            getInTouch: 'Get In Touch',
            remoteWork: 'Available for Remote Work',
            responseTime: 'Response within 24 hours',
            connectWithMe: 'Connect With Me',
            sendMessage: 'Send a Message',
            form: {
                name: 'Your Name',
                email: 'Your Email',
                subject: 'Subject',
                message: 'Your Message',
                submit: 'Send Message'
            },
            emailDirect: 'Send Email Directly'
        }
    },
    fr: {
        nav: {
            about: 'À propos',
            skills: 'Compétences',
            projects: 'Projets',
            contact: 'Contact',
            contactMe: 'Me contacter'
        },
        hero: {
            subtitle: 'Spécialiste des Données & Maître Excel',
            description: 'Je transforme des données complexes en tableaux de bord interactifs et solutions automatisées qui favorisent la prise de décision et optimisent les processus métier.',
            discoverProjects: 'Découvrir mes projets',
            getInTouch: 'Entrer en contact',
            downloadResume: 'Télécharger CV'
        },
        about: {
            title: 'Bonjour, je suis Karim.',
            description: 'Passionné par la résolution de problèmes, je me spécialise dans la création d\'outils Excel et Power BI pour rendre les données claires, accessibles et exploitables. Mon objectif est de construire des solutions efficaces qui éliminent les tâches manuelles, assurent un reporting fiable et fournissent des insights précieux pour la croissance de l\'entreprise. Ayant travaillé chez Amazon et en tant que freelance, je sais m\'adapter à divers besoins et livrer des résultats concrets.'
        },
        skills: {
            title: 'Compétences Techniques',
            description: 'Voici les technologies et outils clés avec lesquels je travaille pour livrer des résultats exceptionnels.'
        },
        projects: {
            title: 'Mes Principaux Projets',
            description: 'Voici une sélection de projets qui illustrent mon expertise en création de tableaux de bord, analyse et automatisation.'
        },
        contact: {
            title: 'Travaillons ensemble',
            description: 'Je suis disponible pour des missions freelance et ouvert aux opportunités. N\'hésitez pas à me contacter.',
            getInTouch: 'Entrer en contact',
            remoteWork: 'Disponible pour le travail à distance',
            responseTime: 'Réponse sous 24 heures',
            connectWithMe: 'Connectez-vous avec moi',
            sendMessage: 'Envoyer un message',
            form: {
                name: 'Votre nom',
                email: 'Votre email',
                subject: 'Sujet',
                message: 'Votre message',
                submit: 'Envoyer le message'
            },
            emailDirect: 'Envoyer un email directement'
        }
    }
};

// ===== DOM ELEMENTS =====
const darkModeToggle = document.getElementById('darkModeToggle');
const languageToggle = document.getElementById('languageToggle');
const currentLanguageSpan = document.getElementById('currentLanguage');
const body = document.getElementById('body');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const contactForm = document.querySelector('form');

// ===== EMAIL CONFIGURATION =====
// Form uses mailto fallback for direct email sending
// To enable EmailJS in the future, uncomment and configure the constants below

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // EmailJS initialization removed - using mailto fallback

    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize skill bar animations
    initializeSkillBars();
    
    // Load saved preferences
    loadPreferences();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize floating controls
    initializeFloatingControls();
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Language toggle
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (isMenuOpen && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Close modal when clicking outside
    window.addEventListener('click', handleModalClick);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);

    // Window resize and scroll handlers are now managed by throttled/debounced versions below
}

// ===== DARK MODE FUNCTIONALITY =====
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update icon
    updateDarkModeIcon();
}

function enableDarkMode() {
    body.classList.add('dark-mode');
    header.classList.add('dark-mode');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
}

function updateDarkModeIcon() {
    if (darkModeToggle) {
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-yellow-500"></i>';
        } else {
            darkModeToggle.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-gray-700"></i>';
        }
        lucide.createIcons();
    }
}

function loadPreferences() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        enableDarkMode();
        updateDarkModeIcon();
    }
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        updateLanguageDisplay();
        translatePage();
    }
}

// ===== LANGUAGE FUNCTIONALITY =====
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    updateLanguageDisplay();
    translatePage();
    localStorage.setItem('language', currentLanguage);
}

function updateLanguageDisplay() {
    if (currentLanguageSpan) {
        currentLanguageSpan.textContent = currentLanguage.toUpperCase();
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
}

function getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return null;
        }
    }
    
    return translation;
}

// ===== MOBILE MENU FUNCTIONALITY =====
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        isMenuOpen = true;
        // Update menu icon
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
            lucide.createIcons();
        }
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        isMenuOpen = false;
        // Update menu icon
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            lucide.createIcons();
        }
    }
}

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.add('fade-in');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function handleModalClick(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== SMOOTH SCROLLING =====
function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// ===== SKILL BAR ANIMATIONS =====
function initializeSkillBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

// ===== FORM VALIDATION =====
function initializeFormValidation() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Prepare email data
        const emailData = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'Karim00el@gmail.com'
        };
        
        // Use mailto for direct email sending
        const mailtoLink = `mailto:Karim00el@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(
            `Name: ${emailData.from_name}\nEmail: ${emailData.from_email}\n\nMessage:\n${emailData.message}`
        )}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        showNotification('Your email client should open. If not, please contact me directly at Karim00el@gmail.com', 'info');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    } else {
        showNotification('Please fill in all fields correctly.', 'error');
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    // Clear previous error
    clearFieldError(e);
    
    // Required field validation
    if (!value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-black');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            openModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Close mobile menu with Escape key
        if (isMenuOpen) {
            closeMobileMenu();
        }
    }
    
    // Toggle dark mode with Ctrl+D
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
}

// ===== WINDOW RESIZE HANDLER =====
function handleWindowResize() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMobileMenu();
    }
}

// ===== SCROLL HANDLER =====
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Add/remove scrolled class to header
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
window.addEventListener('scroll', throttle(handleScroll, 16));

// Debounce resize events
window.addEventListener('resize', debounce(handleWindowResize, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDarkMode = toggleDarkMode;

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Karim El Otmani's Portfolio
📧 Contact: Karim00el@gmail.com
💼 Data Specialist & Excel Master
🌐 Built with modern web technologies
`);

// ===== FLOATING CONTROLS POSITIONING =====
function initializeFloatingControls() {
    const floatingControls = document.getElementById('floatingControls');
    const header = document.getElementById('header');
    
    if (!floatingControls || !header) return;
    
    function updateFloatingControlsPosition() {
        const scrollTop = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (scrollTop > 50) {
            floatingControls.classList.add('scrolled');
        } else {
            floatingControls.classList.remove('scrolled');
        }
        
        // Fixed positioning - buttons stay at consistent position
        // CSS handles the positioning with top: 120px
    }
    
    // Update position on scroll and resize
    window.addEventListener('scroll', updateFloatingControlsPosition);
    window.addEventListener('resize', updateFloatingControlsPosition);
    
    // Initial position
    updateFloatingControlsPosition();
}
