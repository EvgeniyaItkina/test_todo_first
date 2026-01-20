/* -------------------------page ------------------------- */
import { Page } from '@playwright/test';

function createTodoModel(page: Page) {
    return {
        //method to find placeholder
        async createNewItem(item: string) {
            const newTodoInput = page.getByPlaceholder('What needs to be done?');
            await newTodoInput.fill(item)
            await newTodoInput.press('Enter')
        },

        //site togo
        async navigate() {
            await page.goto('https://todomvc.com/examples/react/dist/')
        },


        todoItem(n: number) {
            return page.getByRole("main").getByRole('list').getByRole('listitem').nth(n)
        },

        todoItemToggle(n: number) {
            return page.getByRole("main").getByRole('list').getByRole('listitem').nth(n).locator('.toggle')
        },

        async editItem(oldItem: string, newItem: string) {
            const item = page.locator('li', { hasText: oldItem });
            await item.dblclick();
            await page.getByTestId('todo-item').getByTestId('text-input').fill(newItem);
            await page.getByTestId('todo-item').getByTestId('text-input').press('Enter');
        }
    }
}
export { createTodoModel };