import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { submitContactForm, isContactSubmitConfigured, ContactSubmitError } from '../utils/submitContactForm';
import '../styles/contact-intent-modal.css';

const INTENT_IDS = ['info', 'collaboration', 'project', 'freelance'];

const INITIAL_FORMS = {
  info: { name: '', email: '', message: '' },
  collaboration: { name: '', email: '', organization: '', topic: '', message: '' },
  project: { name: '', email: '', title: '', description: '', timeline: '', budget: '' },
  freelance: { name: '', email: '', mission: '', skills: '', duration: '', budget: '', message: '' },
};

function cloneInitialForms() {
  return {
    info: { ...INITIAL_FORMS.info },
    collaboration: { ...INITIAL_FORMS.collaboration },
    project: { ...INITIAL_FORMS.project },
    freelance: { ...INITIAL_FORMS.freelance },
  };
}

const ContactIntentModal = ({ open, onClose, personal, t }) => {
  const dialogRef = useRef(null);
  const successBtnRef = useRef(null);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [forms, setForms] = useState(cloneInitialForms);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState(null);

  const configured = isContactSubmitConfigured();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSelectedIntent(null);
      setForms(cloneInitialForms());
      setSubmitStatus('idle');
      setSubmitError(null);
    }
  }, [open]);

  useEffect(() => {
    setSubmitStatus('idle');
    setSubmitError(null);
  }, [selectedIntent]);

  useEffect(() => {
    if (submitStatus === 'success' && successBtnRef.current) {
      successBtnRef.current.focus();
    }
  }, [submitStatus]);

  useEffect(() => {
    if (open && dialogRef.current) {
      const focusable = dialogRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [open, selectedIntent]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const updateField = (intent, field, value) => {
    setForms((prev) => ({
      ...prev,
      [intent]: { ...prev[intent], [field]: value },
    }));
  };

  const buildBody = (intent) => {
    const f = forms[intent];
    const L = (key) => `${t[key]}:`;
    const lines = [];
    switch (intent) {
      case 'info':
        lines.push(L('contactField_name'), f.name, '', L('contactField_email'), f.email, '', L('contactField_message'), f.message);
        break;
      case 'collaboration':
        lines.push(
          L('contactField_name'),
          f.name,
          '',
          L('contactField_email'),
          f.email,
          '',
          L('contactField_organization'),
          f.organization || '—',
          '',
          L('contactField_collabTopic'),
          f.topic,
          '',
          L('contactField_message'),
          f.message
        );
        break;
      case 'project':
        lines.push(
          L('contactField_name'),
          f.name,
          '',
          L('contactField_email'),
          f.email,
          '',
          L('contactField_projectTitle'),
          f.title,
          '',
          L('contactField_projectDescription'),
          f.description,
          '',
          L('contactField_timeline'),
          f.timeline || '—',
          '',
          L('contactField_budget'),
          f.budget || '—'
        );
        break;
      case 'freelance':
        lines.push(
          L('contactField_name'),
          f.name,
          '',
          L('contactField_email'),
          f.email,
          '',
          L('contactField_mission'),
          f.mission,
          '',
          L('contactField_skills'),
          f.skills || '—',
          '',
          L('contactField_duration'),
          f.duration || '—',
          '',
          L('contactField_budget'),
          f.budget || '—',
          '',
          L('contactField_message'),
          f.message || '—'
        );
        break;
      default:
        break;
    }
    return lines.join('\n');
  };

  const handleFormSubmit = async (intent) => {
    setSubmitError(null);
    if (!configured) {
      setSubmitError(t.contactNotConfigured);
      return;
    }
    const f = forms[intent];
    const subject = t[`contactSubject_${intent}`];
    const message = buildBody(intent);
    setSubmitStatus('sending');
    try {
      await submitContactForm({
        subject,
        message,
        name: f.name,
        email: f.email,
        intent,
      });
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('idle');
      if (err instanceof ContactSubmitError) {
        if (err.code === 'NOT_CONFIGURED') setSubmitError(t.contactNotConfigured);
        else if (err.code === 'NETWORK') setSubmitError(t.contactErrorNetwork);
        else if (err.message && err.message !== 'NETWORK' && err.message !== 'NOT_CONFIGURED') {
          setSubmitError(err.message);
        } else setSubmitError(t.contactError);
      } else {
        setSubmitError(t.contactError);
      }
    }
  };

  const hint = selectedIntent ? t.contactModalHintForm : t.contactModalHintPick;
  const titleId = selectedIntent ? 'contact-intent-form-title' : 'contact-intent-title';
  const formTitle = selectedIntent ? t[`contactIntent_${selectedIntent}`] : t.contactModalTitle;

  const renderFormFields = () => {
    if (!selectedIntent) return null;
    const f = forms[selectedIntent];
    const ch = (field) => (e) => updateField(selectedIntent, field, e.target.value);

    switch (selectedIntent) {
      case 'info':
        return (
          <>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_name}</span>
              <input name="name" type="text" required autoComplete="name" value={f.name} onChange={ch('name')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_email}</span>
              <input name="email" type="email" required autoComplete="email" value={f.email} onChange={ch('email')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_message}</span>
              <textarea name="message" required rows={4} value={f.message} onChange={ch('message')} />
            </label>
          </>
        );
      case 'collaboration':
        return (
          <>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_name}</span>
              <input name="name" type="text" required autoComplete="name" value={f.name} onChange={ch('name')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_email}</span>
              <input name="email" type="email" required autoComplete="email" value={f.email} onChange={ch('email')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_organization}</span>
              <input name="organization" type="text" autoComplete="organization" value={f.organization} onChange={ch('organization')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_collabTopic}</span>
              <input name="topic" type="text" required value={f.topic} onChange={ch('topic')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_message}</span>
              <textarea name="message" required rows={4} value={f.message} onChange={ch('message')} />
            </label>
          </>
        );
      case 'project':
        return (
          <>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_name}</span>
              <input name="name" type="text" required autoComplete="name" value={f.name} onChange={ch('name')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_email}</span>
              <input name="email" type="email" required autoComplete="email" value={f.email} onChange={ch('email')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_projectTitle}</span>
              <input name="title" type="text" required value={f.title} onChange={ch('title')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_projectDescription}</span>
              <textarea name="description" required rows={4} value={f.description} onChange={ch('description')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_timeline}</span>
              <input name="timeline" type="text" value={f.timeline} onChange={ch('timeline')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_budget}</span>
              <input name="budget" type="text" value={f.budget} onChange={ch('budget')} />
            </label>
          </>
        );
      case 'freelance':
        return (
          <>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_name}</span>
              <input name="name" type="text" required autoComplete="name" value={f.name} onChange={ch('name')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_email}</span>
              <input name="email" type="email" required autoComplete="email" value={f.email} onChange={ch('email')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_mission}</span>
              <textarea name="mission" required rows={3} value={f.mission} onChange={ch('mission')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_skills}</span>
              <input name="skills" type="text" value={f.skills} onChange={ch('skills')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_duration}</span>
              <input name="duration" type="text" value={f.duration} onChange={ch('duration')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_budget}</span>
              <input name="budget" type="text" value={f.budget} onChange={ch('budget')} />
            </label>
            <label className="contact-intent-field">
              <span className="contact-intent-label">{t.contactField_message}</span>
              <textarea name="message" rows={3} value={f.message} onChange={ch('message')} />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="contact-intent-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`contact-intent-dialog envi-card${selectedIntent ? ' contact-intent-dialog--form' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="contact-intent-head">
          <h2 id={titleId} className="contact-intent-title">
            {formTitle}
          </h2>
          <button type="button" className="contact-intent-close" onClick={onClose} aria-label={t.contactModalClose}>
            ×
          </button>
        </div>
        <p className="contact-intent-hint">{hint}</p>
        {!configured ? <p className="contact-intent-banner" role="status">{t.contactNotConfigured}</p> : null}
        {submitError ? (
          <p className="contact-intent-banner contact-intent-banner--error" role="alert">
            {submitError}
          </p>
        ) : null}

        {!selectedIntent ? (
          <>
            <div className="contact-intent-grid">
              {INTENT_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="contact-intent-option"
                  onClick={() => setSelectedIntent(id)}
                >
                  {t[`contactIntent_${id}`]}
                </button>
              ))}
            </div>
            {personal.calendarUrl ? (
              <a
                href={personal.calendarUrl}
                className="contact-intent-calendar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                {t.contactModalCalendar}
              </a>
            ) : null}
          </>
        ) : submitStatus === 'success' ? (
          <div className="contact-intent-success">
            <p className="contact-intent-success-text">{t.contactSuccess}</p>
            <button
              ref={successBtnRef}
              type="button"
              className="contact-intent-btn contact-intent-btn--primary contact-intent-success-ok"
              onClick={onClose}
            >
              {t.contactModalClose}
            </button>
          </div>
        ) : (
          <form
            className="contact-intent-form-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit(selectedIntent);
            }}
          >
            <div className="contact-intent-form">{renderFormFields()}</div>
            <div className="contact-intent-actions">
              <button
                type="button"
                className="contact-intent-btn contact-intent-btn--ghost"
                disabled={submitStatus === 'sending'}
                onClick={() => setSelectedIntent(null)}
              >
                {t.contactFormBack}
              </button>
              <button
                type="submit"
                className="contact-intent-btn contact-intent-btn--primary"
                disabled={submitStatus === 'sending' || !configured}
              >
                {submitStatus === 'sending' ? t.contactSending : t.contactFormSend}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

ContactIntentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personal: PropTypes.shape({
    email: PropTypes.string.isRequired,
    calendarUrl: PropTypes.string,
  }).isRequired,
  t: PropTypes.object.isRequired,
};

export default ContactIntentModal;
