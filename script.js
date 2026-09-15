/* ============================================================
   GREAT SHOT — Interactions photographiques
   ============================================================ */

(function () {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* -----------------------------------------------------------
     1. LOADER DIAPHRAGME (iris)
     ----------------------------------------------------------- */
  const iris = $('#iris-loader');
  if (iris) {
    setTimeout(() => iris.classList.add('iris-open'), 100);
    setTimeout(() => {
      iris.classList.add('iris-hidden');
      document.body.classList.add('site-ready');
    }, 1900);
    setTimeout(() => iris.remove(), 2800);
  } else {
    document.body.classList.add('site-ready');
  }

  /* -----------------------------------------------------------
     2. VIEWFINDER — Curseur reflex qui suit la souris
     ----------------------------------------------------------- */
  const vf = document.createElement('div');
  vf.className = 'viewfinder';
  vf.innerHTML = `
    <span class="bracket tl"></span>
    <span class="bracket tr"></span>
    <span class="bracket bl"></span>
    <span class="bracket br"></span>
  `;
  document.body.appendChild(vf);

  let mouseX = 0, mouseY = 0;
  let vfX = 0, vfY = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    vfX = lerp(vfX, mouseX, 0.22);
    vfY = lerp(vfY, mouseY, 0.22);
    const size = vf.classList.contains('hovering') ? 45 : 30;
    vf.style.transform = `translate3d(${vfX - size}px, ${vfY - size}px, 0)`;
    requestAnimationFrame(tick);
  }
  tick();

  const hoverables = 'a, button, .chapter, .masonry-item, .filmstrip-frame, input, select, textarea';
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) vf.classList.add('hovering');
  });
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables) && !e.relatedTarget?.closest(hoverables)) {
      vf.classList.remove('hovering');
    }
  });

  const photoHover = '.chapter, .masonry-item, .filmstrip-frame';
  document.body.addEventListener('mouseover', (e) => {
    if (e.target.closest(photoHover)) vf.classList.add('focused');
  });
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest(photoHover) && !e.relatedTarget?.closest(photoHover)) {
      vf.classList.remove('focused');
    }
  });

  /* -----------------------------------------------------------
     3. FLASH BLANC sur transitions
     ----------------------------------------------------------- */
  const flash = document.createElement('div');
  flash.className = 'flash-plate';
  document.body.appendChild(flash);

  function fireFlash() {
    flash.classList.add('fire');
    setTimeout(() => flash.classList.remove('fire'), 130);
  }

  $$('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (a.target === '_blank') return;
    a.addEventListener('click', () => fireFlash());
  });

  /* -----------------------------------------------------------
     4. NAV — état "scrolled"
     ----------------------------------------------------------- */
  const nav = $('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const toggle = $('.nav-toggle');
  const mmenu  = $('.mobile-menu');
  if (toggle && mmenu) {
    toggle.addEventListener('click', () => {
      const willOpen = !mmenu.classList.contains('open');
      mmenu.classList.toggle('open');
      toggle.classList.toggle('open', willOpen);
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });
    $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
      mmenu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* -----------------------------------------------------------
     5. REVEAL au scroll
     ----------------------------------------------------------- */
  const reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('in'));
  }

  /* -----------------------------------------------------------
     6. Formulaire de contact
     ----------------------------------------------------------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('#form-status');

    const params = new URLSearchParams(location.search);
    const preselect = params.get('prestation');
    if (preselect) {
      const sel = form.querySelector('[name="prestation"]');
      if (sel) {
        const opt = Array.from(sel.options).find(o => o.value.toLowerCase() === preselect.toLowerCase());
        if (opt) sel.value = opt.value;
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nom = (data.get('nom') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const tel = (data.get('tel') || '').toString().trim();
      const prestation = (data.get('prestation') || '').toString();
      const message = (data.get('message') || '').toString().trim();

      if (!nom || !email || !message) {
        status.textContent = 'Merci de remplir nom, email et message.';
        status.style.color = '#c96a3f';
        return;
      }

      const subject = `[Great Shot] ${prestation} — ${nom}`;
      const body =
`Nom : ${nom}
Email : ${email}
Téléphone : ${tel || '—'}
Prestation : ${prestation}

${message}
`;
      const mailto = `mailto:greatshot.photo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.textContent = 'Ouverture de votre messagerie...';
      status.style.color = '';
      fireFlash();
      setTimeout(() => { window.location.href = mailto; }, 200);
    });
  }

})();
