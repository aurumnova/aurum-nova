import { test, expect } from './fixtures.js';

const TOKEN = 'an_sess_11111111-1111-1111-1111-111111111111.abcdef.9999999999';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': '86400',
};

async function stubWorker(page) {
  // Nunca enviamos datos reales: interceptamos toda el API.
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

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      !['mobile-390', 'desktop-1440'].includes(testInfo.project.name),
      'Cobertura funcional del formulario en 2 viewports',
    );
    await stubWorker(page);
  });

  test('campos requeridos vacios y honeypot limpio', async ({ page }) => {
    await page.goto('./');

    const validity = await page.evaluate(() => ({
      name: document.querySelector('#f-name').checkValidity(),
      email: document.querySelector('#f-email').checkValidity(),
      msg: document.querySelector('#f-msg').checkValidity(),
    }));

    expect(validity).toEqual({ name: false, email: false, msg: false });
    await expect(page.locator('#f-hp')).toHaveValue('');
  });

  test('envio valido con stub muestra confirmacion', async ({ page }) => {
    await page.goto('./');

    await page.locator('#f-name').fill('Playwright QA');
    await page.locator('#f-email').fill('playwright-qa@example.com');
    await page.locator('#f-msg').fill('Prueba automatizada E2E, no contactar.');
    await page.locator('#contactForm button[type=submit]').click();

    await expect(page.locator('.form-note')).toContainText('registrada', { timeout: 10000 });
    await expect(page.locator('#f-hp')).toHaveValue('');
  });
});
