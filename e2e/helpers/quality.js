// Gate de calidad: 0px estricto de overflow horizontal y 0 errores de consola/pageerror.
import { expect } from '@playwright/test';

export function attachQuality(page) {
  const errors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`console.error: ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.message}`);
  });

  return {
    errors,
    async assert() {
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      const overflow = scrollWidth - clientWidth;
      expect(
        overflow,
        `overflow horizontal: scrollWidth ${scrollWidth} > clientWidth ${clientWidth} (${overflow}px)`,
      ).toBeLessThanOrEqual(0);

      expect(
        errors,
        `errores de consola/pageerror:\n${errors.join('\n')}`,
      ).toHaveLength(0);
    },
  };
}
