import fs from 'node:fs';
import vm from 'node:vm';

// Read the session helper from the external JS file
const js = fs.readFileSync(new URL('../assets/app.js', import.meta.url), 'utf8');
const start = js.lastIndexOf('/*', js.indexOf('Helper:'));
const end = js.indexOf('/* ---------- Form handler');

if (start < 0 || end < 0 || end <= start) {
  throw new Error('No se encontró el bloque de sesión en assets/app.js');
}

const helperCode = js.slice(start, end);
const store = { aurum_nova_session_id: 'an_sess_old.sig.exp' };
const calls = [];
let chatCalls = 0;

const context = {
  console,
  localStorage: {
    getItem: (key) =>
      Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
  },
  fetch: async (url, options) => {
    calls.push({ url, body: options.body });

    if (url.endsWith('/api/v1/session/bootstrap')) {
      return {
        ok: true,
        status: 201,
        json: async () => ({ sessionToken: 'an_sess_new.sig.exp' }),
      };
    }

    if (url.endsWith('/api/v1/chat')) {
      chatCalls += 1;
      return {
        ok: chatCalls > 1,
        status: chatCalls === 1 ? 401 : 200,
        json: async () => ({ response: 'OK' }),
      };
    }

    throw new Error(`URL inesperada: ${url}`);
  },
};

vm.createContext(context);
vm.runInContext(
  `${helperCode}\n;globalThis.__sessionTest = { isValidSessionToken, fetchWithSessionRetry };`,
  context
);

const { isValidSessionToken, fetchWithSessionRetry } = context.__sessionTest;

if (isValidSessionToken('an_sess_a.b')) {
  throw new Error('Se aceptó un token de dos segmentos');
}
if (!isValidSessionToken('an_sess_a.b.c')) {
  throw new Error('Se rechazó un token de tres segmentos');
}

const response = await fetchWithSessionRetry(
  'https://worker.example/api/v1/chat',
  (sessionId) => ({
    method: 'POST',
    body: JSON.stringify({ sessionId, message: 'hola' }),
  })
);

if (response.status !== 200) {
  throw new Error('El reintento no terminó en 200');
}
if (calls.length !== 3) {
  throw new Error(`Se esperaban 3 llamadas, llegaron ${calls.length}`);
}

const retryBody = JSON.parse(calls[2].body);
if (retryBody.sessionId !== 'an_sess_new.sig.exp') {
  throw new Error('El reintento no usó el token nuevo');
}
if (retryBody.message !== 'hola') {
  throw new Error('El reintento perdió el payload original');
}
if (store.aurum_nova_session_id !== 'an_sess_new.sig.exp') {
  throw new Error('El token nuevo no se guardó');
}

console.log('session-retry: PASS (401 -> bootstrap -> retry con el mismo payload)');