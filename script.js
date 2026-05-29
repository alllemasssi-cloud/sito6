// ============================================ LOADING SCREEN ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('loadingProgress');
    const percentageText = document.getElementById('percentage');
    
    let currentProgress = 0;
    
    const loadingInterval = setInterval(() => {
        currentProgress += Math.random() * 40;
        
        if (currentProgress > 95) {
            currentProgress = 95;
        }
        
        progressBar.style.width = currentProgress + '%';
        percentageText.textContent = Math.floor(currentProgress);
    }, 300);
    
    window.addEventListener('load', () => {
        clearInterval(loadingInterval);
        
        currentProgress = 100;
        progressBar.style.width = '100%';
        percentageText.textContent = '100';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    });
    
    setTimeout(() => {
        if (currentProgress < 100) {
            clearInterval(loadingInterval);
            currentProgress = 100;
            progressBar.style.width = '100%';
            percentageText.textContent = '100';
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }, 3000);
});

// ============================================ SCROLL ANIMATIONS ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe reveal items
document.querySelectorAll('.reveal-item, .fade-in, .slide-up, .reveal-text').forEach(el => {
    observer.observe(el);
    el.style.animationPlayState = 'paused';
});

// ============================================ SMOOTH SCROLL ============================================

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

// ============================================ NAVBAR ACTIVE STATE ============================================

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

updateActiveNav();

// ============================================ SCROLL INDICATOR ANIMATION ============================================

window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// ============================================ PARALLAX EFFECT ============================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ============================================ HERO TEXT ANIMATION ============================================

function animateHeroText() {
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.animation = `slideInLeft 0.8s ease-out ${index * 0.2}s both`;
        });
    }
}

animateHeroText();

// ============================================ STAGGERED ANIMATIONS ============================================

function staggerAnimation(elements, baseDelay = 0) {
    elements.forEach((el, index) => {
        const delay = baseDelay + (index * 0.1);
        el.style.setProperty('--stagger-delay', `${delay}s`);
    });
}

// Stagger cause cards
const causeCards = document.querySelectorAll('.cause-card');
staggerAnimation(causeCards);

// Stagger portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
staggerAnimation(portfolioItems);

// Stagger data stats
const dataStats = document.querySelectorAll('.data-stat');
staggerAnimation(dataStats);

// Stagger solution items
const solutionItems = document.querySelectorAll('.solution-item');
staggerAnimation(solutionItems);

// Stagger FSL projects
const fslProjects = document.querySelectorAll('.fsl-project');
staggerAnimation(fslProjects);

// ============================================ REVEAL ON SCROLL ============================================

const revealElements = document.querySelectorAll('.reveal-text, .reveal-item, .fade-in, .slide-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'running';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============================================ GALLERY HOVER EFFECTS ============================================

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================ PORTFOLIO ITEM HOVER ============================================

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================ TABLE ANIMATION ============================================

function animateTable() {
    const tableRows = document.querySelectorAll('table tr');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
}

animateTable();

// ============================================ COUNTER ANIMATION ============================================

function animateCounter(element) {
    const finalValue = parseInt(element.textContent);
    if (isNaN(finalValue)) return;
    
    let currentValue = 0;
    const increment = finalValue / 30;
    
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 50);
}

const dataStatsElements = document.querySelectorAll('.data-stat h3');
dataStatsElements.forEach(el => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(el);
});

// ============================================ MOUSE FOLLOW EFFECT ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ============================================ PROGRESSIVE IMAGE LOADING ============================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ============================================ VIDEO PAUSE ON SCROLL ============================================

document.querySelectorAll('video').forEach(video => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Video is visible
            } else {
                if (video.playing) {
                    video.pause();
                }
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(video);
});

// ============================================ SMOOTH COLOR TRANSITIONS ============================================

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / documentHeight;
    
    // Update gradient intensity based on scroll
    const elements = document.querySelectorAll('.page-gradient');
    elements.forEach(el => {
        el.style.opacity = Math.min(scrollPercentage * 2, 1);
    });
});

// ============================================ ACTIVE SECTION TRACKING ============================================

function trackActiveSection() {
    const sections = document.querySelectorAll('.edu-section, .fsl-project, .portfolio-grid');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

trackActiveSection();

// ============================================ TYPOGRAPHY ANIMATION ============================================

function animateTypography() {
    const titles = document.querySelectorAll('.section-title, .edu-title, .project-title');
    
    titles.forEach(title => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
}

animateTypography();

// ============================================ FORM INTERACTIONS ============================================

document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.3)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// ============================================ SCROLL PROGRESS BAR ============================================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================ DEBOUNCE FUNCTION ============================================

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

// ============================================ WINDOW RESIZE HANDLER ============================================

const handleResize = debounce(() => {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ============================================ TOOLTIP FUNCTIONALITY ============================================

document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.85rem;
            white-space: nowrap;
            z-index: 1000;
        `;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

// ============================================ INTERSECTION OBSERVER FOR LAZY SECTIONS ============================================

const lazySectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.edu-section, .fsl-project, .portfolio-item').forEach(el => {
    lazySectionObserver.observe(el);
});

// ============================================ PRINT STYLES ============================================

window.addEventListener('beforeprint', () => {
    document.body.style.background = 'white';
});

// ============================================ ACCESSIBILITY ENHANCEMENTS ============================================

// Focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================ PERFORMANCE OPTIMIZATION ============================================

// Throttle scroll events
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ============================================ LOCAL STORAGE PREFERENCES ============================================

function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}

window.addEventListener('beforeunload', saveScrollPosition);

function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
}

// Restore on page load
window.addEventListener('load', restoreScrollPosition);

// ============================================ DYNAMIC ANIMATION TIMING ============================================

function calculateAnimationDelay(index, total) {
    return (index / total) * 0.5;
}

document.querySelectorAll('.reveal-item').forEach((item, index, array) => {
    const delay = calculateAnimationDelay(index, array.length);
    item.style.setProperty('--delay', `${delay}s`);
});

// ============================================ PAGE TRANSITION EFFECTS ============================================

document.querySelectorAll('a').forEach(link => {
    if (!link.href.includes('#') && link.target !== '_blank') {
        link.addEventListener('click', (e) => {
            if (!link.href.startsWith('http') && link.href !== 'javascript:void(0)') {
                // Allow normal navigation for internal links
            }
        });
    }
});

// ============================================ CURSOR CUSTOM EFFECTS ============================================

document.addEventListener('mousemove', (e) => {
    // You can add custom cursor effects here
});

// ============================================ CONSOLE MESSAGES ============================================

console.log('%c🎨 Alessandro Massidda Portfolio', 'font-size: 24px; font-weight: bold; color: #3498db;');
console.log('%cGraphic Designer | Creative Developer', 'font-size: 16px; color: #e74c3c;');
console.log('%cThanks for visiting my portfolio!', 'font-size: 14px; color: #95a5a6;');

// ============================================ EASTER EGG ============================================

let clickCount = 0;
const logoCircle = document.querySelector('.logo-circle');

if (logoCircle) {
    logoCircle.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            console.log('%c🎉 Easter egg found!', 'font-size: 20px; color: #f39c12;');
            logoCircle.style.animation = 'spin 0.6s ease-out';
            setTimeout(() => {
                logoCircle.style.animation = '';
            }, 600);
            clickCount = 0;
        }
    });
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

// ============================================ INITIALIZATION ============================================

console.log('Portfolio loaded successfully! 🚀');
