(() => {
  const toggle = document.querySelector('[data-chatbot-toggle]');
  const panel = document.querySelector('[data-chatbot-panel]');
  const close = document.querySelector('[data-chatbot-close]');
  const form = document.querySelector('[data-chatbot-form]');
  const status = document.querySelector('[data-chatbot-status]');
  const transcriptEl = document.querySelector('[data-chatbot-transcript]');

  if (!toggle || !panel || !form || !status || !transcriptEl) return;

  const CHATBOT_RESPONSES = [
    {
      label: 'AI Readiness Assessment',
      prompt: 'Tell me about the AI Readiness Assessment.',
      keywords: ['assessment', 'readiness', 'audit', 'diagnostic', 'roadmap'],
      response: 'Our AI Readiness Assessment helps identify where AI agents and automation can improve revenue, customer experience, operational cost, and productivity before you invest in implementation. The outcome is a prioritized roadmap with use cases, KPIs, implementation options, and a recommended first sprint.'
    },
    {
      label: 'AI Agents for SMB',
      prompt: 'What AI agents can help my small business?',
      keywords: ['ai agent', 'agents', 'automation', 'workflow', 'workflows', 'small business', 'smb'],
      response: 'Champlain Consulting Services designs practical AI agents for SMB workflows such as lead qualification, customer support, appointment booking, internal knowledge, marketing content, reporting, and business operations. We start with a focused use case so the solution is measurable and manageable.'
    },
    {
      label: 'AI-Driven PMO',
      prompt: 'How can AI help project management or PMO?',
      keywords: ['project management', 'pmo', 'portfolio', 'delivery', 'raid', 'resource', 'executive reporting', 'benefits'],
      response: 'Our AI-driven Project Management approach helps leaders improve portfolio visibility, RAID tracking, resource planning, executive reporting, and benefits realization. The goal is clearer delivery signals, faster reporting, and stronger alignment between execution and business outcomes.'
    },
    {
      label: 'Process Optimization',
      prompt: 'Can you help optimize business processes with AI?',
      keywords: ['process', 'optimization', 'improve process', 'business process', 'efficiency', 'manual', 'handoff', 'bottleneck'],
      response: 'Yes. We look for repetitive work, manual handoffs, slow response loops, and reporting friction, then identify where AI workflows or agents can reduce effort, improve quality, and make performance easier to measure.'
    },
    {
      label: 'Customer Support Bot',
      prompt: 'Tell me about customer support bots.',
      keywords: ['customer support', 'support bot', 'chatbot', 'faq', 'ticket', 'tickets', 'escalation', '24/7'],
      response: 'An Agentic Customer Support Bot can answer FAQs, capture requests, route issues, and escalate complex items. It can support web or messaging channels and is useful when you want faster response without adding support headcount.'
    },
    {
      label: 'AI Receptionist',
      prompt: 'Tell me about AI receptionist and appointment booking.',
      keywords: ['receptionist', 'appointment', 'booking', 'schedule', 'scheduling', 'calendar', 'reminder'],
      response: 'An AI Receptionist can help capture inbound inquiries, answer common questions, schedule appointments, send reminders, and reduce missed follow-ups. It is a practical starting point for service businesses that rely on appointments or consultations.'
    },
    {
      label: 'Marketing + Leads',
      prompt: 'How can AI help with marketing outreach and lead qualification?',
      keywords: ['marketing', 'lead', 'leads', 'outreach', 'crm', 'qualification', 'sales', 'follow up', 'follow-up'],
      response: 'AI can help with targeted outreach, lead intake, qualification, follow-up reminders, CRM enrichment, and content repurposing. The best setup depends on your audience, offer, sales process, and current CRM or spreadsheet workflow.'
    },
    {
      label: 'Internal Knowledge Agent',
      prompt: 'What is an internal knowledge agent?',
      keywords: ['knowledge', 'onboarding', 'sop', 'documents', 'training', 'internal', 'slack', 'whatsapp'],
      response: 'An Internal Knowledge Agent can answer questions from company SOPs, policies, training material, or operational documents. It helps teams find answers faster and supports onboarding without relying on one person to explain everything repeatedly.'
    },
    {
      label: 'Pricing / Cost',
      prompt: 'How much does this cost?',
      keywords: ['price', 'pricing', 'cost', 'fee', 'budget', 'how much', 'quote'],
      response: 'Pricing depends on scope, workflow complexity, integrations, and implementation needs. The best next step is to book a consultation so we can understand your business process and recommend the right starting point.'
    },
    {
      label: 'Book Consultation',
      prompt: 'How do I book a consultation?',
      keywords: ['consultation', 'meeting', 'book', 'call', 'contact', 'phone', 'email'],
      response: 'You can book a consultation from this page. You can also contact Champlain Consulting Services at contactus@champlainconsultingservices.com or call +1 248-688-9569.'
    }
  ];

  const FALLBACK_RESPONSE = 'Thanks for your question. Champlain Consulting Services will review your message and follow up. For faster help, please include your business challenge, desired outcome, and the process you want to improve.';

  const messages = [
    {
      role: 'assistant',
      text: 'Hi, I can help you explore AI agents, AI readiness, or AI-driven project management. What would you like help with?'
    }
  ];

  function getChatbotResponse(message) {
    const normalized = String(message || '').toLowerCase();
    const match = CHATBOT_RESPONSES.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
    return match ? match.response : FALLBACK_RESPONSE;
  }

  function renderQuickReplies() {
    return `<div class="chatbot-quick-replies" aria-label="Suggested chatbot questions">
      ${CHATBOT_RESPONSES.slice(0, 6).map((item) => `<button type="button" data-chatbot-prompt="${escapeHtml(item.prompt)}">${escapeHtml(item.label)}</button>`).join('')}
    </div>`;
  }

  function renderTranscript() {
    transcriptEl.innerHTML = messages.map((message, index) => {
      const roleClass = message.role === 'assistant' ? 'bot' : 'visitor';
      const quickReplies = index === 0 ? renderQuickReplies() : '';
      return `<div class="chat-message ${roleClass}"><span>${escapeHtml(message.text)}</span></div>${quickReplies}`;
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

  function addVisitorPrompt(prompt) {
    const textarea = form.querySelector('textarea[name="message"]');
    if (textarea) {
      textarea.value = prompt;
      textarea.focus();
    }
    messages.push({ role: 'visitor', text: prompt });
    messages.push({ role: 'assistant', text: getChatbotResponse(prompt) });
    renderTranscript();
    status.textContent = 'Add your name and email, then click “Send chat details” so we can follow up.';
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  transcriptEl.addEventListener('click', (event) => {
    const button = event.target.closest('[data-chatbot-prompt]');
    if (button) addVisitorPrompt(button.getAttribute('data-chatbot-prompt'));
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

    const lastVisitorMessage = [...messages].reverse().find((message) => message.role === 'visitor');
    if (!lastVisitorMessage || lastVisitorMessage.text !== payload.message) {
      messages.push({ role: 'visitor', text: payload.message });
      messages.push({ role: 'assistant', text: getChatbotResponse(payload.message) });
    }
    messages.push({ role: 'assistant', text: 'I am also sending your details to Champlain Consulting Services for follow-up.' });
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
