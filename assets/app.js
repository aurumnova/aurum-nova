
"use strict";

/* =============================================
   CONTENIDO ESCALABLE ÔÇö edit these arrays
   Agrega/edita proyectos, avances y posts aqu├¡
   ============================================= */

const PROJECTS = [
  {
    title: "Pr├│ximamente ÔÇö casos de estudio",
    category: "En construcci├│n",
    desc: "Estoy seleccionando proyectos piloto con empresas y microempresas para los pr├│ximos meses. Si ten├®s un problema de ventas, procesos o datos, contactame: estoy aceptando proyectos de casos de estudio con condici├│n especial. ├ürea: mercado hispano (Ecuador, Latinoam├®rica, Espa├▒a) y clientes en ingl├®s cuando el idioma no es barrera.",
    more: "Quiero ser caso ÔåÆ",
    img: "",
    metrics: [
      { v: "Piloto", l: "Proyectos abiertos" },
      { v: "Condici├│n", l: "Especial de lanzamiento" },
      { v: "Global", l: "Espa├▒ol ┬À Ingl├®s" }
    ]
  }
];

const TIMELINE = [
  { date: "2026", title: "Inicio de AURUM NOVA", desc: "Fundaci├│n de la empresa. CEO / fundador. Trabajo solo, modelo escalable a equipo. Posicionamiento global ÔÇö mercado hispano + clientes en ingl├®s.", done: true, status: "live" },
  { date: "2026", title: "Primer proyecto piloto global", desc: "Primera implementaci├│n con empresa/microempresa. Aceptando proyectos piloto de casos de estudio con condici├│n especial. Enfocado en chatbot/automatizaci├│n de leads y auditor├¡a IA.", done: false, status: "planned" },
  { date: "2026", title: "Casos en espa├▒ol e ingl├®s", desc: "Primeros case studies publicados ÔÇö clientes en mercado hispano y en ingl├®s. Construyendo prueba social para escalar a m├ís clientes globales.", done: false, status: "planned" },
  { date: "2026", title: "Formaci├│n de equipo", desc: "Cuando el volumen lo pida, incorporaci├│n de socios/equipo para escalar servicios a m├ís clientes simult├íneos.", done: false, status: "planned" }
];

const BLOG = [
  { date: "Oct 2026", title: "Arquitectura de Agentes Aut├│nomos de Venta: WhatsApp sin alucinaciones", desc: "Dise├▒o de sistemas de contenci├│n en 3 capas en el Edge: filtros anti-inyecci├│n, esquemas JSON estrictos y fallbacks determin├¡sticos para cualificar clientes 24/7 sin inventar precios.", link: "blog/arquitectura-agentes-autonomos-ventas-whatsapp-sin-alucinaciones.html", draft: false },
  { date: "Oct 2026", title: "Automatizaci├│n con IA vs. Empleados Virtuales: Qu├® tareas automatizar primero", desc: "La matriz de fricci├│n para due├▒os de empresas: aprende a descomponer procesos en micro-automatizaciones antes de inflar la n├│mina con contrataciones burocr├íticas.", link: "blog/automatizacion-ia-vs-empleados-virtuales-que-automatizar-primero.html", draft: false },
  { date: "Sep 2026", title: "C├│mo aplico IA a ventas sin perder el toque humano", desc: "Mi enfoque para usar inteligencia artificial en ventas, leads y procesos ÔÇö lo que funciona, lo que no, y c├│mo lo aplico con empresas y microempresas.", link: "blog/como-aplico-ia-ventas-sin-perder-el-toque-humano.html", draft: false },
  { date: "Sep 2026", title: "C├│mo usar IA para segmentar leads sin depender de un CRM caro", desc: "Tres formas pr├ícticas de segmentar y priorizar leads usando herramientas de IA accesibles, sin comprar software costoso. Para empresas y microempresas.", link: "blog/como-usar-ia-para-segmentar-leads-sin-depender-de-un-crm-caro.html", draft: false }
];

/* ---------- Render portfolio ---------- */
const portfolioGrid = document.getElementById('portfolioGrid');
if (portfolioGrid) {
  if (PROJECTS.length === 0) {
    portfolioGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:54px 20px;color:var(--text-dim);border:1px dashed var(--border);border-radius:var(--radius);position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:3px;height:0;background:linear-gradient(180deg,var(--gold-2),var(--gold-3))"></div>
        <div style="font-size:1.8rem;color:var(--gold);margin-bottom:10px;font-family:var(--serif);font-style:italic">ÔÇó</div>
        <p style="font-family:var(--mono);font-size:0.76rem;letter-spacing:0.12em">PORTAFOLIO EN CONSTRUCCI├ôN</p>
        <p style="font-size:0.9rem;margin-top:8px;color:var(--text-muted)">Pr├│ximamente casos de estudio reales con clientes en mercado hispano e ingl├®s.<br>Edita el array <code style="color:var(--gold)">PROJECTS</code> en este archivo para agregarlos.</p>
      </div>`;
  } else {
    portfolioGrid.innerHTML = PROJECTS.map(function(p) {
      return `
        <article class="project-card editorial-card">
          <div class="project-thumb" style="background:${p.img ? 'url('+p.img+') center/cover' : 'linear-gradient(135deg,#191930,#060610)'}">
            ${p.img ? '' : '<svg height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'}
            <span class="thumb-label">${p.category || 'PROYECTO'}</span>
          </div>
          <div class="project-body">
            <span class="pe">${p.category || 'Proyecto'}</span>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            ${p.metrics && p.metrics.length ? `
            <div class="metrics">
              ${p.metrics.map(function(m) { return `<div class="m"><span class="v">${m.v}</span><span class="l">${m.l}</span></div>`; }).join('')}
            </div>` : ''}
            <a href="#contact" class="more">${p.more}</a>
          </div>
        </article>`;
    }).join('');
  }
}

/* ---------- Render timeline ---------- */
const timelineWrap = document.getElementById('timelineWrap');
const timelineLine = document.getElementById('timelineLine');
const timelineLineDone = document.getElementById('timelineLineDone');
if (timelineWrap) {
  const hasDone = TIMELINE.some(function(t) { return t.done; });
  timelineLine.style.display = hasDone ? 'none' : '';
  timelineLineDone.style.display = hasDone ? '' : 'none';
  timelineWrap.querySelectorAll('.timeline-item, .timeline-line, .timeline-line-done').forEach(function(el) { el.remove(); });
  timelineWrap.insertAdjacentHTML('beforeend', TIMELINE.map(function(t) {
    return `
      <div class="timeline-item ${t.done ? 'done' : ''}">
        <div class="timeline-dot"></div>
        <div>
          <div class="timeline-date">${t.date}</div>
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
          <div class="status ${t.status || ''}"><span class="s-dot"></span>${t.status === 'live' ? 'En progreso' : t.status === 'planned' ? 'Pr├│ximamente' : 'Pendiente'}</div>
        </div>
      </div>`;
  }).join(''));
}

/* ---------- Render blog ---------- */
const blogList = document.getElementById('blogList');
if (blogList) {
  if (BLOG.length === 0) {
    blogList.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:54px 20px;color:var(--text-dim);border:1px dashed var(--border);border-radius:var(--radius);position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;width:3px;height:0;background:linear-gradient(180deg,var(--gold-2),var(--gold-3))"></div>
        <div style="font-size:1.8rem;color:var(--gold);margin-bottom:10px;font-family:var(--serif);font-style:italic">ÔÇó</div>
        <p style="font-family:var(--mono);font-size:0.76rem;letter-spacing:0.12em">BLOG EN CONSTRUCCI├ôN</p>
        <p style="font-size:0.9rem;margin-top:8px;color:var(--text-muted)">Pr├│ximamente publicaciones. Edita el array <code style="color:var(--gold)">BLOG</code> en este archivo.</p>
      </div>`;
  } else {
    blogList.innerHTML = BLOG.map(function(b) {
      return `
        <article class="blog-item">
          <div class="meta">
            <span>${b.date}</span>
            ${b.draft ? '<span class="draft">Borrador</span>' : '<span>Publicado</span>'}
          </div>
          <h3>${b.title}</h3>
          <p>${b.desc}</p>
          <a href="${b.link}" class="read-more">${b.draft ? 'Leer borrador' : 'leer ÔåÆ'}</a>
        </article>`;
    }).join('');
  }
}

/* ---------- Scroll reveal ÔÇö ROBUSTO ---------- */
(function() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    for (let i = 0; i < revealEls.length; i++) {
      const el = revealEls[i];
      el.classList.add('visible');
      el.style.transform = '';
      el.style.opacity = '';
    }
    try {
      const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('visible');
          }
        }
      }, { threshold: 0.05, rootMargin: '0px 0px -15px 0px' });
      for (let i = 0; i < revealEls.length; i++) {
        observer.observe(revealEls[i]);
      }
    } catch (err) {
      console.warn('Scroll reveal: usando modo fallback (IntersectionObserver no disponible)');
    }
  }
})();

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  const menuIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const firstMenuLink = mobileMenu.querySelector('a');

  function setMenuOpen(open, returnFocus) {
    mobileMenu.style.display = open ? 'flex' : 'none';
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir men├║');
    menuToggle.innerHTML = open ? closeIcon : menuIcon;

    if (open && firstMenuLink) {
      window.setTimeout(function() {
        firstMenuLink.focus();
      }, 0);
    } else if (returnFocus) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener('click', function() {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen, isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      setMenuOpen(false, false);
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      e.stopPropagation();
      setMenuOpen(false, true);
    }
  });
}

/* ---------- Helper: Sesi├│n Criptogr├ífica (Bootstrap & Token Opaco) ---------- */
const WORKER_BASE_URL = 'https://aurum-nova-ai-sales-worker.aurum-nova.workers.dev';
const SESSION_STORAGE_KEY = 'aurum_nova_session_id';

function isValidSessionToken(token) {
  if (typeof token !== 'string' || !token.startsWith('an_sess_')) {
    return false;
  }
  // Formato v2: an_sess_<uuid>.<firma>.<expiraci├│n>
  const parts = token.trim().split('.');
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

async function getOrBootstrapSession() {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY);

  // Un token v├ílido debe ser opaco y tener exactamente tres segmentos.
  if (isValidSessionToken(stored)) {
    return stored.trim();
  }

  // Si no hay token o es un identificador legacy sin firma, se solicita bootstrap expl├¡cito al servidor
  try {
    const res = await fetch(WORKER_BASE_URL + '/api/v1/session/bootstrap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error('Bootstrap failed with status ' + res.status);
    }
    const data = await res.json();
    if (data && isValidSessionToken(data.sessionToken)) {
      localStorage.setItem(SESSION_STORAGE_KEY, data.sessionToken.trim());
      return data.sessionToken.trim();
    }
    throw new Error('Bootstrap response missing a valid sessionToken');
  } catch (err) {
    console.warn('Error en bootstrap de sesi├│n:', err);
    throw err;
  }
}

async function fetchWithSessionRetry(url, makeOptions) {
  let sessionId = await getOrBootstrapSession();
  let response = await fetch(url, makeOptions(sessionId));

  // During a worker/frontend cutover an old token can produce a 401.
  // Re-bootstrap and retry exactly once with the same payload so the user
  // does not lose a chat message or a contact-form submission.
  if (response.status === 401) {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionId = await getOrBootstrapSession();
    response = await fetch(url, makeOptions(sessionId));
  }

  return response;
}

function getSessionId() {
  // Para compatibilidad sincr├│nica cuando ya existe en localStorage
  const token = localStorage.getItem(SESSION_STORAGE_KEY);
  return isValidSessionToken(token) ? token.trim() : null;
}

function setSessionToken(token) {
  if (isValidSessionToken(token)) {
    localStorage.setItem(SESSION_STORAGE_KEY, token.trim());
  }
}

/* ---------- Form handler ÔÇö env├¡a al Cloudflare Worker (D1 Leads) ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Rate limit por sesi├│n: 1 submit / 30s
  const SUBMIT_COOLDOWN_MS = 30000;
  let lastSubmitTs = 0;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const now = Date.now();
    const btn = this.querySelector('button[type=submit]');
    const note = this.querySelector('.form-note');
    if (now - lastSubmitTs < SUBMIT_COOLDOWN_MS) {
      showFormError('Por favor espera unos segundos antes de reintentar.');
      return;
    }
    const nameInput = this.querySelector('#f-name');
    const emailInput = this.querySelector('#f-email');
    const msgInput = this.querySelector('#f-msg');
    const hpInput = this.querySelector('#f-hp');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const msg = msgInput ? msgInput.value.trim() : '';
    const company = (this.querySelector('#f-company')?.value || '').trim();
    const phone = (this.querySelector('#f-phone')?.value || '').trim();
    const topic = this.querySelector('#f-topic')?.value || '';

    // Honeypot check ÔÇö abort silently if filled (bot)
    if (hpInput && hpInput.value !== '') {
      console.debug('Honeypot triggered');
      return;
    }

    function showFormError(message, inputToFocus) {
      if (note) {
        note.textContent = 'ÔÜá ' + message;
        note.style.color = '#ff6b6b';
      }
      if (inputToFocus) {
        inputToFocus.focus();
        inputToFocus.style.borderColor = '#ff6b6b';
        setTimeout(() => inputToFocus.style.borderColor = '', 3500);
      }
    }

    // Validaci├│n robusta
    if (!name || name.length > 120) { showFormError('Nombre requerido (m├íx 120 caracteres).', nameInput); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) { showFormError('Email inv├ílido.', emailInput); return; }
    if (!msg || msg.length > 5000) { showFormError('Mensaje requerido (m├íx 5000 caracteres).', msgInput); return; }
    if (phone && !/^\+?[1-9]\d{6,14}$/.test(phone.replace(/[\s-]/g, ''))) { showFormError('Tel├®fono en formato E.164 (ej: +593981138814).', this.querySelector('#f-phone')); return; }
    const allowedTopics = ['audit', 'pipeline', 'content', 'consulting', 'other', ''];
    if (!allowedTopics.includes(topic)) { showFormError('Tema no v├ílido.'); return; }

    // Sanitizaci├│n b├ísica (escape HTML para reflejo seguro)
    const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMsg = escapeHtml(msg);
    const safeCompany = escapeHtml(company);
    const safePhone = escapeHtml(phone);
    const safeTopic = escapeHtml(topic);

    btn.disabled = true;
    btn.textContent = 'EnviandoÔÇª';
    note.textContent = '';
    note.style.color = '';

    try {
      const res = await fetchWithSessionRetry(
        WORKER_BASE_URL + '/api/v1/leads',
        (sessionId) => ({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            sessionId,
            name: safeName,
            email: safeEmail,
            company: safeCompany || undefined,
            need: safeMsg,
            source: 'contact-form',
            hp: hpInput ? hpInput.value : undefined,
            metadata: { phone: safePhone, topic: safeTopic }
          })
        })
      );
      // No loggear data en producci├│n
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.status === 'created' || data.status === 'updated' || data.leadId)) {
        if (data.sessionId) {
          setSessionToken(data.sessionId);
        }
        lastSubmitTs = now;
        const topicLabels = {
          audit: 'IA Growth Audit',
          pipeline: 'Pipeline IA',
          content: 'Content Engine IA',
          consulting: 'Consultor├¡a estrat├®gica IA',
          other: 'Otro servicio'
        };
        const programName = topicLabels[topic] || (topic ? topic : 'un servicio de IA');
        let waText = `Hola Angel, soy ${name}`;
        if (company) waText += ` de ${company}`;
        waText += `. Acabo de enviar el formulario para ${programName} y me gustar├¡a confirmar mi prioridad.`;
        const waUrl = `https://wa.me/593981138814?text=${encodeURIComponent(waText)}`;

        if (typeof window.trackAurumEvent === 'function') {
          window.trackAurumEvent('generate_lead', {
            service: programName,
            source: 'contact_form'
          });
        }

        note.innerHTML = `Ô£ô Gracias, ${safeName.split(' ')[0]}. Tu consulta fue registrada.<br><a href="${waUrl}" target="_blank" rel="noopener" style="color: var(--gold); text-decoration: underline; font-weight: 600; display: inline-block; margin-top: 6px;">ÔåÆ ┬┐Quieres acelerar tu diagn├│stico? Haz clic aqu├¡ para confirmar tu prioridad por WhatsApp ahora mismo</a>`;
        note.style.color = 'var(--gold)';
        btn.textContent = 'Enviado ÔÇö gracias';
        setTimeout(() => {
          btn.textContent = 'Enviar ÔÇö Agendar una reuni├│n';
          note.style.color = '';
          note.textContent = 'Ôåô tus datos no se comparten. Respuesta en < 24 h h├íbiles.';
          contactForm.reset();
          btn.disabled = false;
        }, 15000);
      } else {
        if (res.status === 401) {
          localStorage.removeItem(SESSION_STORAGE_KEY);
          showFormError('Tu sesi├│n previa ha expirado por seguridad. Haz clic en "Enviar" nuevamente para renovarla.');
        } else if (res.status === 429) {
          showFormError('Has alcanzado el l├¡mite de intentos. Por favor espera un minuto antes de reintentar.');
        } else {
          showFormError('Hubo un inconveniente. Intenta de nuevo o cont├íctanos por WhatsApp.');
        }
        btn.disabled = false;
        btn.textContent = 'Enviar ÔÇö Agendar una reuni├│n';
      }
    } catch (err) {
      // Silenciar detalles internos
      showFormError('Error de conexi├│n. Intenta de nuevo o escr├¡benos a WhatsApp.');
      btn.disabled = false;
      btn.textContent = 'Enviar ÔÇö Agendar una reuni├│n';
    }
  });
}

/* ---------- AI Sales Chat Widget Handler ---------- */
function initAIChatWidget() {
  const toggleBtn = document.getElementById('aiChatToggle');
  const chatBox = document.getElementById('aiChatBox');
  const closeBtn = document.getElementById('aiChatCloseBtn');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');
  const sendBtn = document.getElementById('aiChatSendBtn');
  const messagesContainer = document.getElementById('aiChatMessages');
  const iconOpen = document.getElementById('aiChatIconOpen');
  const iconClose = document.getElementById('aiChatIconClose');

  if (!toggleBtn || !chatBox || !chatForm || !chatInput || !messagesContainer) return;

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Plan 3: restaura el historial del visitante al abrir el chat.
  // Best-effort: si no hay token o algo falla, se conserva el welcome + chips.
  async function restoreChatHistory() {
    const token = getSessionId();
    if (!token) return;

    try {
      const res = await fetch(
        WORKER_BASE_URL + '/api/v1/chat/history?page=1&limit=100',
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      if (!res.ok) return;

      const data = await res.json().catch(() => null);
      if (!data || !Array.isArray(data.messages)) return;

      const msgs = data.messages;
      if (msgs.length === 0) return;

      messagesContainer.innerHTML = '';
      msgs.forEach((m) => {
        appendMessage(m.content, m.role === 'assistant' ? 'bot' : 'user');
      });
      scrollToBottom();
    } catch (err) {
      console.warn('Chat history restore failed:', err);
    }
  }

  async function toggleChat(open) {
    const isCurrentlyOpen = chatBox.style.display !== 'none';
    const shouldOpen = typeof open === 'boolean' ? open : !isCurrentlyOpen;
    if (shouldOpen) {
      chatBox.style.display = 'flex';
      chatBox.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Cerrar asistente de ventas IA');
      if (iconOpen) iconOpen.style.display = 'none';
      if (iconClose) iconClose.style.display = 'block';
      if (window.AurumAudio && typeof window.AurumAudio.playChatOpenSound === 'function') {
        window.AurumAudio.playChatOpenSound();
      }
      if (typeof window.trackAurumEvent === 'function') {
        window.trackAurumEvent('chat_opened');
      }
      await restoreChatHistory();
      setTimeout(function() {
        chatInput.focus();
        scrollToBottom();
      }, 50);
    } else {
      chatBox.style.display = 'none';
      chatBox.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Abrir asistente de ventas IA');
      if (iconOpen) iconOpen.style.display = 'block';
      if (iconClose) iconClose.style.display = 'none';
      if (window.AurumAudio && typeof window.AurumAudio.playClickSound === 'function') {
        window.AurumAudio.playClickSound();
      }
    }
  }

  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleChat();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleChat(false);
      toggleBtn.focus();
    });
  }

  // Accesibilidad: Escape solo cierra el chat cuando el foco esta dentro del panel.
  chatBox.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      toggleChat(false);
      toggleBtn.focus();
    }
  });

  function formatBotMessage(text) {
    if (!text) return '';
    // 1. Escapar HTML para evitar XSS
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // 2. Formatear negritas: **texto**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 3. Convertir URLs en enlaces seguros con acento dorado
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, "<a href='$1' target='_blank' rel='noopener noreferrer' style='color:var(--gold);text-decoration:underline;font-weight:600;'>$1</a>");

    // 4. Convertir tel├®fono de WhatsApp en enlace directo
    safe = safe.replace(/(\+593\s*98\s*113\s*8814|098\s*113\s*8814|\+593\s*99\s*419\s*5932)/g, '<a href="https://wa.me/593981138814?text=Hola%20Angel,%20vengo%20del%20asistente%20web%20de%20Aurum%20Nova" target="_blank" rel="noopener noreferrer" style="color:var(--gold);font-weight:600;border-bottom:1px dashed var(--gold);text-decoration:none;">$1 Ôåù</a>');

    // 5. Saltos de l├¡nea
    safe = safe.replace(/\n/g, '<br>');
    return safe;
  }

  function appendMessage(text, role) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg ' + (role === 'user' ? 'ai-msg-user' : 'ai-msg-bot');
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    if (role === 'bot') {
      bubble.innerHTML = formatBotMessage(text);
    } else {
      bubble.textContent = text;
    }
    msgDiv.appendChild(bubble);
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
    return msgDiv;
  }

  function bindChips() {
    const chips = messagesContainer.querySelectorAll('.ai-chat-chip');
    chips.forEach(function(chip) {
      if (chip.__bound) return;
      chip.__bound = true;
      chip.addEventListener('click', function(e) {
        e.preventDefault();
        const prompt = chip.getAttribute('data-prompt');
        if (!prompt) return;
        chatInput.value = prompt;
        chatForm.dispatchEvent(new Event('submit', { cancelable: true }));
      });
    });
  }

  let loadingEl = null;
  function showLoading() {
    if (loadingEl) return;
    loadingEl = document.createElement('div');
    loadingEl.className = 'ai-msg ai-msg-bot';
    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble ai-msg-loading';
    bubble.innerHTML = '<span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span>';
    loadingEl.appendChild(bubble);
    messagesContainer.appendChild(loadingEl);
    scrollToBottom();
  }

  function hideLoading() {
    if (loadingEl && loadingEl.parentNode) {
      loadingEl.parentNode.removeChild(loadingEl);
    }
    loadingEl = null;
  }

  chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const now = Date.now();
    const CHAT_COOLDOWN_MS = 2000;
    if (window.__lastChatTs && now - window.__lastChatTs < CHAT_COOLDOWN_MS) {
      appendMessage('Por favor espera un segundo antes de enviar otro mensaje.', 'bot');
      return;
    }

    const text = chatInput.value.trim();
    if (!text) return;
    if (text.length > 500) { appendMessage('Mensaje muy largo (m├íx 500 caracteres).', 'bot'); return; }

    // Sanitizar entrada
    const escapeHtml = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    const safeText = escapeHtml(text);

    appendMessage(safeText, 'user');
    if (typeof window.trackAurumEvent === 'function') {
      window.trackAurumEvent('chat_message_sent', { message_length: text.length });
    }
    if (window.AurumAudio && typeof window.AurumAudio.playMessageSentSound === 'function') {
      window.AurumAudio.playMessageSentSound();
    }
    chatInput.value = '';
    chatInput.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    showLoading();

    try {
      const res = await fetchWithSessionRetry(
        WORKER_BASE_URL + '/api/v1/chat',
        (sessionId) => ({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            sessionId,
            message: safeText
          })
        })
      );
      const data = await res.json().catch(() => ({}));
      hideLoading();
      window.__lastChatTs = now;
      chatInput.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      chatInput.focus();
      if (res.ok && data.response) {
        if (data.sessionId) {
          setSessionToken(data.sessionId);
        }
        appendMessage(data.response, 'bot');
        if (window.AurumAudio && typeof window.AurumAudio.playMessageReceivedSound === 'function') {
          window.AurumAudio.playMessageReceivedSound();
        }
      } else {
        if (res.status === 401) {
          localStorage.removeItem(SESSION_STORAGE_KEY);
          appendMessage('Tu sesi├│n ha expirado por seguridad. Env├¡a un nuevo mensaje para iniciar una conversaci├│n protegida.', 'bot');
        } else if (res.status === 429) {
          appendMessage('Has enviado demasiados mensajes. Por favor espera un momento antes de continuar.', 'bot');
        } else {
          appendMessage('Disculpa, no pude procesar tu mensaje. Reintenta o cont├íctanos por WhatsApp.', 'bot');
        }
      }
    } catch (err) {
      hideLoading();
      appendMessage('Error de conexi├│n. Reintenta en unos instantes o escr├¡benos a WhatsApp.', 'bot');
    } finally {
      chatInput.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      chatInput.focus();
      scrollToBottom();
    }
  });

  bindChips();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAIChatWidget);
} else {
  initAIChatWidget();
}

/* ---------- Smooth anchor navigation ÔÇö ROBUSTO ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    let target = a.getAttribute('data-target') || a.getAttribute('href');
    if (target && target.length > 1) {
      if (!target.startsWith('#')) target = '#' + target;
      try {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {
        // Fallback for non-standard selector
      }
    }
  });
});

/* ---------- Auto-selecci├│n de programa en formulario de contacto ---------- */
document.querySelectorAll('a[data-select-topic]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const topic = link.getAttribute('data-select-topic');
    const topicSelect = document.getElementById('f-topic');
    if (topicSelect && topic) {
      topicSelect.value = topic;
      topicSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const nameInput = document.getElementById('f-name');
    if (nameInput) {
      setTimeout(function() {
        nameInput.focus();
      }, 450);
    }
  });
});

/* ---------- Theme switcher ---------- */
const themeToggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const moonIcon = document.getElementById("themeIconMoon");
  const sunIcon = document.getElementById("themeIconSun");
  if (moonIcon && sunIcon) {
    if (theme === "dark") {
      moonIcon.style.display = "";
      sunIcon.style.display = "none";
    } else {
      moonIcon.style.display = "none";
      sunIcon.style.display = "";
    }
  }
};

if (currentTheme) {
  setTheme(currentTheme);
} else {
  setTheme(prefersDark.matches ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

/* ---------- Floating Nav Scroll Compression ---------- */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (window.scrollY > 30) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* =============================================
   TACTILE MICRO-AUDIO ENGINE (Web Audio API)
   Generates pure synthetic tactile clicks - 0 external files
   ============================================= */

(function initTactileAudio() {
  let audioCtx = null;
  let soundEnabled = true;

  try {
    const saved = localStorage.getItem('aurum_sound_enabled');
    if (saved !== null) soundEnabled = saved === 'true';
  } catch(e) {}

  const soundBtn = document.getElementById('soundToggle');
  const iconOn = document.getElementById('soundIconOn');
  const iconOff = document.getElementById('soundIconOff');

  function updateIcons() {
    if (iconOn && iconOff) {
      iconOn.style.display = soundEnabled ? 'block' : 'none';
      iconOff.style.display = soundEnabled ? 'none' : 'block';
    }
    if (soundBtn) {
      soundBtn.setAttribute('title', soundEnabled ? 'Sonido t├íctil activado (clic para silenciar)' : 'Sonido silenciado (clic para activar)');
      soundBtn.setAttribute('aria-label', soundEnabled ? 'Silenciar sonidos t├íctiles' : 'Activar sonidos t├íctiles');
    }
  }
  updateIcons();

  if (soundBtn) {
    soundBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      soundEnabled = !soundEnabled;
      try { localStorage.setItem('aurum_sound_enabled', soundEnabled); } catch(e) {}
      updateIcons();
      if (soundEnabled) playClickSound();
    });
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) {
        audioCtx = new AudioClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Soft mechanical click (sine tone dropping 850Hz -> 300Hz in 15ms)
  function playClickSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.02);
    } catch(e) {}
  }

  // Quiet tactile whisper on hover (triangle chirp 1400Hz -> 1800Hz in 10ms at 0.012 volume)
  function playHoverSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.01);

      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.014);
    } catch(e) {}
  }

  // Subtle ascending blip on message send (sine tone 420Hz -> 680Hz in 35ms)
  function playMessageSentSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch(e) {}
  }

  // Crystalline concierge chime on message receive (two harmonious sine tones: 880Hz + 1318.5Hz)
  function playMessageReceivedSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t0 = ctx.currentTime;

      // Note 1: A5 (880 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, t0);
      gain1.gain.setValueAtTime(0.03, t0);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.09);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(t0);
      osc1.stop(t0 + 0.095);

      // Note 2: E6 (1318.5 Hz) - delayed by 45ms for a crisp luxury interval
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.5, t0 + 0.045);
      gain2.gain.setValueAtTime(0.035, t0 + 0.045);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t0 + 0.045);
      osc2.stop(t0 + 0.23);
    } catch(e) {}
  }

  // Subtle welcoming swell on chat opening (520Hz -> 760Hz in 40ms)
  function playChatOpenSound() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch(e) {}
  }

  // Expose global API for other components (e.g. AI chat widget)
  window.AurumAudio = {
    playClickSound: playClickSound,
    playHoverSound: playHoverSound,
    playMessageSentSound: playMessageSentSound,
    playMessageReceivedSound: playMessageReceivedSound,
    playChatOpenSound: playChatOpenSound,
    isSoundEnabled: function() { return soundEnabled; }
  };

  // Attach tactile audio to interactive buttons and links
  function bindAudioListeners() {
    const clickTargets = document.querySelectorAll('button:not(#soundToggle):not(#aiChatToggle):not(#aiChatSendBtn):not(#aiChatCloseBtn), .btn, .theme-toggle-btn:not(#soundToggle), .menu-toggle, .nav-links a, .hero-cta a');
    clickTargets.forEach(function(el) {
      el.addEventListener('click', playClickSound, { passive: true });
    });

    const hoverTargets = document.querySelectorAll('button:not(#soundToggle), .btn, .theme-toggle-btn:not(#soundToggle), .menu-toggle, .nav-links a, .hero-cta a, .ai-chat-chip');
    hoverTargets.forEach(function(el) {
      el.addEventListener('mouseenter', playHoverSound, { passive: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAudioListeners);
  } else {
    bindAudioListeners();
  }
})();

/* ---------- Side Scroll Progress Indicator ---------- */
(function initSideScrollTracker() {
  const bar = document.getElementById('sideScrollBar');
  if (!bar) return;
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const progress = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
    bar.style.height = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* =============================================
   AURUM NOVA ÔÇö $10k+ LUXURY 3D & TACTILE SUITE
   Awwwards / Linear-tier Interactive Physics
   ============================================= */

// 1. Hero 3D Parallax & Depth Tilt on Founder Portrait (Calibrated Micro-Damping)
function initHero3DParallax() {
  const container = document.querySelector('.portrait-container');
  const frame = document.getElementById('heroPortraitFrame') || document.querySelector('.portrait-frame');
  if (!container || !frame) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    let angle = 0;
    function autoFloat() {
      angle += 0.015;
      const rotX = Math.sin(angle) * 1.5;
      const rotY = Math.cos(angle * 0.8) * 1.8;
      frame.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      requestAnimationFrame(autoFloat);
    }
    requestAnimationFrame(autoFloat);
    return;
  }

  let rafId = null;
  let targetRotX = 0, targetRotY = 0;
  let currentRotX = 0, currentRotY = 0;

  function updateOrientation() {
    currentRotX += (targetRotX - currentRotX) * 0.09;
    currentRotY += (targetRotY - currentRotY) * 0.09;
    frame.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(6px)`;
    if (Math.abs(targetRotX - currentRotX) > 0.01 || Math.abs(targetRotY - currentRotY) > 0.01) {
      rafId = requestAnimationFrame(updateOrientation);
    } else {
      rafId = null;
    }
  }

  const heroSection = document.getElementById('top') || document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRotY = Math.max(-6.5, Math.min(6.5, normX * 6.5));
      targetRotX = Math.max(-5.5, Math.min(5.5, -normY * 5.5));

      const frameRect = frame.getBoundingClientRect();
      const glareX = ((e.clientX - frameRect.left) / frameRect.width) * 100;
      const glareY = ((e.clientY - frameRect.top) / frameRect.height) * 100;
      frame.style.setProperty('--glare-x', `${Math.max(0, Math.min(100, glareX))}%`);
      frame.style.setProperty('--glare-y', `${Math.max(0, Math.min(100, glareY))}%`);

      if (!rafId) rafId = requestAnimationFrame(updateOrientation);
    }, { passive: true });

    heroSection.addEventListener('mouseleave', function() {
      targetRotX = 0;
      targetRotY = 0;
      if (!rafId) rafId = requestAnimationFrame(updateOrientation);
    }, { passive: true });
  }
}

// 2. Quantum Neural 3D Interactive Canvas (Tranquil Ambient Drift)
function initQuantumNeuralCanvas3D() {
  const canvas = document.getElementById('heroCanvas3D');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const heroSection = document.getElementById('top') || canvas.closest('.hero');
  let width = 0, height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let isVisible = true;
  const mouse = { x: -9999, y: -9999, active: false };

  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) requestAnimationFrame(render);
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  function resize() {
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }, { passive: true });
  }

  const nodeCount = Math.min(50, Math.max(28, Math.floor(window.innerWidth / 34)));
  const nodes = [];
  const fov = 350;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 1100,
      y: (Math.random() - 0.5) * 650,
      z: Math.random() * 400 - 150,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      vz: (Math.random() - 0.5) * 0.14,
      baseRadius: Math.random() * 1.6 + 1.1,
      isCyan: Math.random() < 0.22,
      phase: Math.random() * Math.PI * 2
    });
  }

  function render() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const projected = [];

    for (let i = 0; i < nodes.length; i++) {
      const p = nodes[i];
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.phase += 0.016;

      if (p.x < -600) p.x = 600;
      if (p.x > 600) p.x = -600;
      if (p.y < -350) p.y = 350;
      if (p.y > 350) p.y = -350;
      if (p.z < -200) p.z = 250;
      if (p.z > 250) p.z = -200;

      const scale = fov / (fov + p.z + 200);
      const projX = centerX + p.x * scale;
      const projY = centerY + p.y * scale;

      if (mouse.active) {
        const dx = mouse.x - projX;
        const dy = mouse.y - projY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist > 1) {
          const force = (1 - dist / 160) * 0.16;
          p.x += (dx / dist) * force * 2.2;
          p.y += (dy / dist) * force * 2.2;
        }
      }

      const alpha = Math.max(0.10, Math.min(0.80, scale * 0.65 + Math.sin(p.phase) * 0.12));
      projected.push({ x: projX, y: projY, scale, alpha, isCyan: p.isCyan, baseRadius: p.baseRadius });
    }

    const maxDist = 120;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < maxDist) {
          const lineAlpha = (1 - d / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.42;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          if (p1.isCyan || p2.isCyan) {
            ctx.strokeStyle = `rgba(79, 214, 224, ${lineAlpha.toFixed(3)})`;
          } else {
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha.toFixed(3)})`;
          }
          ctx.lineWidth = Math.min(p1.scale, p2.scale) * 0.95;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const dx = mouse.x - projected[i].x;
        const dy = mouse.y - projected[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const cursorAlpha = (1 - dist / 150) * projected[i].alpha * 0.6;
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${cursorAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const r = p.baseRadius * p.scale;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(1, r), 0, Math.PI * 2);
      ctx.fillStyle = p.isCyan
        ? `rgba(79, 214, 224, ${p.alpha.toFixed(3)})`
        : `rgba(212, 175, 55, ${p.alpha.toFixed(3)})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// 3. Dynamic Spotlight & 3D Tilt on Cards (Subtle Weighted Tactile Lift)
function initCardSpotlightAndTilt() {
  const cards = document.querySelectorAll('.service-card, .vision-card, .premium-card, .project-card, .form-card');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  cards.forEach((card) => {
    card.classList.add('spotlight-card');

    if (isTouch) return;

    let rafId = null;

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
      card.style.setProperty('--spotlight-opacity', '1');

      const tiltX = (y / rect.height - 0.5) * -2.2;
      const tiltY = (x / rect.width - 0.5) * 2.2;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-2px)`;
          rafId = null;
        });
      }
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--spotlight-opacity', '0');
      card.style.transform = '';
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, { passive: true });
  });
}

// 4. Magnetic Interactive Physics on Buttons (Linear/Apple Tactile Resistance)
function initMagneticButtons() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  const buttons = document.querySelectorAll('.btn-primary:not(.nav-cta), .btn-ghost, .hero-cta .btn');

  buttons.forEach((btn) => {
    btn.classList.add('magnetic-btn');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = Math.max(-5, Math.min(5, (e.clientX - centerX) * 0.14));
      const deltaY = Math.max(-5, Math.min(5, (e.clientY - centerY) * 0.14));

      btn.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    }, { passive: true });
  });
}

// 5. Metric Odometers / Number Increments
function initLiveOdometerMetrics() {
  const stats = document.querySelectorAll('.stat .num');
  if (!stats.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.__counted) {
        entry.target.__counted = true;
        const text = entry.target.textContent.trim();
        const numericVal = parseFloat(text.replace(/[^0-9.]/g, ''));

        if (!isNaN(numericVal) && numericVal > 0) {
          entry.target.classList.add('odometer-active');
          const duration = 1200;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * numericVal);
            entry.target.textContent = current;
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              entry.target.textContent = text;
            }
          }
          requestAnimationFrame(tick);
        } else {
          entry.target.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.4s';
          entry.target.style.transform = 'scale(1.1)';
          setTimeout(() => { entry.target.style.transform = ''; }, 400);
        }
      }
    });
  }, { threshold: 0.3 });

  stats.forEach((el) => observer.observe(el));
}

// 7. Ambient Background System (Living Aurora + Radar Grid Cursor Spotlight)
function initBackgroundAmbientSystem() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const grid = document.getElementById('precisionGridBg') || document.querySelector('.precision-grid-bg');
  const glowLayer = document.getElementById('ambientGlowLayer') || document.querySelector('.ambient-glow-layer');
  if (!grid && !glowLayer) return;

  if (isTouch) {
    if (grid) {
      grid.style.setProperty('--bg-cursor-x', '50%');
      grid.style.setProperty('--bg-cursor-y', '35%');
    }
    return;
  }

  let rafId = null;
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;

  function update() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    if (grid) {
      grid.style.setProperty('--bg-cursor-x', `${currentX.toFixed(1)}px`);
      grid.style.setProperty('--bg-cursor-y', `${currentY.toFixed(1)}px`);
    }

    if (glowLayer) {
      const offsetX = ((currentX / window.innerWidth) - 0.5) * 14;
      const offsetY = ((currentY / window.innerHeight) - 0.5) * 10;
      glowLayer.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
    }

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      rafId = requestAnimationFrame(update);
    } else {
      rafId = null;
    }
  }

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!rafId) rafId = requestAnimationFrame(update);
  }, { passive: true });
}

// Master initialization with accessibility guard
function initLuxury3DSuite() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  initHero3DParallax();
  initQuantumNeuralCanvas3D();
  initCardSpotlightAndTilt();
  initMagneticButtons();
  initLiveOdometerMetrics();
  initBackgroundAmbientSystem();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLuxury3DSuite);
} else {
  initLuxury3DSuite();
}

/* =============================================
   8. CONVERSION TRACKING & TELEMETRY ENGINE
   Standard DataLayer + GA4 + Meta Pixel Bridge
   ============================================= */
window.dataLayer = window.dataLayer || [];
window.trackAurumEvent = function(eventName, eventParams) {
  try {
    eventParams = eventParams || {};
    eventParams.event = eventName;
    eventParams.timestamp = new Date().toISOString();

    // 1. GTM / GA4 dataLayer
    window.dataLayer.push(eventParams);

    // 2. Google Analytics 4 direct
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    // 3. Meta Pixel direct
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, eventParams);
    }
  } catch(e) {}
};

// Auto-track all WhatsApp CTA interactions
document.addEventListener('click', function(e) {
  const waTarget = e.target.closest('a[href*="wa.me"], .wa-float');
  if (waTarget) {
    const rawLabel = waTarget.textContent || waTarget.getAttribute('aria-label') || '';
    window.trackAurumEvent('contact_whatsapp', {
      destination: '0981138814',
      label: rawLabel.trim().slice(0, 60),
      url: waTarget.href || 'whatsapp_floating'
    });
  }
}, { passive: true });
