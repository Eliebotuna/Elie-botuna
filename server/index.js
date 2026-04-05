const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const { mailConfigured, createGmailTransport, readGmailCreds } = require('./mailTransport');

const app = express();
const port = parseInt(process.env.PORT, 10) || 5001;

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '64kb' }));

/** Pas de cache : après changement du .env, pas besoin de redémarrer le serveur. */
function getTransporter() {
  if (!mailConfigured()) return null;
  return createGmailTransport();
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mail: mailConfigured() });
});

app.post('/api/contact', async (req, res) => {
  if (!mailConfigured()) {
    return res.status(503).json({
      success: false,
      message: 'Mail non configuré : définis GMAIL_USER et GMAIL_APP_PASSWORD dans .env puis redémarre le serveur.',
    });
  }

  const { user: gmailUser, contactTo } = readGmailCreds();

  const { name, email, subject, message, intent } = req.body || {};
  const nameStr = typeof name === 'string' ? name.trim() : '';
  const emailStr = typeof email === 'string' ? email.trim() : '';
  const subjectStr = typeof subject === 'string' ? subject.trim() : '';
  const messageStr = typeof message === 'string' ? message.trim() : '';
  const intentStr = typeof intent === 'string' ? intent.trim() : '';

  if (!nameStr || !emailStr || !subjectStr || !messageStr) {
    return res.status(400).json({ success: false, message: 'Champs requis manquants.' });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  if (!emailOk) {
    return res.status(400).json({ success: false, message: 'Adresse e-mail invalide.' });
  }

  const transport = getTransporter();
  const safeName = escapeHtml(nameStr);
  const safeEmail = escapeHtml(emailStr);
  const safeSubject = escapeHtml(subjectStr);
  const safeIntent = escapeHtml(intentStr);
  const textBody = [
    `Intent: ${intentStr || '—'}`,
    '',
    messageStr,
    '',
    `— ${nameStr} <${emailStr}>`,
  ].join('\n');

  try {
    await transport.sendMail({
      from: `Portfolio <${gmailUser}>`,
      replyTo: emailStr,
      to: contactTo,
      subject: subjectStr,
      text: textBody,
      html: `
        <p><strong>Motif :</strong> ${safeIntent || '—'}</p>
        <p><strong>Sujet :</strong> ${safeSubject}</p>
        <hr />
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(messageStr)}</pre>
        <hr />
        <p><strong>Nom :</strong> ${safeName}<br/>
        <strong>E-mail (répondre à) :</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Erreur envoi Gmail:', err.code || err.message, err.response || '');
    const low = String(err.message || '').toLowerCase();
    let userMessage =
      'Échec de l’envoi. Vérifie GMAIL_USER et GMAIL_APP_PASSWORD dans .env, puis redémarre avec npm run server.';
    if (err.code === 'EAUTH' || low.includes('invalid login') || low.includes('not accepted')) {
      userMessage =
        'Gmail refuse la connexion : utilise un mot de passe d’application (pas le mot de passe du compte), avec la validation en 2 étapes activée sur le compte Google. Lance « npm run verify-mail » pour un diagnostic.';
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKET' || err.code === 'ECONNREFUSED') {
      userMessage = 'Impossible de joindre les serveurs Gmail (réseau ou pare-feu).';
    }
    res.status(500).json({ success: false, message: userMessage });
  }
});

const server = app.listen(port, () => {
  console.log(`API contact sur http://localhost:${port} (POST /api/contact)`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} déjà utilisé. Ferme l’autre terminal « npm run server » / « npm run dev », ou mets PORT=5002 dans .env et le même port dans package.json → proxy.`
    );
    process.exit(1);
  }
  throw err;
});
