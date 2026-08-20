const CATEGORIES = [
  {
    id: 'immobilier',
    label: 'Immobilier',
    shots: [
      { src: 'assets/portfolio/immobilier-01.jpg', caption: 'Photo extérieure. Terrasse rooftop — Toulouse' },
      { src: 'assets/portfolio/immobilier-02.jpg', caption: 'Photo extérieure. Façade et rue commerçante — Toulouse' },
      { src: 'assets/portfolio/immobilier-03.jpg', caption: "Photo intérieure. Espace d'accueil — Toulouse" },
      { src: 'assets/portfolio/immobilier-04.jpg', caption: 'Photo intérieure. Chambre double — Toulouse' },
      { src: 'assets/portfolio/immobilier-05.jpg', caption: 'Photo intérieure. Cuisine ouverte, maison de campagne — Pibrac' },
      { src: 'assets/portfolio/immobilier-06.jpg', caption: 'Photo intérieure. Cuisine rénovée, style vintage — Toulouse' },
      { src: 'assets/portfolio/immobilier-07.jpg', caption: 'Photo extérieure. Corps de ferme et allée — Tournefeuille' },
      { src: 'assets/portfolio/immobilier-08.jpg', caption: 'Photo extérieure. Villa avec piscine, architecture contemporaine — Colomiers' },
      { src: 'assets/portfolio/immobilier-09.jpg', caption: 'Photo intérieure. Salle à manger, poutres apparentes — Castanet-Tolosan' },
      { src: 'assets/portfolio/immobilier-10.jpg', caption: 'Photo aérienne. Propriété avec piscine — Saint-Orens-de-Gameville' },
      { src: 'assets/portfolio/immobilier-11.jpg', caption: 'Photo extérieure. Villa avec piscine et jardin — Plaisance-du-Touch' }
    ]
  },
  {
    id: 'portrait',
    label: 'Portrait',
    shots: [
      { slot: 'portrait corporate', caption: 'Agence immobilière, Toulouse' },
      { slot: 'portrait extérieur', caption: 'Mandataire indépendant' },
      { slot: 'portrait studio fond clair', caption: 'Profil professionnel' },
      { slot: 'portrait en situation', caption: 'Artisan, atelier' }
    ]
  },
  {
    id: 'evenementiel',
    label: 'Événementiel',
    shots: [
      { slot: "inauguration — vue d'ensemble", caption: "Ouverture d'agence" },
      { slot: 'détail — invités', caption: "Ouverture d'agence" },
      { slot: 'conférence — scène', caption: 'Séminaire, Toulouse' },
      { slot: 'cocktail — ambiance', caption: 'Soirée partenaires' }
    ]
  }
  // Nouvelle catégorie : ajouter un objet ici (id, label, shots) pour l'ajouter au portfolio.
];

// Remplacer par le vrai lien Calendly une fois créé.
const CALENDLY_URL = 'https://calendly.com/votre-lien';

let activeCategory = CATEGORIES[0].id;

function renderTabs() {
  const tabsEl = document.getElementById('tabs');
  tabsEl.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = cat.label;
    btn.className = 'tab-btn' + (cat.id === activeCategory ? ' active' : '');
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      renderTabs();
      renderShots();
    });
    tabsEl.appendChild(btn);
  });
}

function renderShots() {
  const shotsEl = document.getElementById('shots');
  const noteEl = document.querySelector('.portfolio-note');
  const cat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  shotsEl.innerHTML = '';
  if (noteEl) {
    noteEl.style.display = cat.shots.some((s) => !s.src) ? 'block' : 'none';
  }
  cat.shots.forEach((shot) => {
    const figure = document.createElement('figure');
    figure.className = 'shot';
    const media = shot.src
      ? `<div class="shot-photo"><img src="${shot.src}" alt="${shot.caption}" loading="lazy"></div>`
      : `<div class="shot-slot"><span class="mono">${shot.slot}</span></div>`;
    figure.innerHTML = `
      ${media}
      <figcaption>${shot.caption}</figcaption>
    `;
    shotsEl.appendChild(figure);
  });
}

function initReservationLinks() {
  document.querySelectorAll('a[href="#reservation"], #calendly-btn').forEach((el) => {
    if (el.id === 'calendly-btn') {
      el.href = CALENDLY_URL;
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Ce formulaire ne fait que confirmer visuellement l'envoi. Pour recevoir
    // réellement les messages, brancher un service (Formspree, backend, etc.)
    // via l'attribut action du formulaire ou un fetch() vers votre API.
    status.textContent = 'Message envoyé. Réponse sous 24 h.';
    form.reset();
  });
}

renderTabs();
renderShots();
initReservationLinks();
initContactForm();
