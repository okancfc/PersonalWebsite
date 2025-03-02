// Özel imleç
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('.btn');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(0, 112, 243, 0.2)';
        cursorFollower.style.border = 'none';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
        cursorFollower.style.border = '2px solid var(--primary-color)';
    });
});

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(0, 112, 243, 0.2)';
        cursorFollower.style.border = 'none';
    });
    
    button.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
        cursorFollower.style.border = '2px solid var(--primary-color)';
    });
});

// Navigation için mobil menü
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Burger Animation
        burger.classList.toggle('toggle');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
};

// Sayfa içi linklerin smooth scroll özelliği
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', clickHandler);
    }
    
    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70;
            
            scroll({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            const nav = document.querySelector('.nav-links');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                document.querySelector('.burger').classList.remove('toggle');
                
                const navLinks = document.querySelectorAll('.nav-links li');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        }
    }
};

// Scroll olduğunda header'ın stilini değiştir
const headerScroll = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
};

// Scroll Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ScrollReveal animasyonları
const initScrollReveal = () => {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });
    
    sr.reveal('.section-title', { origin: 'left', distance: '50px' });
    sr.reveal('.section-subtitle', { delay: 300 });
    sr.reveal('.reveal-left', { origin: 'left', distance: '50px', interval: 200 });
    sr.reveal('.reveal-right', { origin: 'right', distance: '50px', interval: 200 });
    sr.reveal('.reveal-bottom', { interval: 200 });
    sr.reveal('.reveal-item', { interval: 100, scale: 0.8 });
};

// Aktif menü öğesini vurgula
const highlightActiveMenu = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// İletişim formu gönderimi
const contactForm = () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Normalde burada bir API'ye form verilerini gönderirdik
            // Şimdilik sadece konsola yazdıralım
            console.log('Form gönderildi:', { name, email, message });
            
            // Kullanıcıya geri bildirim
            alert('Mesajınız gönderildi! Teşekkür ederiz.');
            
            // Formu sıfırla
            form.reset();
        });
    }
};

// CSS sınıfı eklemek için yardımcı fonksiyon
const addCSSClass = (selector, className) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.add(className);
    });
};

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    // Mobil cihazlarda özel imleci devre dışı bırak
    if (window.innerWidth > 768) {
        document.body.style.cursor = 'none';
    }
    
    navSlide();
    smoothScroll();
    headerScroll();
    initScrollReveal();
    highlightActiveMenu();
    contactForm();
});
