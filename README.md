# Portfolio — Elie Botuna

Site portfolio **React** (Create React App) : présentation, compétences, expériences, projets et formulaire de contact. Interface bilingue **FR / EN**, thème clair / sombre, design type carte / glass (Space Grotesk).

**Dépôt :** [github.com/Eliebotuna/Elie-botuna](https://github.com/Eliebotuna/Elie-botuna)

## Fonctionnalités

- Onglets **Accueil**, **Expérience**, **Projets**
- Compétences par catégories avec icônes (Simple Icons)
- Téléchargement du CV (`src/assets/cv/cv.pdf`)
- Contact : modale avec motifs et formulaires dédiés, envoi via **API + Gmail** (local Express, **Vercel serverless** `api/contact.js`, ou Web3Forms / Formspree)
- Navigation mobile : barre d’onglets flottante en bas

## Prérequis

- [Node.js](https://nodejs.org/) (LTS recommandé)
- npm

## Installation

```bash
git clone https://github.com/Eliebotuna/Elie-botuna.git
cd Elie-botuna
npm install
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm start` | Front uniquement (proxy ? API locale 5001) |
| `npm run server` | API contact Express, port **5001** |
| `npm run dev` | Front + API en parallèle |
| `npm run build` | Build production dans `build/` |
| `npm run verify-mail` | Test SMTP Gmail (local) |

## Variables d’environnement

Copier `.env.example` vers `.env` en local (ne **jamais** committer `.env`).

**Gmail (serveur / Vercel function), sans `REACT_APP_` :**

- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` (optionnel)
- `GMAIL_SMTP_PORT=587` si besoin
- `PORT` pour Express local (défaut 5001)

**Front (préfixe `REACT_APP_`, injecté au build) :**

- `REACT_APP_VERCEL_MAIL=1` — sur **Vercel**, appelle `/api/contact` (serverless + Gmail)
- `REACT_APP_CONTACT_API_URL` — URL d’un API hébergé ailleurs (sans slash final)
- `REACT_APP_WEB3FORMS_ACCESS_KEY` ou `REACT_APP_CONTACT_FORM_URL` — alternatives sans Gmail

## Déploiement Vercel

Il n’y a **pas** de fichier `.env` sur Vercel : tout se configure dans **Settings ? Environment Variables**.

1. `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` (secrets, **sans** `REACT_APP_`)
2. `REACT_APP_VERCEL_MAIL` = `1` (pour le **build** du front — cocher Production et Preview si besoin)
3. Déployer le repo : le dossier **`api/`** expose `POST /api/contact`
4. Redéployer après avoir ajouté ou modifié une variable

Sans (1) ou (2), le formulaire ne pourra pas envoyer les mails correctement.

## Autres hébergements

- API Express (`server/index.js`) sur Railway, Render, VPS + `REACT_APP_CONTACT_API_URL` au build.
- Front statique seul : utiliser Web3Forms (`REACT_APP_WEB3FORMS_ACCESS_KEY`).

## Structure utile

```
api/              # Vercel serverless (contact)
src/
  components/
  constants/
  styles/
  utils/
server/           # Express local + logique mail partagée
public/
```

## Licence

Projet personnel — tous droits réservés sauf mention contraire.
