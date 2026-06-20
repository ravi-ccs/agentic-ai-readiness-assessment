(() => {
  const toggle = document.querySelector('[data-chatbot-toggle]');
  const panel = document.querySelector('[data-chatbot-panel]');
  const close = document.querySelector('[data-chatbot-close]');
  const form = document.querySelector('[data-chatbot-form]');
  const status = document.querySelector('[data-chatbot-status]');
  const transcriptEl = document.querySelector('[data-chatbot-transcript]');

  if (!toggle || !panel || !form || !status || !transcriptEl) return;

  const messages = [
    {
      role: 'assistant',
      text: 'Hi, I can help you explore AI agents, AI readiness, or AI-driven project management. What would you like help with?'
    }
  ];

  function renderTranscript() {
    transcriptEl.innerHTML = messages.map((message) => {
      const roleClass = message.role === 'assistant' ? 'bot' : 'visitor';
      return `<div class="chat-message ${roleClass}"><span>${escapeHtml(message.text)}</span></div>`;
    }).join('');
    transcriptEl.scrollTop = transcriptEl.scrollHeight;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    })[char]);
  }

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const first = panel.querySelector('input, textarea, button');
      if (first) setTimeout(() => first.focus(), 80);
    }
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      timestamp: new Date().toISOString(),
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      pageUrl: window.location.href
    };

    if (!payload.name || !payload.email || !payload.message) {
      status.textContent = 'Please add your name, email, and question.';
      return;
    }

    messages.push({ role: 'visitor', text: payload.message });
    messages.push({ role: 'assistant', text: 'Thanks. Your details are being sent to Champlain Consulting Services.' });
    payload.transcript = messages.map((message) => `${message.role}: ${message.text}`).join('\n');
    renderTranscript();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Sending...';

    try {
      const response = await fetch('/api/chatbot-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Submission failed');
      }

      status.textContent = 'Thanks — your chat details were submitted.';
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'The chatbot is not connected yet. Please email contactus@champlainconsultingservices.com or call +1 248-688-9569.';
    } finally {
      submitButton.disabled = false;
    }
  });

  renderTranscript();
})();
