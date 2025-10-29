// ===== PORTFOLIO MAIN JAVASCRIPT FILE =====

// ===== GLOBAL VARIABLES =====
let isDarkMode = false;
let isMenuOpen = false;
let currentLanguage = 'en';
let isChatbotOpen = false;
let isChatbotFullscreen = false;
let chatbotHistory = [];
let webhookUrl = 'https://n8n.karelotm.dev/webhook/e985d15f-b2f6-456d-be15-97e0b1544a40/chat'; // n8n webhook URL
let chatId = generateChatId(); // Generate unique chat ID for this session
let githubRepos = []; // Store fetched GitHub repositories

// ===== CHAT ID GENERATION =====
function generateChatId() {
    // Try to get existing chat ID from localStorage
    let existingChatId = localStorage.getItem('portfolioChatId');
    if (existingChatId) {
        console.log('🔄 Using existing chat ID:', existingChatId);
        return existingChatId;
    }
    
    // Generate new chat ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const newChatId = `portfolio_${timestamp}_${random}`;
    
    // Save to localStorage for persistence across page reloads
    localStorage.setItem('portfolioChatId', newChatId);
    
    console.log('🆕 Generated new chat ID:', newChatId);
    return newChatId;
}

// ===== GITHUB API INTEGRATION =====
async function fetchGitHubRepositories() {
    try {
        console.log('🔄 Fetching GitHub repositories...');
        const response = await fetch('https://api.github.com/users/karelotm/repos?sort=updated&per_page=10');
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        githubRepos = repos.filter(repo => !repo.fork && repo.name !== 'karelotm.github.io'); // Filter out forks and the GitHub Pages repo
        
        console.log('✅ Fetched GitHub repositories:', githubRepos.length);
        updateGitHubProjectCard();
        
    } catch (error) {
        console.error('❌ Error fetching GitHub repositories:', error);
        // Keep the static content if API fails
    }
}

function updateGitHubProjectCard() {
    const githubCard = document.querySelector('[onclick*="githubModal"]');
    if (!githubCard || githubRepos.length === 0) return;
    
    // Update the repository list in the modal
    const modal = document.getElementById('githubModal');
    if (!modal) return;
    
    const repoList = modal.querySelector('ul');
    if (!repoList) return;
    
    // Clear existing list items
    repoList.innerHTML = '';
    
    // Add current repositories
    githubRepos.slice(0, 6).forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `• <a href="${repo.html_url}" target="_blank" class="text-blue-600 hover:underline">${repo.name}</a> - <span>${repo.description || 'Repository'}</span>`;
        repoList.appendChild(listItem);
    });
    
    // Update repository count
    const title = modal.querySelector('h2');
    if (title) {
        title.textContent = `GitHub Portfolio | ${githubRepos.length} Active Repositories`;
    }
    
    console.log('✅ Updated GitHub project card with current repositories');
}

// ===== AUTO-UPDATE GITHUB REPOS =====
function enableGitHubAutoUpdate() {
    // Fetch repositories on page load
    fetchGitHubRepositories();
    
    // Update every 24 hours (optional)
    setInterval(fetchGitHubRepositories, 24 * 60 * 60 * 1000);
}

    // ===== IMAGE CAROUSEL SYSTEM =====
    const projectImages = {
        docuSign: [
            'assets/images/DocuSign.png'
            // Add more images here when you have them
        ],
        rag: [
            'assets/images/n8n_chatBot_Rag.png'
            // Add more images here when you have them
        ],
        lead: [
            'assets/images/New_Lead.png'
            // Add more images here when you have them
        ],
        tinyLLM: [
            'assets/images/TinyLLm.png'
            // Add more images here when you have them
            // 'assets/images/TinyLLM-dashboard.png',
            // 'assets/images/TinyLLM-chat.png',
            // 'assets/images/TinyLLM-progress.png'
        ]
    };

    const currentImageIndex = {
        docuSign: 0,
        rag: 0,
        lead: 0,
        tinyLLM: 0
    };

function changeImage(project, direction) {
    const images = projectImages[project];
    if (!images || images.length <= 1) return;
    
    currentImageIndex[project] += direction;
    
    // Loop around
    if (currentImageIndex[project] >= images.length) {
        currentImageIndex[project] = 0;
    } else if (currentImageIndex[project] < 0) {
        currentImageIndex[project] = images.length - 1;
    }
    
    // Update image - handle different project naming conventions
    const imageElement = document.getElementById(`${project}Image`);
    const counterElement = document.getElementById(`imageCounter${project.charAt(0).toUpperCase() + project.slice(1)}`);
    
    if (imageElement) {
        imageElement.style.opacity = '0';
        setTimeout(() => {
            imageElement.src = images[currentImageIndex[project]];
            imageElement.style.opacity = '1';
        }, 150);
    }
    
    if (counterElement) {
        counterElement.textContent = `${currentImageIndex[project] + 1} / ${images.length}`;
    }
    
    // Update navigation buttons visibility
    updateNavigationButtons(project);
}

function updateNavigationButtons(project) {
    const images = projectImages[project];
    const prevBtn = document.getElementById(`prevImage${project.charAt(0).toUpperCase() + project.slice(1)}`);
    const nextBtn = document.getElementById(`nextImage${project.charAt(0).toUpperCase() + project.slice(1)}`);
    
    // Only hide image navigation buttons if there's only one image
    // Modal navigation buttons should always be visible
    if (images && images.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    } else if (images && images.length > 1) {
        if (prevBtn) prevBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
    }
    
    // Ensure modal navigation buttons are always visible
    const modalPrevBtn = document.querySelector('.modal-prev');
    const modalNextBtn = document.querySelector('.modal-next');
    if (modalPrevBtn) modalPrevBtn.style.display = 'flex';
    if (modalNextBtn) modalNextBtn.style.display = 'flex';
}

function openImageFullscreen(project) {
    const images = projectImages[project];
    const currentIndex = currentImageIndex[project];
    const currentImage = images[currentIndex];
    
        // Create fullscreen overlay
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.id = 'imageFullscreenOverlay';
        fullscreenOverlay.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center';
        fullscreenOverlay.style.zIndex = '99999'; // Higher than modal z-index
        fullscreenOverlay.onclick = closeImageFullscreen;
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative max-w-7xl max-h-full p-4';
    imageContainer.onclick = (e) => e.stopPropagation();
    
    // Create image
    const fullscreenImage = document.createElement('img');
    fullscreenImage.src = currentImage;
    fullscreenImage.alt = 'Fullscreen project image';
    fullscreenImage.className = 'max-w-full max-h-full object-contain';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    closeBtn.className = 'absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all';
    closeBtn.onclick = closeImageFullscreen;
    
    // Create navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-8 h-8"></i>';
    prevBtn.className = 'absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all';
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        changeFullscreenImage(project, -1);
    };
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-8 h-8"></i>';
    nextBtn.className = 'absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all';
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        changeFullscreenImage(project, 1);
    };
    
    // Create image counter
    const counter = document.createElement('div');
    counter.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-lg';
    counter.innerHTML = `<span id="fullscreenCounter">${currentIndex + 1} / ${images.length}</span>`;
    
    // Assemble the fullscreen view
    imageContainer.appendChild(fullscreenImage);
    imageContainer.appendChild(closeBtn);
    imageContainer.appendChild(prevBtn);
    imageContainer.appendChild(nextBtn);
    imageContainer.appendChild(counter);
    fullscreenOverlay.appendChild(imageContainer);
    
    // Add to page
    document.body.appendChild(fullscreenOverlay);
    document.body.style.overflow = 'hidden';
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Store reference for navigation
    fullscreenOverlay.project = project;
    fullscreenOverlay.imageElement = fullscreenImage;
    fullscreenOverlay.counterElement = counter.querySelector('#fullscreenCounter');
}

function changeFullscreenImage(project, direction) {
    const images = projectImages[project];
    currentImageIndex[project] += direction;
    
    // Loop around
    if (currentImageIndex[project] >= images.length) {
        currentImageIndex[project] = 0;
    } else if (currentImageIndex[project] < 0) {
        currentImageIndex[project] = images.length - 1;
    }
    
    // Update fullscreen image
    const overlay = document.getElementById('imageFullscreenOverlay');
    if (overlay && overlay.imageElement && overlay.counterElement) {
        overlay.imageElement.style.opacity = '0';
        setTimeout(() => {
            overlay.imageElement.src = images[currentImageIndex[project]];
            overlay.imageElement.style.opacity = '1';
            overlay.counterElement.textContent = `${currentIndex[project] + 1} / ${images.length}`;
        }, 150);
    }
    
        // Update modal image too
        const modalImage = document.getElementById(`${project}Image`);
        const modalCounter = document.getElementById(`imageCounter${project.charAt(0).toUpperCase() + project.slice(1)}`);
        if (modalImage) {
            modalImage.src = images[currentImageIndex[project]];
        }
        if (modalCounter) {
            modalCounter.textContent = `${currentImageIndex[project] + 1} / ${images.length}`;
        }
}

function closeImageFullscreen() {
    const overlay = document.getElementById('imageFullscreenOverlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

    // Keyboard navigation for fullscreen and modals
    document.addEventListener('keydown', (e) => {
        const overlay = document.getElementById('imageFullscreenOverlay');
        if (overlay) {
            // Fullscreen image navigation
            if (e.key === 'Escape') {
                closeImageFullscreen();
            } else if (e.key === 'ArrowLeft') {
                const project = overlay.project;
                changeFullscreenImage(project, -1);
            } else if (e.key === 'ArrowRight') {
                const project = overlay.project;
                changeFullscreenImage(project, 1);
            }
        } else {
            // Modal navigation
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                if (e.key === 'ArrowLeft') {
                    navigateModal('prev');
                } else if (e.key === 'ArrowRight') {
                    navigateModal('next');
                }
            }
        }
    });

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
            },
            p5: {
                category: 'Process Automation',
                title: 'Document Signature & Notification Workflow',
                description: 'Automated the entire document signature process by integrating Notion, DocuSign, and WhatsApp. When a contract status changes to "Ready for Signature" in Notion, the system automatically generates and sends DocuSign envelopes, then notifies stakeholders via WhatsApp.',
                skills_title: 'Key Skills:',
                skill1: 'n8n Workflows',
                skill2: 'API Integration',
                skill3: 'Process Automation'
            },
            p6: {
                category: 'AI & Machine Learning',
                title: 'RAG AI Chatbot with Automated Knowledge Base',
                description: 'Built a sophisticated two-part RAG (Retrieval-Augmented Generation) system that automatically syncs documents from Google Drive, processes them into vector embeddings, and creates an intelligent chatbot that answers questions based on the specific knowledge base.',
                skills_title: 'Key Skills:',
                skill1: 'RAG Architecture',
                skill2: 'Vector Databases',
                skill3: 'AI Integration'
            },
            p7: {
                category: 'Sales Automation',
                title: 'AI-Powered Lead Processing & Routing',
                description: 'Created an intelligent lead processing system that captures leads from Tally forms, uses AI to analyze and categorize them, then automatically routes high-priority leads to the sales team via Slack while logging all leads in Notion CRM.',
                skills_title: 'Key Skills:',
                skill1: 'Lead Scoring',
                skill2: 'CRM Integration',
                skill3: 'Conditional Logic'
            },
            p8: {
                category: 'AI Education Platform',
                title: 'Tiny-LLM Learning - Personalized AI Tutor',
                description: 'A web-based personalized learning platform that helps students study, track progress, and interact with an AI-powered tutor. Features a central dashboard as the student\'s "home base" for all learning activities, powered by a custom fine-tuned tiny-Language Model.',
                skills_title: 'Key Skills:',
                skill1: 'AI/ML Integration',
                skill2: 'Web Development',
                skill3: 'Educational Technology'
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
            },
            p5: {
                category: 'Automatisation de Processus',
                title: 'Workflow de Signature de Documents & Notifications',
                description: 'Automatisé l\'ensemble du processus de signature de documents en intégrant Notion, DocuSign et WhatsApp. Quand le statut d\'un contrat change à "Prêt pour Signature" dans Notion, le système génère et envoie automatiquement des enveloppes DocuSign, puis notifie les parties prenantes via WhatsApp.',
                skills_title: 'Compétences Clés :',
                skill1: 'Workflows n8n',
                skill2: 'Intégration API',
                skill3: 'Automatisation de Processus'
            },
            p6: {
                category: 'IA & Machine Learning',
                title: 'Chatbot RAG IA avec Base de Connaissances Automatisée',
                description: 'Construit un système RAG (Retrieval-Augmented Generation) sophistiqué en deux parties qui synchronise automatiquement les documents depuis Google Drive, les traite en embeddings vectoriels, et crée un chatbot intelligent qui répond aux questions basées sur la base de connaissances spécifique.',
                skills_title: 'Compétences Clés :',
                skill1: 'Architecture RAG',
                skill2: 'Bases de Données Vectorielles',
                skill3: 'Intégration IA'
            },
            p7: {
                category: 'Automatisation Commerciale',
                title: 'Traitement & Routage de Prospects Alimenté par l\'IA',
                description: 'Créé un système intelligent de traitement de prospects qui capture les leads depuis les formulaires Tally, utilise l\'IA pour les analyser et les catégoriser, puis route automatiquement les prospects prioritaires vers l\'équipe commerciale via Slack tout en enregistrant tous les leads dans le CRM Notion.',
                skills_title: 'Compétences Clés :',
                skill1: 'Scoring de Prospects',
                skill2: 'Intégration CRM',
                skill3: 'Logique Conditionnelle'
            },
            p8: {
                category: 'Plateforme d\'Éducation IA',
                title: 'Tiny-LLM Learning - Tuteur IA Personnalisé',
                description: 'Une plateforme d\'apprentissage personnalisée basée sur le web qui aide les étudiants à étudier, suivre leurs progrès et interagir avec un tuteur alimenté par l\'IA. Comprend un tableau de bord central qui sert de "base d\'accueil" pour toutes les activités d\'apprentissage, alimenté par un petit modèle de langage personnalisé et affiné.',
                skills_title: 'Compétences Clés :',
                skill1: 'Intégration IA/ML',
                skill2: 'Développement Web',
                skill3: 'Technologie Éducative'
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

// Chatbot elements
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotFullscreen = document.getElementById('chatbotFullscreen');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessagesContainer = document.getElementById('chatbotMessages');
const chatbotTyping = document.getElementById('chatbotTyping');

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
    
    // Initialize chatbot
    initializeChatbot();
    
    // Initialize GitHub auto-update
    enableGitHubAutoUpdate();
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

    // Chatbot event listeners
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', closeChatbot);
    }

    if (chatbotFullscreen) {
        chatbotFullscreen.addEventListener('click', toggleChatbotFullscreen);
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendChatbotMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', handleChatbotKeypress);
        chatbotInput.addEventListener('input', handleChatbotInput);
    }
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
// Define modal order for navigation (matches project order)
const modalOrder = ['amazonModal', 'fitnessModal', 'tiktokModal', 'githubModal', 'docuSignModal', 'ragModal', 'leadModal', 'tinyLLMModal'];
let currentModalIndex = 0;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Update current modal index
        currentModalIndex = modalOrder.indexOf(modalId);
        
        // Add backdrop fade animation
        modal.classList.add('modal-backdrop-fade');
        
        // Add opening animation to modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            // Remove any existing animation classes
            modalContent.classList.remove('fade-in', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            // Add opening animation
            modalContent.classList.add('modal-open');
        }
        
        // Initialize image carousel for projects with images
        if (modalId === 'docuSignModal') {
            updateNavigationButtons('docuSign');
        } else if (modalId === 'ragModal') {
            updateNavigationButtons('rag');
        } else if (modalId === 'leadModal') {
            updateNavigationButtons('lead');
        } else if (modalId === 'tinyLLMModal') {
            updateNavigationButtons('tinyLLM');
        }
        
        // Ensure modal navigation buttons are always visible
        ensureModalNavigationVisible();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Remove animation classes
        modal.classList.remove('modal-backdrop-fade');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('modal-open', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        }
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function ensureModalNavigationVisible() {
    // Ensure all modal navigation buttons are visible
    const modalPrevBtns = document.querySelectorAll('.modal-prev');
    const modalNextBtns = document.querySelectorAll('.modal-next');
    
    modalPrevBtns.forEach(btn => {
        if (btn) {
            btn.style.display = 'flex';
        }
    });
    
    modalNextBtns.forEach(btn => {
        if (btn) {
            btn.style.display = 'flex';
        }
    });
}

function navigateModal(direction) {
    // Close current modal with animation
    const currentModal = document.getElementById(modalOrder[currentModalIndex]);
    if (currentModal) {
        const currentModalContent = currentModal.querySelector('.modal-content');
        if (currentModalContent) {
            // Add exit animation
            if (direction === 'next') {
                currentModalContent.classList.add('slide-out-left');
            } else if (direction === 'prev') {
                currentModalContent.classList.add('slide-out-right');
            }
        }
    }
    
    // Calculate next modal index
    if (direction === 'next') {
        currentModalIndex = (currentModalIndex + 1) % modalOrder.length;
    } else if (direction === 'prev') {
        currentModalIndex = (currentModalIndex - 1 + modalOrder.length) % modalOrder.length;
    }
    
    // Open next modal with animation after a short delay
    setTimeout(() => {
        // Close current modal
        if (currentModal) {
            currentModal.style.display = 'none';
            currentModal.classList.remove('modal-backdrop-fade');
            const currentModalContent = currentModal.querySelector('.modal-content');
            if (currentModalContent) {
                // Remove all animation classes
                currentModalContent.classList.remove('modal-open', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
            }
        }
        
        // Open next modal
        const nextModal = document.getElementById(modalOrder[currentModalIndex]);
        if (nextModal) {
            nextModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add backdrop fade animation
            nextModal.classList.add('modal-backdrop-fade');
            
            // Add animation class based on direction
            const modalContent = nextModal.querySelector('.modal-content');
            if (modalContent) {
                if (direction === 'next') {
                    modalContent.classList.add('slide-in-right');
                } else if (direction === 'prev') {
                    modalContent.classList.add('slide-in-left');
                }
            }
            
            // Initialize image carousel for the new modal
            const modalId = modalOrder[currentModalIndex];
            if (modalId === 'docuSignModal') {
                updateNavigationButtons('docuSign');
            } else if (modalId === 'ragModal') {
                updateNavigationButtons('rag');
            } else if (modalId === 'leadModal') {
                updateNavigationButtons('lead');
            } else if (modalId === 'tinyLLMModal') {
                updateNavigationButtons('tinyLLM');
            }
            
            // Ensure modal navigation buttons are always visible
            ensureModalNavigationVisible();
        }
    }, 300); // Wait for exit animation to complete
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
        
        // Exit chatbot fullscreen with Escape key
        if (isChatbotFullscreen) {
            toggleChatbotFullscreen();
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

// ===== CHATBOT FUNCTIONALITY =====
function initializeChatbot() {
    // Hide notification dot initially
    const notificationDot = document.querySelector('.chatbot-notification-dot');
    if (notificationDot) {
        notificationDot.style.display = 'none';
    }
    
    // Load saved chat history
    loadChatHistory();
    
    // Show welcome message if no previous messages
    if (chatbotHistory.length === 0) {
        addBotMessage("Hello! I'm Karim's personal assistant. I'm here to help you with any questions regarding Karim's expertise, projects, and services. How can I assist you today?");
    }
}

function toggleChatbot() {
    if (isChatbotOpen) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function openChatbot() {
    if (chatbotWindow) {
        chatbotWindow.classList.add('active');
        isChatbotOpen = true;
        
        // Hide notification dot
        const notificationDot = document.querySelector('.chatbot-notification-dot');
        if (notificationDot) {
            notificationDot.style.display = 'none';
        }
        
        // Focus on input
        if (chatbotInput) {
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);
        }
        
        // Scroll to bottom
        scrollToBottom();
    }
}

function closeChatbot() {
    if (chatbotWindow) {
        chatbotWindow.classList.remove('active');
        isChatbotOpen = false;
    }
}

function toggleChatbotFullscreen() {
    if (!chatbotWindow) return;
    
    isChatbotFullscreen = !isChatbotFullscreen;
    
    if (isChatbotFullscreen) {
        // Enter fullscreen mode
        chatbotWindow.classList.add('fullscreen');
        updateFullscreenIcon();
        
        // Prevent body scroll when in fullscreen
        document.body.style.overflow = 'hidden';
        
        console.log('🔍 Chatbot entered fullscreen mode');
    } else {
        // Exit fullscreen mode
        chatbotWindow.classList.remove('fullscreen');
        updateFullscreenIcon();
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        console.log('🔍 Chatbot exited fullscreen mode');
    }
}

function updateFullscreenIcon() {
    if (!chatbotFullscreen) return;
    
    // Clear all existing icons first
    chatbotFullscreen.innerHTML = '';
    
    if (isChatbotFullscreen) {
        // Show minimize icon
        const minimizeIcon = document.createElement('i');
        minimizeIcon.setAttribute('data-lucide', 'minimize');
        minimizeIcon.className = 'w-4 h-4';
        chatbotFullscreen.appendChild(minimizeIcon);
    } else {
        // Show maximize icon
        const maximizeIcon = document.createElement('i');
        maximizeIcon.setAttribute('data-lucide', 'maximize');
        maximizeIcon.className = 'w-4 h-4';
        chatbotFullscreen.appendChild(maximizeIcon);
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function handleChatbotKeypress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatbotMessage();
    }
}

function handleChatbotInput(e) {
    const input = e.target;
    const sendButton = chatbotSend;
    
    if (input.value.trim()) {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
}

function sendChatbotMessage() {
    const input = chatbotInput;
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    input.value = '';
    chatbotSend.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to webhook or show default response
    if (webhookUrl) {
        sendToWebhook(message);
    } else {
        // Default response when no webhook is configured
        setTimeout(() => {
            hideTypingIndicator();
            addBotMessage("I'm currently being set up with an AI agent. Please check back soon or contact Karim directly at Karim00el@gmail.com for immediate assistance!");
        }, 1500);
    }
}

function addUserMessage(message) {
    const messageElement = createMessageElement('user', message);
    chatbotMessagesContainer.appendChild(messageElement);
    scrollToBottom();
    
    // Save to history
    chatbotHistory.push({
        type: 'user',
        message: message,
        timestamp: new Date().toISOString()
    });
    saveChatHistory();
}

function addBotMessage(message) {
    const messageElement = createMessageElement('bot', message);
    chatbotMessagesContainer.appendChild(messageElement);
    scrollToBottom();
    
    // Save to history
    chatbotHistory.push({
        type: 'bot',
        message: message,
        timestamp: new Date().toISOString()
    });
    saveChatHistory();
}

function createMessageElement(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = type === 'bot' ? '<i data-lucide="bot" class="w-4 h-4"></i>' : '<i data-lucide="user" class="w-4 h-4"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Create message content with proper formatting
    const messageContent = document.createElement('div');
    messageContent.className = 'message-text';
    
    if (type === 'bot') {
        // Format bot messages with markdown-like rendering
        messageContent.innerHTML = formatBotMessage(message);
    } else {
        // User messages remain as plain text
        messageContent.textContent = message;
    }
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = getCurrentTime();
    
    contentDiv.appendChild(messageContent);
    contentDiv.appendChild(timeSpan);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    // Re-initialize Lucide icons for new elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    return messageDiv;
}

function formatBotMessage(message) {
    // Convert markdown-like formatting to HTML
    let formatted = message
        // Bold text: **text** -> <strong>text</strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic text: *text* -> <em>text</em>
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Line breaks: \n -> <br>
        .replace(/\n/g, '<br>')
        // Bullet points: *   -> •
        .replace(/^\*   /gm, '• ')
        // Nested bullet points: *   *   -> ◦
        .replace(/^\*   \*   /gm, '◦ ')
        // Triple nested: *   *   *   -> ▪
        .replace(/^\*   \*   \*   /gm, '▪ ');
    
    return formatted;
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showTypingIndicator() {
    if (chatbotTyping) {
        chatbotTyping.style.display = 'flex';
        scrollToBottom();
    }
}

function hideTypingIndicator() {
    if (chatbotTyping) {
        chatbotTyping.style.display = 'none';
    }
}

function scrollToBottom() {
    if (chatbotMessagesContainer) {
        chatbotMessagesContainer.scrollTop = chatbotMessagesContainer.scrollHeight;
    }
}

function sendToWebhook(message) {
    const payload = {
        message: message,
        chatId: chatId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    console.log('📤 Sending to webhook:', webhookUrl);
    console.log('📤 Payload:', payload);
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        console.log('📥 Response status:', response.status);
        console.log('📥 Response headers:', response.headers);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Try to get response as text first, then try JSON
        return response.text().then(text => {
            console.log('📥 Raw response:', text);
            
            // Try to parse as JSON
            try {
                const jsonData = JSON.parse(text);
                console.log('📥 Parsed JSON:', jsonData);
                return jsonData;
            } catch (e) {
                console.log('📥 Response is plain text:', text);
                return text;
            }
        });
    })
    .then(data => {
        hideTypingIndicator();
        
        // Handle different response formats
        let botResponse = '';
        if (typeof data === 'string') {
            botResponse = data;
        } else if (data.output) {
            botResponse = data.output;
        } else if (data.message) {
            botResponse = data.message;
        } else if (data.response) {
            botResponse = data.response;
        } else if (data.text) {
            botResponse = data.text;
        } else if (data.reply) {
            botResponse = data.reply;
        } else if (data.answer) {
            botResponse = data.answer;
        } else {
            console.log('📥 Unknown response format:', data);
            botResponse = "I received your message but couldn't process the response format. Please try again.";
        }
        
        console.log('📥 Bot response:', botResponse);
        addBotMessage(botResponse);
    })
    .catch(error => {
        console.error('Webhook error:', error);
        hideTypingIndicator();
        addBotMessage("I'm having trouble connecting to my AI service right now. Please try again later or contact Karim directly at Karim00el@gmail.com.");
    });
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chatbotHistory');
        if (saved) {
            chatbotHistory = JSON.parse(saved);
            
            // Re-render messages
            if (chatbotHistory && chatbotHistory.length > 0) {
                chatbotHistory.forEach(msg => {
                    const messageElement = createMessageElement(msg.type, msg.message);
                    chatbotMessagesContainer.appendChild(messageElement);
                });
            }
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        chatbotHistory = [];
    }
}

function saveChatHistory() {
    try {
        localStorage.setItem('chatbotHistory', JSON.stringify(chatbotHistory));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
}

function clearChatHistory() {
    chatbotHistory = [];
    if (chatbotMessagesContainer) {
        chatbotMessagesContainer.innerHTML = '';
    }
    localStorage.removeItem('chatbotHistory');
    addBotMessage("Chat history cleared. How can I help you today?");
}

// Function to set webhook URL (call this when you have your AI agent ready)
function setChatbotWebhook(url) {
    webhookUrl = url;
    console.log('Chatbot webhook set to:', url);
}

// Function to show notification dot
function showChatbotNotification() {
    const notificationDot = document.querySelector('.chatbot-notification-dot');
    if (notificationDot) {
        notificationDot.style.display = 'block';
    }
}

// Export chatbot functions for global use
window.setChatbotWebhook = setChatbotWebhook;
window.clearChatHistory = clearChatHistory;
window.showChatbotNotification = showChatbotNotification;

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Karim El Otmani's Portfolio
📧 Contact: Karim00el@gmail.com
💼 Data Specialist & Excel Master
🌐 Built with modern web technologies
✅ EmailJS configured and ready!
🤖 Chatbot ready! Use setChatbotWebhook(url) to connect your AI agent
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