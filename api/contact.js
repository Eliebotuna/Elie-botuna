/**
 * Vercel Serverless Function — même logique que server/index.js (Gmail).
 * Variables à définir dans Vercel → Settings → Environment Variables (pas de fichier .env dans le repo) :
 *   GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL (optionnel)
 * Front : REACT_APP_VERCEL_MAIL=1 au build pour appeler /api/contact sur le même domaine.
 */
const path = require('path');

if (!process.env.VERCEL) {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const { processContactPayload } = require('../server/contactMailLogic');

function parseBody(req) {
  if (req.body == null) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const body = parseBody(req);
  const { status, json } = await processContactPayload(body);
  return res.status(status).json(json);
};
