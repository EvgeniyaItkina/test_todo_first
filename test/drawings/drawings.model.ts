import { expect, Page } from '@playwright/test';

export async function createDrawing(page: Page, data: {
  name: string;
  number: string;
  company: string;
  discipline: string;
  lastVersion: string;
  lastRevision: string;
  revisionDate: string;
  revisionDatePlane: string;

}): Promise<void> {
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await expect(page.locator('#drawingName').getByRole('textbox')).toBeVisible();
  await page.locator('#drawingName').getByRole('textbox').fill(data.name);
  await page.locator('#drawingNo').getByRole('textbox').fill(data.number);

  // choosing Designer company
  await page.locator('[data-cy="designerProjectCompanyId"]').click();
  await page.locator('[data-cy="designerProjectCompanyId"]').getByRole('combobox').fill(data.company);
  await page.waitForTimeout(3000);
  await page.locator('[data-cy="designerProjectCompanyId"]').getByRole('combobox').press('Tab');
  await page.waitForTimeout(3000);
  

  // choosing Discipline
  await page.locator('[data-cy="discipline"]').click();
  await page.locator('[data-cy="discipline"]').getByRole('combobox').fill(data.discipline);
  await page.waitForTimeout(3000);
  await page.locator('[data-cy="discipline"]').getByRole('combobox').press('Tab');

  // Version and Revision
  await page.locator('input[name="lastVersion"]').fill(data.lastVersion);
  await page.waitForTimeout(3000);
  await page.locator('input[name="lastRevision"]').fill(data.lastRevision);
  await page.waitForTimeout(3000);

  // Dates
  await page.locator('input[name="revisionDate"]').fill(data.revisionDate);
  await page.locator('input[name="revisionDate"]').press('Tab');

  await page.locator('input[name="revisionDatePlane"]').fill(data.revisionDatePlane);
  await page.locator('input[name="revisionDatePlane"]').press('Tab');

  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForURL(/drawings/, { timeout: 30000 })
  await expect(page.getByRole('button', { name: 'Save' })).toBeHidden();
  //await page.getByText('Drawing: has been successfully updated!').waitFor({ state: 'visible' });
}


export async function editingDrawings(page: Page, number: string, patch: {
  name?: string;
  number?: string;
  company?: string;
  discipline?: string;
  lastVersion?: string;
  lastRevision?: string;
  revisionDate?: string;
  revisionDatePlane?: string;

}): Promise<void> {
  await page.locator('.ant-table-row', { hasText: number }).locator('[data-cy="edit"]').click();

  const hasChanges =
    patch.number !== undefined ||
    patch.name !== undefined ||
    patch.company !== undefined ||
    patch.discipline !== undefined ||
    patch.lastVersion !== undefined ||
    patch.revisionDate !== undefined ||
    patch.revisionDatePlane !== undefined;

  if (patch.name !== undefined) {
    await page.locator('#drawingName').getByRole('textbox').fill(patch.name);
  }

  if (patch.number !== undefined) {
    await page.locator('#drawingNo').getByRole('textbox').fill(patch.number);
  }

  if (patch.company !== undefined) {
    await page.locator('[data-cy="designerProjectCompanyId"]').click();
    await page.locator('[data-cy="designerProjectCompanyId"]').getByRole('combobox').fill(patch.company);
    await page.locator('[data-cy="designerProjectCompanyId"]').getByRole('combobox').press('Tab');
  }

  if (patch.discipline !== undefined) {
    await page.locator('[data-cy="discipline"]').click();
    await page.locator('[data-cy="discipline"]').getByRole('combobox').fill(patch.discipline);
    await page.locator('[data-cy="discipline"]').getByRole('combobox').press('Enter');
  }


  if (patch.lastVersion !== undefined) {
    await page.locator('input[name="lastVersion"]').fill(patch.lastVersion);
  }

  if (hasChanges) {
    const revisionInput = page.locator('input[name="lastRevision"]');

    const currentValue = await revisionInput.inputValue();
    const nextValue = String(Number(currentValue) + 1);

    await revisionInput.fill(nextValue);
  }

  // Dates
  if (patch.revisionDate) {
    await page.locator('input[name="revisionDate"]').fill(patch.revisionDate);
    await page.locator('input[name="revisionDate"]').press('Tab');
  }

  if (patch.revisionDatePlane) {
    await page.locator('input[name="revisionDatePlane"]').fill(patch.revisionDatePlane);
    await page.locator('input[name="revisionDatePlane"]').press('Tab');
  }

  await page.getByRole('button', { name: 'Save' }).click();
}

export async function deleteDrawingByValue(page: Page, value: string): Promise<void> {
  await page
    .locator('.ant-table-row', { hasText: value })
    .locator('[data-cy="delete"]')
    .click();

  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForTimeout(3000);

  //no row
  await expect(page.locator('.ant-table-row', { hasText: value })).toBeHidden();
  //success message
  await page.getByText('Drawing: has been successfully deleted!').waitFor({ state: 'visible' });

}