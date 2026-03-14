import { Page } from '@playwright/test';
import 'dotenv/config';

export async function login(page: Page): Promise<void> {

    const email = process.env.VISOFT_EMAIL as string;
    const password = process.env.VISOFT_PASSWORD as string;
    const url = process.env.VISOFT_SHARAT as string;


    await page.goto(url);


    await page.locator('input[type="text"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    /* await page.waitForURL(/dashboard/, { timeout: 30000 }) */

}
