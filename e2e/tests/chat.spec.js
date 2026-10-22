import { test, expect } from './fixtures.js';

const TOKEN = 'an_sess_11111111-1111-1111-1111-111111111111.abcdef.9999999999';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': '86400',
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
});
