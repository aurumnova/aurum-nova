import { test, expect } from './fixtures.js';

const TOKEN = 'an_sess_11111111-1111-1111-1111-111111111111.abcdef.9999999999';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

const HISTORY_RESPONSE = {
  messages: [
    { index: 0, role: 'user', content: 'Hola, ¿cuánto cuesta?' },
    { index: 1, role: 'assistant', content: 'Pipeline IA desde 499€/mes.' },
    { index: 2, role: 'user', content: 'Quiero agendar demo' },
  ],
  pagination: { page: 1, limit: 100, total: 3, totalPages: 1 },
  conversationVersion: 5,
};

async function stubWorker(page) {
  // Nunca tocamos el worker real: interceptamos toda el API.
  await page.route('**/api/v1/**', (route) => {
    const req = route.request();
    if (req.method() === 'OPTIONS') {
      return route.fulfill({ status: 204, headers: CORS });
    }

    const url = req.url();
    if (url.includes('/session/bootstrap')) {
      return route.fulfill({
        status: 201,
        headers: CORS,
        contentType: 'application/json',
        body: JSON.stringify({ sessionToken: TOKEN }),
      });
    }
    if (url.includes('/chat/history')) {
      return route.fulfill({
        status: 200,
        headers: CORS,
        contentType: 'application/json',
        body: JSON.stringify(HISTORY_RESPONSE),
      });
    }
    if (url.includes('/chat')) {
      return route.fulfill({
        status: 200,
        headers: CORS,
        contentType: 'application/json',
        body: JSON.stringify({
          response: '**Precios** desde stub E2E. Pipeline IA disponible.',
          sessionId: TOKEN,
        }),
      });
    }
    if (url.includes('/leads')) {
      return route.fulfill({
        status: 200,
        headers: CORS,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'created', leadId: 'stub-lead' }),
      });
    }
    return route.fulfill({ status: 404, headers: CORS, contentType: 'application/json', body: '{}' });
  });
}

test.describe('Chat IA', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      !['mobile-390', 'desktop-1440'].includes(testInfo.project.name),
      'Cobertura funcional de chat en 2 viewports (el overflow lo cubre home.spec en los 6)',
    );
    await stubWorker(page);
  });

  test('abre, envia con stub y cierra con Escape', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('#aiChatToggle');
    const box = page.locator('#aiChatBox');

    await expect(toggle).toHaveAttribute('aria-controls', 'aiChatBox');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(box).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.locator('#aiChatInput').fill('Hola, prueba E2E');
    await page.locator('#aiChatSendBtn').click();
    await expect(page.locator('#aiChatMessages')).toContainText('desde stub E2E', { timeout: 10000 });
    await expect(page.locator('#aiChatInput')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(box).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('Escape no cierra el chat si el foco esta fuera del panel', async ({ page }) => {
    await page.goto('./');
    const toggle = page.locator('#aiChatToggle');
    const box = page.locator('#aiChatBox');

    await toggle.click();
    await expect(box).toBeVisible();

    await page.locator('h1').click();
    await page.keyboard.press('Escape');
    await expect(box).toBeVisible();

    await page.locator('#aiChatCloseBtn').click();
    await expect(box).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test('restore muestra historial y oculta welcome/chips', async ({ page }) => {
    await page.goto('./');
    await page.evaluate((token) => localStorage.setItem('aurum_nova_session_id', token), TOKEN);

    const toggle = page.locator('#aiChatToggle');
    const box = page.locator('#aiChatBox');
    const messages = page.locator('#aiChatMessages .ai-msg');
    const chips = page.locator('#aiChatChips');

    await toggle.click();
    await expect(box).toBeVisible();

    // 3 mensajes del mock de history (welcome + chips NO contados)
    await expect(messages).toHaveCount(3);
    await expect(messages.nth(0)).toContainText('Hola, ¿cuánto cuesta?');
    await expect(messages.nth(1)).toContainText('Pipeline IA desde 499€/mes.');
    await expect(messages.nth(2)).toContainText('Quiero agendar demo');

    // Welcome y chips ocultos (el welcome es el mensaje bot inicial)
    await expect(chips).toBeHidden();
    await expect(page.locator('#aiChatMessages')).not.toContainText('¡Hola! Soy el asistente');
  });

  test('sin token muestra welcome y chips', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => localStorage.removeItem('aurum_nova_session_id'));

    const toggle = page.locator('#aiChatToggle');
    const box = page.locator('#aiChatBox');
    const chips = page.locator('#aiChatChips');

    await toggle.click();
    await expect(box).toBeVisible();
    await expect(chips).toBeVisible();
    await expect(page.locator('#aiChatMessages')).toContainText('¡Hola! Soy el asistente');
  });
});
