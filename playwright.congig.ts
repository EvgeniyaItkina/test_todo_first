import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    storageState: 'playwright/.auth/new_QCM.json',
  },
});