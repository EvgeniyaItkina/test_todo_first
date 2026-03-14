import { expect, Page } from '@playwright/test';
import 'dotenv/config';

export async function correct_WS_Project(page: Page): Promise<void> {

    await expect(page).toHaveURL(/dashboard/);
    await page.getByText(/^Workspaces/i).click();
    await page.getByRole('link', { name: 'Workspaces (Test-Jeniya)' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Enter the Workspace' }).nth(1).click();
    await page.getByRole('button', { name: 'Enter the project' }).nth(1).click();
}