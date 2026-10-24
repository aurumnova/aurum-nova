# Frontend: Chat History Restore — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: usar `subagent-driven-development` (recomendado) o `executing-plans` para implementar tarea por tarea. Los pasos son checkboxes (`- [ ]`).

**Goal:** al abrir el widget de chat, si el visitante tiene un token de sesión válido en `localStorage`, cargar `GET /api/v1/chat/history` y repintar **solo los mensajes** en `#aiChatMessages`, sin duplicar el mensaje de bienvenida ni los chips.

**Contrato congelado del endpoint (Plan 2, worker):**
- `GET /api/v1/chat/history?page=1&limit=100` (límite 100)
- Header: `Authorization: Bearer <an_sess_…>`
- 200: `{ messages: [{ index, role: 'user'|'assistant', content }], pagination: { page, limit, total, totalPages }, conversationVersion }`
- Token sin fila lead → `messages: [], total: 0`
- Nunca devuelve `name`, `email`, `company`, `need`, `session_id`

**Archivo a tocar:** `index.html` (el chat vive en un `<script>` inline al final).

**Patrón de sesión existente (no se cambia):** `SESSION_STORAGE_KEY = 'aurum_nova_session_id'`, `isValidSessionToken()`, `getOrBootstrapSession()`, `fetchWithSessionRetry()`, `WORKER_BASE_URL`.

## Global Constraints

- No tocar ni exponer el token en la UI ni en logs.
- Si no hay token válido (`getSessionId()` → `null`), **no** llamar al endpoint; el bootstrap ocurre en el primer `send`.
- El welcome (`¡Hola! Soy el asistente…`) y los chips solo se muestran si el historial está vacío.
- El restore es **best-effort**: si falla, el chat sigue funcionando (welcome path).
- Zero console errors (el gate de calidad de Playwright trata `console.warn` como aceptable, `console.error` como fallo).

## Review Focus

1. **Sin welcome duplicado**: `messagesContainer.innerHTML = ''` antes de repintar, y solo si hay ≥ 1 mensaje.
2. **Orden**: se repinta en el orden de `index` devuelto por el endpoint.
3. **Rol**: `assistant → bot`, `user → user`.
4. **Escapado**: se reutiliza `appendMessage` (escapa bot vía `formatBotMessage`, usa `textContent` para user).
5. **401 sin bucle**: el restore **no** reintenta; limpia el token y deja el welcome. El siguiente `send` hará bootstrap.
6. **Scope**: la función vive dentro de `initAIChatWidget()` para acceder a `appendMessage`/`formatBotMessage`/`messagesContainer`.

---

### Task 1: `restoreChatHistory()` + llamada al abrir

**File:** `index.html`

- [ ] **Step 1: Definir la función dentro de `initAIChatWidget()`** (junto a `scrollToBottom`):
```javascript
async function restoreChatHistory() {
  const token = getSessionId();
  if (!token) return;
  try {
    const res = await fetch(
      WORKER_BASE_URL + '/api/v1/chat/history?page=1&limit=100',
      { method: 'GET', headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' } }
    );
    if (res.status === 401) { localStorage.removeItem(SESSION_STORAGE_KEY); return; }
    if (!res.ok) return;
    const data = await res.json().catch(() => null);
    if (!data || !Array.isArray(data.messages)) return;
    const msgs = data.messages;
    if (msgs.length === 0) return;
    messagesContainer.innerHTML = '';
    msgs.forEach((m) => appendMessage(m.content, m.role === 'assistant' ? 'bot' : 'user'));
    scrollToBottom();
  } catch (err) {
    console.warn('Chat history restore failed:', err);
  }
}
```

- [ ] **Step 2: Llamar al abrir** — en `toggleChat(open)`, dentro del bloque `if (shouldOpen)`, antes del `setTimeout` del focus:
```javascript
await restoreChatHistory();
```
`toggleChat` debe ser `async`.

---

### Task 2: Regression guard en Playwright

**File:** `e2e/tests/chat.spec.js`

- [ ] **Step 1: Stub de `/chat/history`** en `stubWorker` (antes del match `/chat`, y añadir `Authorization` al `Access-Control-Allow-Headers`).

- [ ] **Step 2: Test "restore muestra historial y oculta welcome/chips"**
```javascript
await page.evaluate((token) => localStorage.setItem('aurum_nova_session_id', token), TOKEN);
await page.locator('#aiChatToggle').click();
await expect(page.locator('#aiChatMessages .ai-msg')).toHaveCount(3);
await expect(page.locator('#aiChatChips')).toBeHidden();
await expect(page.locator('#aiChatMessages')).not.toContainText('¡Hola! Soy el asistente');
```

- [ ] **Step 3: Test "sin token muestra welcome y chips"** (limpiar localStorage, abrir, esperar chips visibles y el texto del welcome).

---

### Task 3: Verificación y commit

- [ ] `node tests/sessionRetry.test.mjs` → PASS.
- [ ] `npm run test:ci` (en `e2e/`) → suite completa verde (6 viewports).
- [ ] `git diff --check` limpio.
- [ ] Commit explícito (prohibido `git add .`):
  ```bash
  git add -- index.html e2e/tests/chat.spec.js
  git commit -m "feat(frontend): restore chat history on widget open"
  ```

---

## Cierre / handoff

- PR a `main` (sin merge) con CI verde; pedir OK de **deploy conjunto** (worker + frontend).
- **No merge, no deploy sin OK explícito del CEO.**
- El contrato del endpoint debe permanecer congelado mientras el frontend no despliegue.

## Self-review (cobertura del pedido)

- "Restore en frontend": Task 1.
- "Sin welcome duplicado": `innerHTML = ''` solo cuando hay mensajes.
- "Solo mensajes, sin PII": el endpoint lo garantiza; el frontend solo repinta lo recibido.
- "Fail-closed": 401 limpia token, sin reintento ni bucle.
- "No rompe sin token": `getSessionId()` → `null` y salida temprana.
