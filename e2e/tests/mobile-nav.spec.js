import { test, expect } from './fixtures.js';

test.describe('Navegacion movil', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.startsWith('desktop-'), 'El menu movil solo aplica a viewports < 900px');
    await page.goto('./');
  });

  test('menu dentro del viewport y abre correctamente', async ({ page }) => {
    const toggle = page.locator('#menuToggle');
    await expect(toggle).toBeVisible();

    const box = await toggle.boundingBox();
    const viewport = page.viewportSize();
    expect(box, 'boundingBox de #menuToggle').not.toBeNull();
    expect(box.x, 'borde izquierdo').toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, 'borde derecho').toBeLessThanOrEqual(viewport.width + 1);

    await toggle.click();
    await expect(page.locator('#mobileMenu')).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
