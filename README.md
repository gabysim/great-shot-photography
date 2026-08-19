# Great Shot Photography — site portfolio

Site statique (HTML/CSS/JS, sans dépendance externe) implémenté à partir du design "Great Shot Photography Portfolio" créé sur Claude Design.

## Fichiers

- `index.html` — structure de la page
- `style.css` — mise en forme
- `script.js` — filtre du portfolio par catégorie, formulaire de contact, lien Calendly
- `assets/logo-noir.png`, `assets/logo-blanc.png` — logos récupérés depuis le design

## À faire avant mise en ligne

1. **Photo hero manquante.** La photo immobilière plein écran n'a pas pu être récupérée intégralement depuis Claude Design (fichier trop lourd pour l'outil de lecture, seul le haut de l'image est arrivé). Glisser une photo dans `assets/`, puis dans `index.html` décommenter la balise `<img>` dans la section `#top` et renseigner le bon chemin.

2. **Photos du portfolio.** Toutes les vignettes (Immobilier, Portrait, Événementiel) sont des emplacements de démonstration. Les remplacer dans `script.js` (tableau `CATEGORIES`) : chaque `shot` peut recevoir une vraie image à la place du texte `slot`.

3. **Lien Calendly.** Remplacer `https://calendly.com/votre-lien` dans `script.js` (constante `CALENDLY_URL`) par le vrai lien une fois le compte Calendly créé.

4. **Formulaire de contact.** Le formulaire confirme visuellement l'envoi mais n'envoie rien pour l'instant, il n'y a pas de backend branché. Options simples : Formspree, ou une fonction serverless sur Vercel.

5. **Photo "portrait du photographe"** dans la section À propos : idem, emplacement à remplacer par une vraie photo.

## Aperçu local

Ouvrir `index.html` directement dans un navigateur, ou lancer un petit serveur local :

```
cd livrables/sites-web/2026-08-18_great-shot-photography
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000
