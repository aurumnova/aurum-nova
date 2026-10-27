import { test, expect } from './fixtures.js';

test.describe('Navegacion movil', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.startsWith('desktop-'), 'El menu movil solo aplica a viewports < 900px');
    await page.goto('./');
  });

  test('menu dentro del viewport, abre, enfoca y cierra con Escape', async ({ page }) => {
    const toggle = page.locator('#menuToggle');
    const menu = page.locator('#mobileMenu');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-controls', 'mobileMenu');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    const box = await toggle.boundingBox();
    const viewport = page.viewportSize();
    expect(box, 'boundingBox de #menuToggle').not.toBeNull();
    expect(viewport, 'viewport de la pagina').not.toBeNull();
    expect(box.x, 'borde izquierdo').toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, 'borde derecho').toBeLessThanOrEqual(viewport.width + 1);

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute('aria-hidden', 'false');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Cerrar menú');
    await expect(menu.locator('a').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(menu).toHaveAttribute('aria-hidden', 'true');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-label', 'Abrir menú');
    await expect(toggle).toBeFocused();
  });
});
