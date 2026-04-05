const { mailConfigured, createGmailTransport, readGmailCreds } = require('./mailTransport');

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Traite une demande d’envoi du formulaire contact (Express ou Vercel).
 * @returns {Promise<{ status: number, json: object }>}
 */
async function processContactPayload(rawBody) {
  if (!mailConfigured()) {
    return {
      status: 503,
      json: {
        success: false,
        message:
          'Mail non configuré : définis GMAIL_USER et GMAIL_APP_PASSWORD (variables d’environnement ou .env).',
      },
    };
  }

  const { user: gmailUser, contactTo } = readGmailCreds();
  const { name, email, subject, message, intent } = rawBody || {};
  const nameStr = typeof name === 'string' ? name.trim() : '';
  const emailStr = typeof email === 'string' ? email.trim() : '';
  const subjectStr = typeof subject === 'string' ? subject.trim() : '';
  const messageStr = typeof message === 'string' ? message.trim() : '';
  const intentStr = typeof intent === 'string' ? intent.trim() : '';

  if (!nameStr || !emailStr || !subjectStr || !messageStr) {
    return { status: 400, json: { success: false, message: 'Champs requis manquants.' } };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  if (!emailOk) {
    return { status: 400, json: { success: false, message: 'Adresse e-mail invalide.' } };
  }

  const transport = createGmailTransport();
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
    return { status: 200, json: { success: true } };
  } catch (err) {
    console.error('Erreur envoi Gmail:', err.code || err.message, err.response || '');
    const low = String(err.message || '').toLowerCase();
    let userMessage =
      'Échec de l’envoi. Vérifie GMAIL_USER et GMAIL_APP_PASSWORD, puis redéploie ou redémarre le serveur.';
    if (err.code === 'EAUTH' || low.includes('invalid login') || low.includes('not accepted')) {
      userMessage =
        'Gmail refuse la connexion : mot de passe d’application Google + validation en 2 étapes requises.';
    } else if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKET' || err.code === 'ECONNREFUSED') {
      userMessage = 'Impossible de joindre les serveurs Gmail (réseau ou pare-feu).';
    }
    return { status: 500, json: { success: false, message: userMessage } };
  }
}

module.exports = { processContactPayload };
