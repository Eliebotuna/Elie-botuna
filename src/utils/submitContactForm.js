/**
 * Envoie le formulaire de contact sans mailto:
 * 1) REACT_APP_CONTACT_API_URL ou, en dev, /api/contact (proxy → serveur Node + Gmail)
 * 2) REACT_APP_WEB3FORMS_ACCESS_KEY → Web3Forms
 * 3) REACT_APP_CONTACT_FORM_URL → Formspree / Getform
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export class ContactSubmitError extends Error {
  constructor(code, message) {
    super(message || code);
    this.code = code;
  }
}

function resolveContactPostUrl() {
  const explicit = process.env.REACT_APP_CONTACT_API_URL?.trim();
  if (explicit) {
    const u = explicit.replace(/\/$/, '');
    if (u.endsWith('/api/contact')) return u;
    return `${u}/api/contact`;
  }
  if (process.env.NODE_ENV === 'development') return '/api/contact';
  return '';
}

export async function submitContactForm({ subject, message, name, email, intent }) {
  const postUrl = resolveContactPostUrl();
  if (postUrl) {
    let res;
    try {
      res = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ subject, message, name, email, intent }),
      });
    } catch {
      throw new ContactSubmitError(
        'NETWORK',
        'NETWORK'
      );
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      throw new ContactSubmitError('API', data.message || res.statusText || 'Request failed');
    }
    return;
  }

  const web3Key = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY?.trim();
  const formUrl = process.env.REACT_APP_CONTACT_FORM_URL?.trim();

  if (web3Key) {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject,
        from_name: name,
        name,
        email,
        message,
        intent,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      throw new ContactSubmitError('WEB3FORMS', data.message || res.statusText || 'Request failed');
    }
    return;
  }

  if (formUrl && /^https?:\/\//i.test(formUrl)) {
    const res = await fetch(formUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        subject,
        _subject: subject,
        message,
        name,
        email,
        _replyto: email,
        intent,
      }),
    });
    if (!res.ok) {
      let detail = '';
      try {
        detail = await res.text();
      } catch {
        /* ignore */
      }
      throw new ContactSubmitError('ENDPOINT', detail || res.statusText || 'Request failed');
    }
    return;
  }

  throw new ContactSubmitError('NOT_CONFIGURED', 'NOT_CONFIGURED');
}

export function isContactSubmitConfigured() {
  if (resolveContactPostUrl()) return true;
  const web3Key = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY?.trim();
  const formUrl = process.env.REACT_APP_CONTACT_FORM_URL?.trim();
  return Boolean(web3Key || (formUrl && /^https?:\/\//i.test(formUrl)));
}
