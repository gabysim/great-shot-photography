const CATEGORIES = [
  {
    id: 'immobilier',
    label: 'Immobilier',
    shots: [
      { slot: 'salon — grand-angle', caption: 'Appartement T3, Saint-Cyprien' },
      { slot: 'cuisine ouverte', caption: 'Appartement T3, Saint-Cyprien' },
      { slot: 'façade — extérieur', caption: 'Maison de ville, Balma' },
      { slot: 'chambre — lumière naturelle', caption: 'Maison de ville, Balma' },
      { slot: 'vue drone', caption: 'Villa avec jardin, Tournefeuille' },
      { slot: 'séjour double exposition', caption: 'Villa avec jardin, Tournefeuille' },
      { slot: 'salle de bain', caption: 'Studio meublé, Capitole' },
      { slot: 'local commercial', caption: 'Local 90 m², Compans' },
      { slot: 'terrasse au coucher du soleil', caption: 'Duplex, Carmes' }
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
  const cat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  shotsEl.innerHTML = '';
  cat.shots.forEach((shot) => {
    const figure = document.createElement('figure');
    figure.className = 'shot';
    figure.innerHTML = `
      <div class="shot-slot"><span class="mono">${shot.slot}</span></div>
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
