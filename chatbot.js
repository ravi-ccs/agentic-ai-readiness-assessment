(() => {
  const toggle = document.querySelector('[data-chatbot-toggle]');
  const panel = document.querySelector('[data-chatbot-panel]');
  const close = document.querySelector('[data-chatbot-close]');
  const form = document.querySelector('[data-chatbot-form]');
  const status = document.querySelector('[data-chatbot-status]');
  const transcriptEl = document.querySelector('[data-chatbot-transcript]');
  const contactPanel = document.querySelector('[data-chatbot-contact]');

  if (!toggle || !panel || !form || !status || !transcriptEl) return;

  const BOOKING_URL = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI%20Readiness%20Discovery%20Call&details=Discuss%20AI%20Readiness%2C%20Agentic%20AI%20solutions%2C%20and%20implementation%20opportunities%20with%20Champlain%20Consulting%20Services.&add=ravi.bsa%40gmail.com';

  const CHATBOT_RESPONSES = [
    {
      label: 'AI Readiness Assessment',
      prompt: 'Tell me about the AI Readiness Assessment.',
      keywords: ['assessment', 'readiness', 'audit', 'diagnostic', 'roadmap', 'where to start'],
      response: 'The AI Readiness Assessment helps identify where AI agents and automation can improve revenue, customer experience, operating cost, and productivity before you invest in implementation. You get prioritized use cases, KPIs, integration considerations, and a practical first-sprint roadmap. Would you like to discuss which workflow in your business is the best starting point?'
    },
    {
      label: 'AI for SMBs',
      prompt: 'How can AI help my SMB?',
      keywords: ['smb', 'small business', 'business', 'ai help', 'use ai', 'agentic ai', 'growth'],
      response: 'AI can help SMBs reduce manual work, respond faster to customers, qualify leads, summarize information, and improve reporting without adding unnecessary headcount. The best starting point is usually one repeatable workflow with clear business value. What process takes the most time in your business today?'
    },
    {
      label: 'AI Agents',
      prompt: 'What AI agents can help my business?',
      keywords: ['ai agent', 'agents', 'automation', 'workflow', 'workflows', 'automate', 'bot'],
      response: 'Practical AI agents can help with customer support, lead intake, appointment booking, internal knowledge search, proposal support, project reporting, and operations follow-up. Champlain Consulting Services starts with a focused use case so the result is measurable and manageable. Which function would you like to improve first?'
    },
    {
      label: 'AI-Driven PMO',
      prompt: 'How can AI help project management or PMO?',
      keywords: ['project management', 'pmo', 'portfolio', 'delivery', 'raid', 'resource', 'executive reporting', 'benefits', 'program'],
      response: 'AI-driven PMO support can improve portfolio visibility, RAID tracking, resource planning, executive reporting, benefits realization, and meeting follow-through. The goal is clearer delivery signals and faster leadership decisions. Are you trying to improve project execution, reporting, or portfolio governance?'
    },
    {
      label: 'Process Automation',
      prompt: 'Can you help automate or optimize business processes?',
      keywords: ['process', 'optimization', 'improve process', 'business process', 'efficiency', 'manual', 'handoff', 'bottleneck', 'operations'],
      response: 'Yes. We look for repetitive work, manual handoffs, slow response loops, duplicate data entry, and reporting friction. Then we identify where AI workflows or agents can reduce effort, improve quality, and make performance easier to measure. What process feels most manual or slow right now?'
    },
    {
      label: 'Customer Support Bot',
      prompt: 'Can you build a customer support bot?',
      keywords: ['customer support', 'support bot', 'chatbot', 'faq', 'ticket', 'tickets', 'escalation', '24/7', 'customer service'],
      response: 'Yes. An agentic customer support bot can answer FAQs, capture requests, route issues, and escalate complex items to the right person. It is useful when you want faster response and better intake without increasing support workload. Do you already have FAQs, SOPs, or support documents we can use?'
    },
    {
      label: 'AI Receptionist',
      prompt: 'Can you build an AI receptionist or appointment assistant?',
      keywords: ['receptionist', 'appointment', 'booking', 'schedule', 'scheduling', 'calendar', 'reminder', 'missed call'],
      response: 'Yes. An AI receptionist can capture inbound inquiries, answer common questions, collect visitor details, schedule appointments, and reduce missed follow-ups. It is a strong fit for service businesses that depend on consultations or appointments. Would you like this connected to your calendar or CRM?'
    },
    {
      label: 'Marketing + Leads',
      prompt: 'How can AI help with marketing and lead follow-up?',
      keywords: ['marketing', 'lead', 'leads', 'outreach', 'crm', 'qualification', 'sales', 'follow up', 'follow-up', 'campaign'],
      response: 'AI can help with lead intake, qualification, follow-up reminders, CRM updates, targeted outreach, and content repurposing. A good setup keeps the human relationship while automating repetitive steps. Where are leads currently getting delayed or lost?'
    },
    {
      label: 'Knowledge Agent',
      prompt: 'What is an internal knowledge agent?',
      keywords: ['knowledge', 'onboarding', 'sop', 'documents', 'training', 'internal', 'policy', 'policies', 'manual'],
      response: 'An internal knowledge agent answers employee questions from approved SOPs, policies, training material, and operational documents. It helps teams find answers faster and supports onboarding without relying on one person to explain the same information repeatedly. What documents or knowledge sources would you want it to use?'
    },
    {
      label: 'Pricing / Cost',
      prompt: 'How much does an AI solution cost?',
      keywords: ['price', 'pricing', 'cost', 'fee', 'budget', 'how much', 'quote', 'estimate'],
      response: 'Cost depends on scope, workflow complexity, integrations, data readiness, and support needs. The best next step is a short consultation so Champlain Consulting Services can recommend the right starting point instead of guessing. Would you like to book a 30-minute AI discovery call?'
    },
    {
      label: 'Timeline',
      prompt: 'How long does implementation take?',
      keywords: ['timeline', 'how long', 'duration', 'implementation', 'deploy', 'launch', 'time'],
      response: 'Timeline depends on the use case and integrations. A focused assessment or prototype can usually move faster than a multi-system implementation. The recommended approach is to start with one high-value workflow, prove the value, then scale. What result would you want to see first?'
    },
    {
      label: 'Book Consultation',
      prompt: 'I want to book a consultation.',
      keywords: ['consultation', 'meeting', 'book', 'call', 'contact', 'phone', 'email', 'schedule'],
      response: `You can book a 30-minute AI discovery call here: ${BOOKING_URL}. You can also email contactus@champlainconsultingservices.com or call +1 248-688-9569. If you share your name and email here, we can also capture your chat details for follow-up.`
    }
  ];

  const FALLBACK_RESPONSE = 'That is a good question. I can capture it for Champlain Consulting Services and Ravi can follow up with a specific answer. Please share a little context about your business goal, workflow, or challenge so we can recommend the right next step.';
  const LEAD_PROMPT = 'I can help with that. May I have your name and email ID so Ravi can follow up with relevant next steps? You can continue asking questions here too.';

  const messages = [
    { role: 'assistant', text: 'How may I help you' }
  ];

  let visitorMessageCount = 0;
  let leadPromptShown = false;
  let leadCaptured = false;
  let lastSubmittedTranscript = '';

  function getChatbotResponse(message) {
    const normalized = String(message || '').toLowerCase();
    const match = CHATBOT_RESPONSES.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));
    return match ? match.response : FALLBACK_RESPONSE;
  }

  function renderQuickReplies() {
    const featured = ['AI Readiness Assessment', 'AI for SMBs', 'AI Agents', 'Customer Support Bot', 'Pricing / Cost', 'Book Consultation'];
    const options = featured
      .map((label) => CHATBOT_RESPONSES.find((item) => item.label === label))
      .filter(Boolean);
    return `<div class="chatbot-quick-replies" aria-label="Suggested chatbot questions">
      ${options.map((item) => `<button type="button" data-chatbot-prompt="${escapeHtml(item.prompt)}">${escapeHtml(item.label)}</button>`).join('')}
    </div>`;
  }

  function renderTranscript() {
    transcriptEl.innerHTML = messages.map((message, index) => {
      const roleClass = message.role === 'assistant' ? 'bot' : 'visitor';
      const quickReplies = index === 0 ? renderQuickReplies() : '';
      return `<div class="chat-message ${roleClass}"><span>${linkify(escapeHtml(message.text))}</span></div>${quickReplies}`;
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

  function linkify(value) {
    return String(value).replace(/https:\/\/calendar\.google\.com\/calendar\/render\?[^\s]+/g, (url) => `<a href="${url}" target="_blank" rel="noopener">Book the AI discovery call</a>`);
  }

  function showContactPanel() {
    if (contactPanel) contactPanel.hidden = false;
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.textContent = 'Send message + details';
  }

  function getPayload(messageText) {
    const formData = new FormData(form);
    return {
      timestamp: new Date().toISOString(),
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(messageText || formData.get('message') || '').trim(),
      pageUrl: window.location.href,
      transcript: messages.map((message) => `${message.role}: ${message.text}`).join('\n')
    };
  }

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const first = panel.querySelector('textarea[name="message"], button');
      if (first) setTimeout(() => first.focus(), 80);
    }
  }

  function addVisitorPrompt(prompt) {
    const cleanedPrompt = String(prompt || '').trim();
    if (!cleanedPrompt) return;

    visitorMessageCount += 1;
    messages.push({ role: 'visitor', text: cleanedPrompt });
    messages.push({ role: 'assistant', text: getChatbotResponse(cleanedPrompt) });

    if (!leadPromptShown) {
      leadPromptShown = true;
      showContactPanel();
      messages.push({ role: 'assistant', text: LEAD_PROMPT });
      status.textContent = 'Optional: add your name and email so Ravi can follow up with relevant next steps.';
    } else if (!leadCaptured) {
      status.textContent = 'You can keep asking questions. Add your name and email anytime to send the chat for follow-up.';
    }

    renderTranscript();
    const textarea = form.querySelector('textarea[name="message"]');
    if (textarea) {
      textarea.value = '';
      textarea.focus();
    }
  }

  async function submitLeadIfReady(latestMessage) {
    const payload = getPayload(latestMessage);
    if (!payload.name || !payload.email) return false;

    if (payload.transcript === lastSubmittedTranscript && leadCaptured) {
      status.textContent = 'Thanks — your latest chat details have already been submitted.';
      return true;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    status.textContent = 'Sending chat details...';

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

      leadCaptured = true;
      lastSubmittedTranscript = payload.transcript;
      status.textContent = 'Thanks — your chat details were submitted. You can continue asking questions here.';
      return true;
    } catch (error) {
      console.error(error);
      status.textContent = 'The chatbot could not submit details right now. Please email contactus@champlainconsultingservices.com or call +1 248-688-9569.';
      return false;
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  transcriptEl.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-chatbot-prompt]');
    if (!button) return;
    addVisitorPrompt(button.getAttribute('data-chatbot-prompt'));
    await submitLeadIfReady(button.getAttribute('data-chatbot-prompt'));
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const textarea = form.querySelector('textarea[name="message"]');
    const messageText = String(textarea?.value || '').trim();

    if (!messageText) {
      status.textContent = 'Please type a question or choose a suggested topic.';
      return;
    }

    addVisitorPrompt(messageText);
    await submitLeadIfReady(messageText);
  });

  form.addEventListener('change', async (event) => {
    if (!event.target.matches('input[name="name"], input[name="email"], input[name="phone"]')) return;
    if (visitorMessageCount > 0) await submitLeadIfReady('Visitor shared contact details.');
  });

  renderTranscript();
})();
