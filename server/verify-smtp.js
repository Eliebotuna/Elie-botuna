/**
 * Diagnostic Gmail : n’affiche jamais le mot de passe.
 * Usage : npm run verify-mail
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { readGmailCreds, createGmailTransport } = require('./mailTransport');

const { user, pass, contactTo } = readGmailCreds();

console.log('Compte (GMAIL_USER) :', user || '(vide — vérifie .env)');
console.log('CONTACT_TO_EMAIL    :', contactTo || '(vide)');
console.log('Longueur du mot de passe (sans espaces) :', pass.length, '(Google affiche souvent 16 caractères)');
console.log('Port SMTP :', process.env.GMAIL_SMTP_PORT === '587' ? '587 STARTTLS' : '465 SSL');
console.log('');

if (!user || !pass) {
  console.error('Remplis GMAIL_USER et GMAIL_APP_PASSWORD dans .env');
  process.exit(1);
}

const t = createGmailTransport();
t.verify((err) => {
  if (err) {
    console.error('Échec de la connexion SMTP :', err.message);
    console.error('');
    console.error('Vérifications côté Google :');
    console.error('  1. Compte Google → Sécurité → Validation en 2 étapes : ACTIVÉE.');
    console.error('  2. Sécurité → Mots de passe des applications → créer « Courrier » ou « Autre ».');
    console.error('  3. Coller le mot de passe à 16 lettres dans GMAIL_APP_PASSWORD (pas le mot de passe du compte).');
    console.error('  4. Si le mot de passe a été partagé ou copié mal, supprime l’ancien et crée-en un nouveau.');
    console.error('  5. Si ça échoue encore, essaie dans .env : GMAIL_SMTP_PORT=587 puis npm run verify-mail');
    process.exit(1);
  }
  console.log('Connexion SMTP Gmail : OK.');
  process.exit(0);
});
