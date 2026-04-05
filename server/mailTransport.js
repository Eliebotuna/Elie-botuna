const nodemailer = require('nodemailer');

/** Retire BOM UTF-8 (souvent ajouté par Notepad sous Windows) et espaces. */
function stripBom(s) {
  return String(s ?? '')
    .replace(/^\uFEFF/, '')
    .trim();
}

function readGmailCreds() {
  const user = stripBom(process.env.GMAIL_USER || process.env.EMAIL_USER);
  const pass = stripBom(process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS).replace(/\s+/g, '');
  const contactTo = stripBom(process.env.CONTACT_TO_EMAIL || user);
  return { user, pass, contactTo };
}

function mailConfigured() {
  const { user, pass, contactTo } = readGmailCreds();
  return Boolean(user && pass && contactTo);
}

function createGmailTransport() {
  const { user, pass } = readGmailCreds();
  const use587 = String(process.env.GMAIL_SMTP_PORT || '').trim() === '587';

  if (use587) {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

module.exports = {
  stripBom,
  readGmailCreds,
  mailConfigured,
  createGmailTransport,
};
