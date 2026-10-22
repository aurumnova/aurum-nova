import { test, expect } from './fixtures.js';

test.describe('Home', () => {
  test('carga, titulo y secciones clave', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/AURUM NOVA/);
    await expect(page.locator('h1')).toBeVisible();

    for (const id of ['about', 'services', 'portfolio', 'progress', 'blog', 'contact']) {
      await expect(page.locator(`#${id}`), `seccion #${id}`).toHaveCount(1);
    }
  });

  test('las anclas de navegacion resuelven a secciones existentes', async ({ page }) => {
    await page.goto('./');
    const hrefs = await page
      .locator('.nav-links a')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      if (href && href.startsWith('#')) {
        await expect(page.locator(href), `ancla ${href}`).toHaveCount(1);
      }
    }
  });

  test('404 con marca en ruta inexistente', async ({ request }) => {
    const res = await request.get('./ruta-que-no-existe-e2e');
    expect(res.status()).toBe(404);
    const body = await res.text();
    expect(body).toContain('404');
    expect(body.toUpperCase()).toContain('AURUM');
  });
});
