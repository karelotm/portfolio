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
            previewResume: 'Preview Resume'
        },
        about: {
            title: "Hello, I'm Karim.",
            description: 'Passionate about problem-solving, I specialize in creating tools in Excel and Power BI to make data clear, accessible, and actionable. My goal is to build effective solutions that eliminate manual tasks, ensure reliable reporting, and provide valuable insights for business growth. Having worked at Amazon and as a freelancer, I know how to adapt to various needs and deliver concrete results.'
        },
        skills: {
            title: 'Technical Skills',
            description: 'Here are the key technologies and tools I work with to deliver exceptional results.'
        },
        projects: {
            title: 'My Main Projects',
            description: 'Here is a selection of projects that illustrate my expertise in dashboard creation, analysis, and automation.',
            p1: {
                category: 'Operational Analysis',
                title: 'Daily Performance Dashboard | Amazon',
                description: 'Created an automated dashboard to analyze team performance and detect outliers (missed calls, extended breaks). This tool allowed managers to get a comprehensive overview and drill down into details to make informed decisions.',
                skills_title: 'Key Skills:',
                skill1: 'Dashboard Building',
                skill2: 'Automation',
                skill3: 'KPI Analysis'
            },
            p2: {
                category: 'Business Intelligence',
                title: 'Sales & Conversion Tracking | Fitness Coach',
                description: 'Developed a comprehensive dashboard for a coach selling programs on Instagram. The solution tracks conversion rates by closer, identifies top-performing programs, and analyzes trends to optimize sales strategy.',
                skills_title: 'Key Skills:',
                skill1: 'Interactive Dashboard',
                skill2: 'Sales Analysis',
                skill3: 'Visualization'
            },
            p3: {
                category: 'Market Research',
                title: 'Competitive Analysis | TikTok Shop Launch',
                description: 'A scraping and analysis mission of a competitor\'s products (Lancôme) for a client launching their TikTok shop. I provided a detailed report with top-rated products and strategic proposals for their market entry.',
                skills_title: 'Key Skills:',
                skill1: 'Web Scraping',
                skill2: 'Data Analysis',
                skill3: 'Reporting'
            },
            p4: {
                category: 'Open Source',
                title: 'GitHub Portfolio | Data Projects',
                description: 'A collection of data analysis projects, Jupyter notebooks, and research prototypes showcasing my expertise in Python, data visualization, and machine learning applications.',
                skills_title: 'Key Repositories:',
                skill1: 'Jupyter Notebooks',
                skill2: 'Python',
                skill3: 'Research'
            },
            modal1: {
                title: 'Daily Performance Dashboard | Amazon',
                description: 'This comprehensive dashboard was developed to monitor team performance metrics in real-time, providing managers with actionable insights to optimize operations and identify areas for improvement.',
                features_title: 'Key Features:',
                feature1: '• Real-time performance monitoring',
                feature2: '• Automated outlier detection',
                feature3: '• Interactive drill-down capabilities',
                feature4: '• Customizable KPI tracking',
                tech_title: 'Technologies Used:',
                tech1: '• Excel with Power Query',
                tech2: '• VBA for automation',
                tech3: '• Advanced formulas',
                tech4: '• Data visualization',
                impact_title: 'Impact:',
                impact_text: 'Reduced manual reporting time by 80% and improved decision-making speed by providing instant access to performance metrics.'
            },
            modal2: {
                title: 'Sales & Conversion Tracking | Fitness Coach',
                description: 'A comprehensive business intelligence solution designed to track sales performance, conversion rates, and customer engagement across multiple Instagram campaigns and programs.',
                features_title: 'Key Features:',
                feature1: '• Conversion rate tracking by closer',
                feature2: '• Program performance analysis',
                feature3: '• Revenue trend visualization',
                feature4: '• ROI calculation tools',
                tech_title: 'Technologies Used:',
                tech1: '• Power BI',
                tech2: '• Excel Power Pivot',
                tech3: '• Data modeling',
                tech4: '• Interactive dashboards',
                impact_title: 'Impact:',
                impact_text: 'Increased conversion rates by 35% through data-driven insights and optimized sales strategies based on performance analytics.'
            },
            modal3: {
                title: 'Competitive Analysis | TikTok Shop Launch',
                description: 'Comprehensive market research and competitive analysis project for a client launching their TikTok shop, focusing on Lancôme\'s product strategy and market positioning.',
                features_title: 'Key Features:',
                feature1: '• Automated web scraping',
                feature2: '• Product performance analysis',
                feature3: '• Market trend identification',
                feature4: '• Strategic recommendations',
                tech_title: 'Technologies Used:',
                tech1: '• Python web scraping',
                tech2: '• Data analysis tools',
                tech3: '• Excel reporting',
                tech4: '• Market research methods',
                impact_title: 'Impact:',
                impact_text: 'Provided actionable market insights that informed the client\'s TikTok shop strategy, leading to a successful launch with optimized product selection.'
            },
            modal4: {
                title: 'GitHub Portfolio | Data Projects',
                description: 'A comprehensive collection of data analysis projects, research prototypes, and Jupyter notebooks showcasing expertise in Python, data visualization, and machine learning applications.',
                features_title: 'Key Repositories:',
                feature1: 'Data analysis projects',
                feature2: 'Python research prototype',
                feature3: 'This portfolio website',
                feature4: 'GitHub Pages portfolio',
                tech_title: 'Technologies Used:',
                tech1: '• Python & Jupyter Notebooks',
                tech2: '• Data visualization libraries',
                tech3: '• Machine learning frameworks',
                tech4: '• Statistical analysis tools',
                impact_title: 'Impact:',
                impact_text: 'Demonstrates continuous learning and practical application of data science concepts through real-world projects and research initiatives.',
                button: 'View All Repositories'
            }
        },
        contact: {
            title: "Let's work together",
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
            previewResume: 'Aperçu CV'
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
            description: 'Voici une sélection de projets qui illustrent mon expertise en création de tableaux de bord, analyse et automatisation.',
            p1: {
                category: 'Analyse Opérationnelle',
                title: 'Tableau de Bord de Performance | Amazon',
                description: 'Création d\'un tableau de bord automatisé pour analyser la performance des équipes et détecter les anomalies (appels manqués, pauses prolongées). Cet outil a permis aux managers d\'avoir une vue d\'ensemble et de creuser les détails pour prendre des décisions éclairées.',
                skills_title: 'Compétences Clés :',
                skill1: 'Création de Tableau de Bord',
                skill2: 'Automatisation',
                skill3: 'Analyse KPI'
            },
            p2: {
                category: 'Business Intelligence',
                title: 'Suivi des Ventes & Conversions | Coach Sportif',
                description: 'Développement d\'un tableau de bord complet pour un coach vendant des programmes sur Instagram. La solution suit les taux de conversion par closer, identifie les programmes les plus performants et analyse les tendances pour optimiser la stratégie de vente.',
                skills_title: 'Compétences Clés :',
                skill1: 'Tableau de Bord Interactif',
                skill2: 'Analyse des Ventes',
                skill3: 'Visualisation'
            },
            p3: {
                category: 'Étude de Marché',
                title: 'Analyse Concurrentielle | Lancement TikTok Shop',
                description: 'Une mission de scraping et d\'analyse des produits d\'un concurrent (Lancôme) pour un client lançant sa boutique TikTok. J\'ai fourni un rapport détaillé avec les produits les mieux notés et des propositions stratégiques pour son entrée sur le marché.',
                skills_title: 'Compétences Clés :',
                skill1: 'Web Scraping',
                skill2: 'Analyse de Données',
                skill3: 'Rapport'
            },
            p4: {
                category: 'Open Source',
                title: 'Portfolio GitHub | Projets de Données',
                description: 'Une collection de projets d\'analyse de données, de notebooks Jupyter et de prototypes de recherche mettant en valeur mon expertise en Python, visualisation de données et applications d\'apprentissage automatique.',
                skills_title: 'Dépôts Clés :',
                skill1: 'Notebooks Jupyter',
                skill2: 'Python',
                skill3: 'Recherche'
            },
            modal1: {
                title: 'Tableau de Bord de Performance Quotidienne | Amazon',
                description: 'Ce tableau de bord complet a été développé pour suivre les métriques de performance de l\'équipe en temps réel, fournissant aux managers des informations exploitables pour optimiser les opérations et identifier les domaines d\'amélioration.',
                features_title: 'Fonctionnalités Clés :',
                feature1: '• Suivi des performances en temps réel',
                feature2: '• Détection automatisée des anomalies',
                feature3: '• Capacités d\'exploration interactive',
                feature4: '• Suivi des KPI personnalisable',
                tech_title: 'Technologies Utilisées :',
                tech1: '• Excel avec Power Query',
                tech2: '• VBA pour l\'automatisation',
                tech3: '• Formules avancées',
                tech4: '• Visualisation de données',
                impact_title: 'Impact :',
                impact_text: 'Réduction du temps de reporting manuel de 80% et amélioration de la vitesse de prise de décision en fournissant un accès instantané aux métriques de performance.'
            },
            modal2: {
                title: 'Suivi des Ventes & Conversions | Coach Sportif',
                description: 'Une solution complète de business intelligence conçue pour suivre les performances des ventes, les taux de conversion et l\'engagement des clients sur plusieurs campagnes et programmes Instagram.',
                features_title: 'Fonctionnalités Clés :',
                feature1: '• Suivi du taux de conversion par closer',
                feature2: '• Analyse des performances du programme',
                feature3: '• Visualisation des tendances des revenus',
                feature4: '• Outils de calcul du ROI',
                tech_title: 'Technologies Utilisées :',
                tech1: '• Power BI',
                tech2: '• Excel Power Pivot',
                tech3: '• Modélisation des données',
                tech4: '• Tableaux de bord interactifs',
                impact_title: 'Impact :',
                impact_text: 'Augmentation des taux de conversion de 35% grâce à des informations basées sur les données et des stratégies de vente optimisées basées sur l\'analyse des performances.'
            },
            modal3: {
                title: 'Analyse Concurrentielle | Lancement TikTok Shop',
                description: 'Projet complet d\'étude de marché et d\'analyse concurrentielle pour un client lançant sa boutique TikTok, axé sur la stratégie produit et le positionnement marché de Lancôme.',
                features_title: 'Fonctionnalités Clés :',
                feature1: '• Web scraping automatisé',
                feature2: '• Analyse des performances des produits',
                feature3: '• Identification des tendances du marché',
                feature4: '• Recommandations stratégiques',
                tech_title: 'Technologies Utilisées :',
                tech1: '• Web scraping en Python',
                tech2: '• Outils d\'analyse de données',
                tech3: '• Reporting sur Excel',
                tech4: '• Méthodes d\'étude de marché',
                impact_title: 'Impact :',
                impact_text: 'Fourniture d\'informations exploitables sur le marché qui ont éclairé la stratégie de la boutique TikTok du client, menant à un lancement réussi avec une sélection de produits optimisée.'
            },
            modal4: {
                title: 'Portfolio GitHub | Projets de Données',
                description: 'Une collection complète de projets d\'analyse de données, de prototypes de recherche et de notebooks Jupyter mettant en valeur l\'expertise en Python, visualisation de données et applications d\'apprentissage automatique.',
                features_title: 'Dépôts Clés :',
                feature1: 'Projets d\'analyse de données',
                feature2: 'Prototype de recherche en Python',
                feature3: 'Ce site de portfolio',
                feature4: 'Portfolio GitHub Pages',
                tech_title: 'Technologies Utilisées :',
                tech1: '• Python & Notebooks Jupyter',
                tech2: '• Bibliothèques de visualisation de données',
                tech3: '• Frameworks d\'apprentissage automatique',
                tech4: '• Outils d\'analyse statistique',
                impact_title: 'Impact :',
                impact_text: 'Démontre un apprentissage continu et une application pratique des concepts de la science des données à travers des projets concrets et des initiatives de recherche.',
                button: 'Voir Tous les Dépôts'
            }
        },
        contact: {
            title: "Travaillons ensemble",
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
// EmailJS Configuration - All credentials are correct now
const EMAILJS_SERVICE_ID = 'service_s7tjaaj';
const EMAILJS_TEMPLATE_ID = 'template_iobj71x';
const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_fg9qnhp';
const EMAILJS_PUBLIC_KEY = 'y97WwKmCwHys-9t_K';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

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
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        // Prepare email data matching your EmailJS template variables
        const emailData = {
            name: formData.get('name'),
            title: formData.get('subject'),
            message: formData.get('message'),
            email: formData.get('email')
        };
        
        console.log('📧 Envoi des emails via EmailJS...');
        
        // Send TWO emails using Promise.all for simultaneous sending
        Promise.all([
            // Email 1: Pour VOUS (notification)
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY),
            
            // Email 2: Pour le CLIENT (confirmation)
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY)
        ])
        .then(function(responses) {
            console.log('✅ Emails envoyés avec succès!');
            console.log('   - Email de notification envoyé:', responses[0].status);
            console.log('   - Email de confirmation envoyé:', responses[1].status);
            
            showNotification('Message envoyé avec succès ! Vous recevrez une confirmation par email.', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            
            // Fallback to mailto if EmailJS fails
            const mailtoLink = `mailto:Karim00el@gmail.com?subject=${encodeURIComponent(emailData.title)}&body=${encodeURIComponent(
                `Nom: ${emailData.name}\nEmail: ${emailData.email}\n\nMessage:\n${emailData.message}`
            )}`;
            
            showNotification('Erreur d\'envoi. Ouverture de votre client email...', 'warning');
            
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 2000);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    } else {
        showNotification('Veuillez remplir tous les champs correctement.', 'error');
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

// ===== KEYBOARDNAVIGATION =====
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
✅ EmailJS configured and ready!
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
    }
    
    // Update position on scroll and resize
    window.addEventListener('scroll', updateFloatingControlsPosition);
    window.addEventListener('resize', updateFloatingControlsPosition);
    
    // Initial position
    updateFloatingControlsPosition();
}