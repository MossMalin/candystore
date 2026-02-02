import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // ✅ allows beforeEach, afterEach, describe, etc.
    environment: 'jsdom', // ✅ enables browser-like testing
    setupFiles: ['./vitest.setup.ts'], // optional setup
  },
});
