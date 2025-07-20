// Gestion des témoignages - données
const testimonials = {
    sophie: {
        name: "Sophie M.",
        title: "Créatrice Top 1% - Accompagnée par Antoine",
        avatar: "S",
        quote: "Travailler avec Antoine a été la meilleure décision de ma carrière ! En tant que fondateur de SynAgency, il m'a personnellement accompagnée de 500€ à 18k€ par mois en 6 mois. Son expertise et l'équipe qu'il a créée sont exceptionnelles. Antoine combine vision stratégique et suivi personnalisé. Un vrai leader !",
        stats: [
            { value: "300%", label: "Augmentation revenus" },
            { value: "Top 1%", label: "Classement atteint" },
            { value: "18k€", label: "Revenus mensuels" },
            { value: "Antoine", label: "Accompagnement direct" }
        ]
    },
    emma: {
        name: "Emma L.",
        title: "Success Story - Guidée par Antoine (SynAgency)",
        avatar: "E",
        quote: "Antoine est un fondateur incroyable ! En créant SynAgency, il a révolutionné le secteur. Son approche personnelle combinée à son équipe d'experts m'a menée de débutante à 10k abonnés en 1 an. Antoine suit personnellement les stratégies et ça fait toute la différence. Un vrai visionnaire !",
        stats: [
            { value: "10k+", label: "Abonnés fidèles" },
            { value: "0 → 6k€", label: "Évolution mensuelle" },
            { value: "90%", label: "Taux de rétention" },
            { value: "Antoine", label: "Suivi personnel" }
        ]
    },
    lea: {
        name: "Léa R.",
        title: "Optimisation Pro - Stratégies d'Antoine",
        avatar: "L",
        quote: "L'audit d'Antoine et de son équipe SynAgency a complètement transformé mon business ! En tant que fondateur, il a une vision unique du secteur. Ses stratégies personnalisées m'ont permis de doubler mes revenus en 3 mois. Antoine reste impliqué personnellement, c'est ça la force de SynAgency !",
        stats: [
            { value: "+200%", label: "Croissance revenus" },
            { value: "3 mois", label: "Délai résultats" },
            { value: "Top 3%", label: "Nouveau classement" },
            { value: "Antoine", label: "Stratégies personnelles" }
        ]
    }
};

// Gestion des témoignages - fonctions
function setupTestimonials() {
    const testimonialButtons = document.querySelectorAll('[data-testimonial]');
    const modal = document.getElementById('testimonial-modal');
    
    if (!modal) {
        console.error('Modal de témoignage non trouvé');
        return;
    }
    
    const modalContent = modal.querySelector('.testimonial-content');
    const closeBtn = modal.querySelector('.modal-close');

    if (!modalContent || !closeBtn) {
        console.error('Éléments de modal manquants');
        return;
    }

    testimonialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const testimonialId = button.getAttribute('data-testimonial');
            if (testimonialId) {
                showTestimonial(testimonialId);
            }
        });
    });

    function showTestimonial(id) {
        const testimonial = testimonials[id];
        if (!testimonial) {
            console.error('Témoignage non trouvé:', id);
            return;
        }

        const testimonialHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${testimonial.avatar}</div>
                <h2 class="testimonial-name">${testimonial.name}</h2>
                <p class="testimonial-title">${testimonial.title}</p>
            </div>
            <div class="testimonial-quote">
                "${testimonial.quote}"
            </div>
            <div class="testimonial-stats">
                ${testimonial.stats.map(stat => `
                    <div class="testimonial-stat">
                        <span class="testimonial-stat-value">${stat.value}</span>
                        <div class="testimonial-stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
        `;

        modalContent.innerHTML = testimonialHTML;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Système de gestion des tarifs - facilement modifiable
const PricingManager = {
    // Changer le pourcentage facilement
    setPercentage: function(newPercentage) {
        // Valider le pourcentage
        newPercentage = Math.max(20, Math.min(50, parseInt(newPercentage)));
        
        const percentageElement = document.getElementById('pricing-percentage');
        const cardSliderElement = document.getElementById('pricing-card-slider');
        const cardSliderValueElement = document.getElementById('card-slider-value');
        
        if (percentageElement) {
            percentageElement.textContent = newPercentage + '%';
        }
        
        // Mettre à jour le slider de la carte
        if (cardSliderElement && cardSliderValueElement) {
            cardSliderElement.value = newPercentage;
            cardSliderValueElement.textContent = newPercentage + '%';
        }
        
        // Gérer l'affichage des fonctionnalités selon le tarif
        this.updateFeatureDisplay(newPercentage);
        
        // Sauvegarder dans localStorage pour persistance
        localStorage.setItem('synagency-pricing', newPercentage);
        
        console.log(`Tarif mis à jour: ${newPercentage}%`);
    },

    // Mettre à jour l'affichage des fonctionnalités selon le tarif
    updateFeatureDisplay: function(percentage) {
        const features = [
            'feature-optimization',
            'feature-copyright',
            'feature-chat', 
            'feature-analytics',
            'feature-campaigns',
            'feature-support',
            'feature-advice'
        ];

        // Fonctionnalités qui restent vertes même à bas tarif
        const alwaysIncluded = [
            'feature-optimization',
            'feature-copyright',
            'feature-chat',
            'feature-analytics', 
            'feature-campaigns'
        ];

        features.forEach(featureId => {
            const featureElement = document.getElementById(featureId);
            if (featureElement) {
                const icon = featureElement.querySelector('i');
                const currentClass = icon.className;
                let newClass, newColor, newOpacity;
                
                if (percentage >= 20 && percentage <= 30 && !alwaysIncluded.includes(featureId)) {
                    // Fonctionnalités premium non incluses à bas tarif (20-30%)
                    newClass = 'fas fa-times';
                    newColor = '#ef4444';
                    newOpacity = '0.6';
                } else if (percentage >= 30 && percentage < 40 && !alwaysIncluded.includes(featureId)) {
                    // Support et Conseils non inclus entre 30-40%
                    newClass = 'fas fa-times';
                    newColor = '#ef4444';
                    newOpacity = '0.6';
                } else if (percentage >= 40 && percentage < 50 && featureId === 'feature-advice') {
                    // Conseils personnalisés non inclus entre 40-50%
                    newClass = 'fas fa-times';
                    newColor = '#ef4444';
                    newOpacity = '0.6';
                } else {
                    // Fonctionnalités incluses
                    newClass = 'fas fa-check';
                    newColor = '#22c55e';
                    newOpacity = '1';
                }

                // Animation fluide si l'icône change
                if (currentClass !== newClass) {
                    // Animation de sortie
                    icon.style.animation = 'iconChange 0.4s ease-in-out';
                    
                    setTimeout(() => {
                        // Changer l'icône au milieu de l'animation
                        icon.className = newClass;
                        icon.style.color = newColor;
                        featureElement.style.opacity = newOpacity;
                        
                        // Réinitialiser l'animation après un délai
                        setTimeout(() => {
                            icon.style.animation = '';
                        }, 50);
                    }, 200);
                } else {
                    // Pas de changement d'icône, juste mettre à jour les couleurs
                    icon.style.color = newColor;
                    featureElement.style.opacity = newOpacity;
                }
            }
        });
    },
    
    // Récupérer le pourcentage actuel
    getCurrentPercentage: function() {
        const saved = localStorage.getItem('synagency-pricing');
        return saved ? parseInt(saved) : 40; // 40% par défaut
    },
    
    // Initialiser avec le tarif sauvegardé
    init: function() {
        console.log('Début initialisation PricingManager...');
        
        // Attendre que le DOM soit complètement chargé
        const initializeSlider = () => {
            const savedPercentage = this.getCurrentPercentage();
            console.log('Initialisation PricingManager avec:', savedPercentage + '%');
            
            // Vérifier que les éléments existent
            const percentageElement = document.getElementById('pricing-percentage');
            const cardSliderElement = document.getElementById('pricing-card-slider');
            const cardSliderValueElement = document.getElementById('card-slider-value');
            
            console.log('Éléments trouvés:', {
                percentage: !!percentageElement,
                slider: !!cardSliderElement,
                value: !!cardSliderValueElement
            });
            
            if (percentageElement && cardSliderElement && cardSliderValueElement) {
                this.setPercentage(savedPercentage);
                this.initSlider();
                console.log('PricingManager initialisé avec succès');
            } else {
                console.error('Éléments de tarification manquants, nouvelle tentative dans 500ms...');
                setTimeout(initializeSlider, 500);
            }
        };
        
        setTimeout(initializeSlider, 200);
    },

    // Initialiser le slider dans la navigation
    initSlider: function() {
        // Attendre que tous les éléments soient disponibles
        setTimeout(() => {
            // Slider dans la carte tarifaire seulement (plus de slider navigation)
            const cardSlider = document.getElementById('pricing-card-slider');
            const cardSliderValue = document.getElementById('card-slider-value');
            
            if (cardSlider && cardSliderValue) {
                console.log('Éléments du slider trouvés, initialisation...');
                
                // Ajouter l'événement input pour le slider
                cardSlider.addEventListener('input', (e) => {
                    const newValue = parseInt(e.target.value);
                    cardSliderValue.textContent = newValue + '%';
                    PricingManager.setPercentage(newValue);
                    console.log('Slider changé vers:', newValue + '%');
                });

                // Effet visuel sur le slider de la carte
                cardSlider.addEventListener('mouseover', () => {
                    cardSlider.style.background = 'linear-gradient(to right, #2563eb 0%, #1e40af 100%)';
                });

                cardSlider.addEventListener('mouseout', () => {
                    cardSlider.style.background = '#e5e7eb';
                });
                
                console.log('Slider de tarification initialisé avec succès');
            } else {
                console.warn('Éléments du slider de tarification non trouvés:', {
                    cardSlider: !!cardSlider,
                    cardSliderValue: !!cardSliderValue
                });
            }
        }, 100);
    }
};

// Navigation mobile
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation scroll smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Vérifier que le href n'est pas juste "#"
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Effet de scroll sur la navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// INITIALISATION PRINCIPALE - UN SEUL DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du site...');
    
    // 1. Animation des éléments au scroll
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 2. Animation spéciale pour les éléments de contact Instagram
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('contact-item-animated');
    });

    // 3. Gestion du menu contextuel Instagram
    setupInstagramMenu();

    // 4. Gestion des témoignages
    setupTestimonials();

    // 5. Initialiser le système de tarifs
    PricingManager.init();

    // 6. Observer les statistiques
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // 7. Effets de parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 8. Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // 9. Créer les particules
    createParticles();

    // 10. Lazy loading pour les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        lazyLoadObserver.observe(section);
    });

    // 11. Backup slider (si l'init principale échoue)
    setTimeout(() => {
        const slider = document.getElementById('pricing-card-slider');
        const valueDisplay = document.getElementById('card-slider-value');
        
        if (slider && valueDisplay && !slider.dataset.initialized) {
            console.log('⚡ Initialisation backup du slider...');
            slider.addEventListener('input', function(e) {
                const newValue = parseInt(e.target.value);
                valueDisplay.textContent = newValue + '%';
                const percentage = document.getElementById('pricing-percentage');
                if (percentage) percentage.textContent = newValue + '%';
                console.log('Slider backup:', newValue + '%');
            });
            slider.dataset.initialized = 'true';
            console.log('✅ Slider backup initialisé');
        }
    }, 1000);

    console.log('✅ Initialisation terminée');
});

// Configuration du menu contextuel Instagram
function setupInstagramMenu() {
    const contactItems = document.querySelectorAll('.contact-item');
    const instagramMenu = document.getElementById('instagram-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    let currentInstagram = '';

    // Ouvrir directement Instagram avec animation quand on clique sur un compte
    contactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const instagram = item.getAttribute('data-instagram');
            
            if (instagram) {
                currentInstagram = instagram;
                
                // Ouvrir le menu en mode chargement directement
                menuOverlay.classList.add('active');
                instagramMenu.classList.add('active');
                
                // Démarrer immédiatement l'animation de chargement
                showSimpleLoading();
                
                // Check vert après 1.2 secondes, puis redirection
                setTimeout(() => {
                    showSuccessCheck();
                    
                    // Redirection après le check
                    setTimeout(() => {
                        window.open(`https://instagram.com/${currentInstagram}`, '_blank');
                        closeInstagramMenu();
                    }, 800);
                }, 1200);
                
                // Effet visuel sur le bouton cliqué
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            }
        });
    });

    function showSimpleLoading() {
        const menuContent = document.querySelector('.menu-content');
        const loadingSpinner = document.querySelector('.loading-spinner');
        const loadingText = document.querySelector('.loading-text');
        
        // Animation simple et fluide
        menuContent.style.transition = 'opacity 0.3s ease';
        menuContent.style.opacity = '0.3';
        
        // Afficher le spinner simple
        loadingSpinner.style.display = 'flex';
        loadingSpinner.innerHTML = '';
        loadingSpinner.style.animation = 'spin 1s linear infinite';
        
        // Masquer le texte de chargement
        loadingText.style.display = 'none';
    }

    function showSuccessCheck() {
        const loadingSpinner = document.querySelector('.loading-spinner');
        const loadingText = document.querySelector('.loading-text');
        
        // Ajouter la classe success pour transformer le spinner
        loadingSpinner.classList.add('success');
        loadingSpinner.style.animation = 'successPulse 0.6s ease-out';
        loadingSpinner.innerHTML = '<i class="fas fa-check" style="color: white; font-size: 20px;"></i>';
        
        // Masquer le texte de succès aussi
        loadingText.style.display = 'none';
    }

    function hideSimpleLoading() {
        const menuContent = document.querySelector('.menu-content');
        const loadingSpinner = document.querySelector('.loading-spinner');
        const loadingText = document.querySelector('.loading-text');
        
        // Réinitialiser le spinner à son état initial
        loadingSpinner.style.display = 'none';
        loadingSpinner.style.animation = '';
        loadingSpinner.classList.remove('success');
        loadingSpinner.innerHTML = '';
        
        // Réinitialiser le texte
        loadingText.style.display = 'none';
        loadingText.classList.remove('success');
        
        // Restaurer le contenu du menu
        menuContent.style.opacity = '1';
    }

    function closeInstagramMenu() {
        hideSimpleLoading(); // S'assurer que l'état de chargement est réinitialisé
        instagramMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        currentInstagram = '';
    }
}

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Validation simple
    if (!name || !email || !service || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez saisir un email valide', 'error');
        return;
    }
    
    // Simulation d'envoi (remplacez par votre logique d'envoi)
    showNotification('Message envoyé à Antoine ! Je vous recontacte personnellement sous 1h.', 'success');
    
    // Message personnalisé selon le service
    setTimeout(() => {
        let serviceMessage = '';
        switch(service) {
            case 'gestion-complete':
                serviceMessage = 'Antoine va personnellement analyser votre profil avec son équipe SynAgency.';
                break;
            case 'marketing':
                serviceMessage = 'Antoine et ses experts marketing vont préparer votre stratégie personnalisée.';
                break;
            case 'optimisation':
                serviceMessage = 'Antoine réalisera un audit complet de votre profil avec SynAgency.';
                break;
            case 'consultation':
                serviceMessage = 'Antoine programmera une consultation gratuite personnelle avec vous.';
                break;
        }
        if (serviceMessage) {
            showNotification(serviceMessage, 'info');
        }
    }, 2000);
    
    contactForm.reset();
});

// Validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Gérer la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 10px;
    `;
    
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Effet de typing pour le titre
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animation du compteur pour les statistiques
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }, 16);
}

// Initialiser les animations des compteurs quand ils sont visibles
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h4');
            const targetValue = parseInt(statElement.textContent);
            const suffix = statElement.textContent.replace(/\d+/g, '');
            statElement.dataset.suffix = suffix;
            animateCounter(statElement, targetValue);
            statObserver.unobserve(entry.target);
        }
    });
});

// Gestion du thème sombre (optionnel)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Effet de particules sur le hero (optionnel)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Gestion des liens externes
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// Préloader pour les images (si vous ajoutez de vraies images)
function preloadImages() {
    const images = [
        // Ajoutez ici les URLs de vos images
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Performance: Lazy loading pour les sections
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
});

// Fonctions globales pour changer facilement les tarifs
// Utilisation: changePricing(45) pour mettre 45%
window.changePricing = function(percentage) {
    PricingManager.setPercentage(percentage);
};

window.getCurrentPricing = function() {
    return PricingManager.getCurrentPercentage();
};

// Fonction de test pour diagnostiquer le slider
window.testSlider = function() {
    console.log('=== TEST SLIDER ===');
    const slider = document.getElementById('pricing-card-slider');
    const value = document.getElementById('card-slider-value');
    const percentage = document.getElementById('pricing-percentage');
    
    console.log('Slider element:', slider);
    console.log('Value element:', value);
    console.log('Percentage element:', percentage);
    
    if (slider) {
        console.log('Slider value:', slider.value);
        console.log('Slider attributes:', {
            min: slider.min,
            max: slider.max,
            step: slider.step
        });
    }
    
    // Test manual change
    if (slider && value) {
        slider.value = 35;
        value.textContent = '35%';
        PricingManager.setPercentage(35);
        console.log('Test changement manuel vers 35%');
    }
};

// Fonction pour basculer l'affichage du slider (utile pour masquer en production)
window.togglePricingControl = function() {
    const control = document.getElementById('pricing-control');
    if (control) {
        control.style.display = control.style.display === 'none' ? 'flex' : 'none';
    }
};

// Raccourci clavier pour afficher/masquer le slider (Ctrl + Shift + P)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        togglePricingControl();
    }
});
