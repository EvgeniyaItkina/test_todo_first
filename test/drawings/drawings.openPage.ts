import { expect, Page } from "@playwright/test";
import { correct_WS_Project } from "../workspace/correct_WS_Project";
import 'dotenv/config';

export async function openDrawingsPage(page: Page) {
    await page.goto(process.env.VISOFT_SHARAT!);
    await correct_WS_Project(page);
    await page.getByRole('link', { name: 'Drawings' }).click();
    await expect(page).toHaveURL(/\/drawing-scope\/drawings/i);
}

