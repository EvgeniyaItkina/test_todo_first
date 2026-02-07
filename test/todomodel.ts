/* -------------------------page ------------------------- */
import { expect, Page } from '@playwright/test';

export function createTodoModel(page: Page) {

    const items = page.getByRole("main").getByRole('list').getByRole('listitem');

    return {

        // Opens the TodoMVC page
        async navigate() {
            await page.goto('https://todomvc.com/examples/react/dist/')
        },

        //Creates a new todo item
        async createNewItem(item: string) {
            const newTodoInput = page.getByPlaceholder('What needs to be done?');
            await newTodoInput.fill(item)
            await newTodoInput.press('Enter')
        },

        // Returns the checkbox (toggle) of a todo item by index
        todoItemToggle(n: number) {
            return items.nth(n).locator('.toggle')
        },

        // all todo items
        todoItems() {
            return items;
        },

        // Returns locator for a single todo item by index
        todoItem(n: number) {
            return items.nth(n);
        },

        // Verifies total number of todo items
        async expectTodoItemsCount(count: number) {
            await expect(items).toHaveCount(count);
        },

        // Edits a todo item by its current text
        async editItem(oldItem: string, newItem: string) {
            const itemToEdit = items.filter({ hasText: oldItem });
            await itemToEdit.dblclick();
            await page.getByTestId('todo-item').getByTestId('text-input').fill(newItem);
            await page.getByTestId('todo-item').getByTestId('text-input').press('Enter');
        },

        // Verifies text of a todo item by index
        async expectTodoItemText(n: number, text: string) {
            await expect(items.nth(n)).toHaveText(text);
        },

        // Deletes a todo item by index
        async deleteTodoItem(n: number) {
            const itemToDelete = items.nth(n);
            await itemToDelete.hover();
            await itemToDelete.locator('.destroy').click();
        },

        // Verifies that a todo item with given text does NOT exist
        async expectTodoItemNotVisibleByText(text: string) {
            await expect(items.filter({ hasText: text })).toHaveCount(0);
        },

        // Verifies that a todo item with given text IS visible
        async expectTodoItemVisibleByText(text: string) {
            await expect(items.filter({ hasText: text })).toBeVisible();
        },


        //links on the page
        expectLink(name: string, action: 'toBeVisible' | 'toHaveCount0' = 'toBeVisible') {
            if (action === 'toBeVisible') {
                return expect(page.getByRole('link', { name: name })).toBeVisible();
            } else {
                return expect(page.getByRole('link', { name: name })).toHaveCount(0);
            }
        },

        //get buttons
        expectButton(name: string, action: 'toBeVisible' | 'toHaveCount0' = 'toBeVisible') {
            if (action === 'toBeVisible') {
                return expect(page.getByRole('button', { name: name })).toBeVisible();
            } else {
                return expect(page.getByRole('button', { name: name })).toHaveCount(0);
            }
        },

        async completeTodoItem(n: number) {
            await items.nth(n).locator('.toggle').check();
        },

        async expectTodoItemCompleted(n: number) {
            await expect(items.nth(n)).toHaveClass(/completed/);
        },

        async expectTodoItemNotCompleted(n: number) {
            await expect(items.nth(n)).not.toHaveClass(/completed/);
        },

        async useFilter(name: 'All' | 'Active' | 'Completed') {
            await page.getByRole('link', { name }).click();
        },
        useButtonClearComplited() {
            return page.getByRole('button', { name: 'Clear completed' }).click();
        }

    };


}






