import { test, expect } from '@playwright/test';
import { login } from './login';

test('save user session', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({ path: 'playwright/auth_data/new_QCM.json' });
});
