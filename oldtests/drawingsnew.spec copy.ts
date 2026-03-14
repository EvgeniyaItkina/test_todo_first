import { test, expect } from "@playwright/test";
import { login } from "../test/auth/login";
import 'dotenv/config';
import { correct_WS } from "../test/workspace/correct_WS_Project";

test('drawingsnew', async ({ page }) => {


    await login(page);
    await expect(page).toHaveURL(/dashboard/);
    await correct_WS(page);


    await page.getByRole('link', { name: 'Drawings' }).click();
    await page.getByRole('button', { name: 'New', exact: true }).click();
    await page.waitForURL(/dashboard/, { timeout: 10000 })

    await page.locator('#drawingName').getByRole('textbox').click();
    await page.locator('#drawingName').getByRole('textbox').fill('10');
    await page.locator('#drawingNo').getByRole('textbox').click();
    await page.locator('#drawingNo').getByRole('textbox').fill('10');
    await page.locator('[data-cy="designerProjectCompanyId"]').click();
    await page
        .locator('[data-cy="designerProjectCompanyId"]')
        .getByRole('combobox')
        .fill('אן מורג בע~מ');
    await page
        .locator('[data-cy="designerProjectCompanyId"]')
        .getByRole('combobox')
        .press('Tab');

    await page.locator('[data-cy="discipline"]').click();
    await page
        .locator('[data-cy="discipline"]')
        .getByRole('combobox')
        .fill('Architecture');
    await page
        .locator('[data-cy="discipline"]')
        .getByRole('combobox')
        .press('Enter');

    await page.locator('input[name="lastVersion"]').click();
    await page.locator('input[name="lastVersion"]').fill('1');
    await page.locator('input[name="lastRevision"]').click();
    await page.locator('input[name="lastRevision"]').fill('1');
    await page.locator('input[name="revisionDate"]').click();
    await page.getByText('Today').click();
    await page.locator('input[name="revisionDatePlane"]').click();
    await page.getByText('Today').nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();

    await page.getByRole('link', { name: 'Drawings' }).click();
    await page.locator('.ant-table-cell > div > button').first().click();
    await page.getByRole('button', { name: 'Yes' }).click();

});