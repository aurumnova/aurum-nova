import { test as base, expect } from '@playwright/test';
import { attachQuality } from '../helpers/quality.js';

// Fixture automática: corre después de cada test (incluso si falla) y valida
// 0px de overflow horizontal y 0 errores de consola/pageerror.
export const test = base.extend({
  quality: [
    async ({ page }, use) => {
      const quality = attachQuality(page);
      await use(quality);
      await quality.assert();
    },
    { auto: true },
  ],
});

export { expect };
