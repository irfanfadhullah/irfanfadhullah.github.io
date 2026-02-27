// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.querySelector('.scroll-top')?.classList.toggle('visible', window.scrollY > 400);
});

// ===== MOBILE MENU =====
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.nav-mobile-overlay');

toggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});
overlay?.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// ===== SCROLL TO TOP =====
document.querySelector('.scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== INTERSECTION OBSERVER =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124,58,237,${this.opacity})`;
            ctx.fill();
        }
    }
    for (let i = 0; i < Math.min(80, Math.floor(canvas.width * canvas.height / 12000)); i++) particles.push(new Particle());
    (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++)
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
        requestAnimationFrame(animate);
    })();
}
