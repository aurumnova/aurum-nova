import { test, expect } from './fixtures.js';

// Smoke de producción SOLO LECTURA. No envía chat ni formulario.
// Se ejecuta manual o por cron, nunca por PR.
test.describe('@smoke Produccion', () => {
  test('home carga con titulo y hero', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/AURUM NOVA/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('404 con marca', async ({ request }) => {
    const res = await request.get('./ruta-que-no-existe-e2e');
    expect(res.status()).toBe(404);
    const body = await res.text();
    expect(body).toContain('404');
    expect(body.toUpperCase()).toContain('AURUM');
  });
});
