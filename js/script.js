document.addEventListener('DOMContentLoaded', () => {
    // Animación de tarjetas de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            skillCards.forEach((card, i) => {
                setTimeout(() => card.classList.add('skill-visible'), i * 100);
            });
            skillObserver.disconnect();
        }
    }, { threshold: 0.1 });

    if (skillCards.length) {
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) skillObserver.observe(skillsGrid);
    }

    // Animaciones de revelado (Scroll Reveal)
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // Navegación Activa en Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) {
                current = s.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            if (a.getAttribute('href') === '#' + current) {
                a.style.color = 'var(--accent)';
            } else {
                a.style.color = '';
            }
        });
    });

    // Manejo del Formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('btn-enviar');
            const msg = document.getElementById('form-msg');
            
            btn.disabled = true;
            btn.textContent = 'Enviando...';

            const data = new FormData(this);
            try {
                const res = await fetch('https://formspree.io/f/mrerkkrg', {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    msg.style.display = 'block';
                    msg.style.background = 'rgba(200,169,126,0.08)';
                    msg.style.border = '1px solid rgba(200,169,126,0.3)';
                    msg.style.color = 'var(--accent)';
                    msg.innerHTML = '✓ &nbsp;¡Mensaje enviado! Pronto me pondré en contacto contigo.';
                    btn.textContent = 'Enviado ✓';
                    this.reset();
                } else {
                    throw new Error();
                }
            } catch (err) {
                msg.style.display = 'block';
                msg.style.background = 'rgba(220,80,80,0.08)';
                msg.style.border = '1px solid rgba(220,80,80,0.2)';
                msg.style.color = '#e07070';
                msg.textContent = 'Hubo un error al enviar. Inténtalo de nuevo.';
                btn.disabled = false;
                btn.textContent = 'Enviar';
            }
        });
    }
});