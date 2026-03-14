import { expect, test } from "@playwright/test";
import { createDrawing, editingDrawings, deleteDrawingByValue } from "./drawings.model";
import { openDrawingsPage } from "./drawings.openPage";

test.use({ storageState: 'playwright/.auth/new_QCM.json' });

test('create and delete new Drawing', async ({ page }) => {

    await openDrawingsPage(page);

    const token = await page.evaluate(() => localStorage.getItem('main'));
    console.log(token);

    await createDrawing(page, {
        name: '10',
        number: '10',
        company: 'ANNE MORAG LTD',
        discipline: 'Architecture',
        lastVersion: '1',
        lastRevision: '1',
        revisionDate: '17/02/2026',
        revisionDatePlane: '17/02/2026'
    });

    await deleteDrawingByValue(page, '10');
});

test('filter by drawing name', async ({ page }) => {
    await openDrawingsPage(page);

    const rows = page.locator('.ant-table-tbody .ant-table-row');
    await expect(rows.first()).toBeVisible();

    const firstNameCell = rows.first().locator('td').nth(0);
    const drawingName = (await firstNameCell.innerText()).trim();

    const totalRows = await rows.count();
    let expectedCount = 0;

    for (let i = 0; i < totalRows; i++) {
        const cellText = (await rows.nth(i).locator('td').nth(0).innerText()).trim();
        if (cellText === drawingName) {
            expectedCount++;
        }
    }

    await page.locator('[aria-label="filter"]').nth(0).click();

    const filterInput = page.getByRole('textbox').last();
    await filterInput.fill(drawingName);

    await page.getByRole('button', { name: /apply/i }).click();

    await page.waitForTimeout(1000);

    const filteredRows = page.locator('.ant-table-tbody .ant-table-row');
    await expect(filteredRows).toHaveCount(expectedCount);

});
/* 
test('filter by drawing number', async ({ page }) => {
});

test('filter by company', async ({ page }) => {
});

test('filter by discipline', async ({ page }) => {
});

test('filter by version', async ({ page }) => {
});
 */