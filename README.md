# Portfolio — Elie Botuna

Site portfolio **React** (Create React App) : présentation, compétences, expériences, projets et formulaire de contact. Interface bilingue **FR / EN**, thème clair / sombre (Space Grotesk).

**Dépôt :** [github.com/Eliebotuna/Elie-botuna](https://github.com/Eliebotuna/Elie-botuna)

## Fonctionnalités

- Onglets Accueil, Expérience, Projets
- Compétences avec icônes (Simple Icons)
- CV : `src/assets/cv/cv.pdf`
- Contact : modale + envoi via **Gmail** (Express local, fonction Vercel `api/contact.js`, ou Web3Forms)
- Navigation mobile : barre d’onglets flottante

## Installation

```bash
git clone https://github.com/Eliebotuna/Elie-botuna.git
cd Elie-botuna
npm install
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm start` | Front (proxy vers API locale 5001) |
| `npm run server` | API Express, port **5001** |
| `npm run dev` | Front + API |
| `npm run build` | Build production |
| `npm run verify-mail` | Test SMTP (local) |

## Variables d’environnement

En local : copie **`.env.example`** vers **`.env`** (ne pas committer `.env`).

Sur **Vercel** : tu peux **importer ou coller** les mêmes paires clé/valeur que dans ton `.env` dans **Project ? Settings ? Environment Variables** (y compris l’équivalent d’un fichier `.env`).

- **Gmail** : `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` — **sans** préfixe `REACT_APP_` (réservés au serveur / à la fonction serverless).
- **Front** (injectés au build si besoin) : `REACT_APP_CONTACT_API_URL`, `REACT_APP_VERCEL_MAIL`, `REACT_APP_WEB3FORMS_ACCESS_KEY`, etc. — voir `.env.example`.

Sur l’URL **`*.vercel.app`**, le site appelle automatiquement **`/api/contact`**. Avec un **domaine personnalisé**, ajoute **`REACT_APP_VERCEL_MAIL=1`** dans les variables Vercel pour le build.

Après un changement de variables sur Vercel, **redéploie** le projet.

## Structure

```
api/          # Vercel serverless (contact)
server/       # Express local + logique mail
src/
public/
```

## Licence

Projet personnel.
