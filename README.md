# Great Shot Photography — site portfolio

Site statique (HTML/CSS/JS, sans dépendance externe) implémenté à partir du design "Great Shot Photography Portfolio" créé sur Claude Design.

## Fichiers

- `index.html` — structure de la page
- `style.css` — mise en forme
- `script.js` — filtre du portfolio par catégorie, formulaire de contact, lien Calendly
- `assets/logo-noir.png`, `assets/logo-blanc.png` — logos récupérés depuis le design
- `assets/hero-immobilier.jpg` — photo hero (vue aérienne drone)
- `assets/portfolio/immobilier-01.jpg` à `immobilier-11.jpg` — photos réelles du portfolio Immobilier

## À faire avant mise en ligne

1. **Photos Portrait et Événementiel.** Ces deux catégories du portfolio sont encore des emplacements de démonstration (Immobilier est déjà rempli avec de vraies photos). Les remplacer dans `script.js` (tableau `CATEGORIES`) : chaque `shot` peut recevoir `{ src: 'assets/portfolio/....jpg', caption: '...' }` à la place de `{ slot: '...', caption: '...' }`.

2. **Lien Calendly.** Remplacer `https://calendly.com/votre-lien` dans `script.js` (constante `CALENDLY_URL`) par le vrai lien une fois le compte Calendly créé.

3. **Formulaire de contact.** Le formulaire confirme visuellement l'envoi mais n'envoie rien pour l'instant, il n'y a pas de backend branché. Options simples : Formspree, ou une fonction serverless sur Vercel.

4. **Photo "portrait du photographe"** dans la section À propos : emplacement à remplacer par une vraie photo.

## Note sur les légendes du portfolio

Les légendes des photos Immobilier (ex. "Cuisine ouverte, maison de campagne") sont volontairement génériques, sans nom de client ni adresse précise, pour rester descriptives sans révéler d'informations sur les biens ou leurs propriétaires. À adapter si besoin.

## Aperçu local

Ouvrir `index.html` directement dans un navigateur, ou lancer un petit serveur local :

```
cd livrables/sites-web/2026-08-18_great-shot-photography
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000
