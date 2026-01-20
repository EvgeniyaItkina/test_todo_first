
import { test, expect, Page } from '@playwright/test';
import { createTodoModel } from './function.ts';

/* test('check you can add todo items', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    await page.locator('#todo-input').fill('buy milk')
    await page.locator('#todo-input').press('Enter')
    await expect(page.getByText('buy milk')).toBeVisible();
})
 */
/* -------------------------1------------------------- */
test('check you can add todo items -2', async ({ page }) => {

    const model = createTodoModel(page)
    await model.navigate()
    await model.createNewItem('buy milk')

    await expect(page.getByText('buy milk')).toBeVisible();
})
/* -------------------------2------------------------- */
test('does page have buttons and they are NOT visible', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    await expect(page.getByRole('link', { name: 'All' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Active' })).toBeHidden();
    await expect(page.getByRole('link', { name: 'Completed' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();

})

/* -------------------------3------------------------- */
test('does page have buttons and they ARE visible', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()


    /* Add one task */
    await model.createNewItem('buy milk')

    /*check visible*/
    await expect(page.getByLabel('All')).toBeVisible();

    await expect(page.getByRole("main").getByRole('list').getByText('buy milk')).toBeVisible();
    await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Completed' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
})

/* -------------------------4------------------------- */
test('edit todo item', async ({ page }) => {

    const model = createTodoModel(page)
    await model.navigate()

    await model.createNewItem('buy milk')

    await model.editItem('buy milk', 'milk 2');

    await expect(page.getByTestId('todo-item-label')).toContainText('milk 2');
});

/* -------------------------5------------------------- */

test('delete todo item', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    await model.createNewItem('buy milk')
    await model.createNewItem('buy bread')
    //count 2 elements in listing
    await expect(page.getByRole("main").getByRole('list').getByRole('listitem')).toHaveCount(2)

    const item = page.getByTestId('todo-item').filter({ hasText: 'buy milk' });
    const item2 = page.getByTestId('todo-item').filter({ hasText: 'buy bread' });
    await item.hover();

    await item.getByRole('button', { name: '×' }).click();
    await expect(page.getByRole("main").getByRole('list').getByRole('listitem')).toHaveCount(1)

    await expect(item).not.toBeVisible();
    await expect(item2).toBeVisible();
});

/* -------------------------6------------------------- */
test('complete todo item', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    await model.createNewItem('buy milk')
    await model.createNewItem('buy bread')

    await model.todoItemToggle(0).click()
    await expect(model.todoItem(0)).toHaveClass(/completed/)
    await expect(model.todoItem(1)).not.toHaveClass(/completed/)
})

/* -------------------------7------------------------- */
test('filter by button completed todo items', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    await model.createNewItem('buy milk')

    const item = model.todoItem(0);
    await item.locator('.toggle').check();

    await page.getByRole('link', { name: 'Completed' }).click();

    await expect(model.todoItem(0)).toBeVisible();
})

/* -------------------------8------------------------- */
test('filter by button completed todo items without not complited items', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    await model.createNewItem('buy milk');
    await model.createNewItem('buy bread');
    await model.createNewItem('buy chips');

    await model.todoItemToggle(0).check();

    await page.getByRole('link', { name: 'Completed' }).click();

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(model.todoItem(0)).toBeVisible();
    await expect(model.todoItem(1)).not.toBeVisible();
    await expect(model.todoItem(2)).not.toBeVisible();
})
/* -------------------------9------------------------- */

test('clear completed todo items', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()
    await model.createNewItem('buy milk')

    await model.todoItemToggle(0).click()
    await expect(model.todoItem(0)).toHaveClass(/completed/)

    const clearCompletedButton = page.getByRole('button', { name: 'Clear completed' })
    await clearCompletedButton.click()
    await expect(model.todoItem(0)).not.toBeVisible();
})


/* -------------------------10------------------------- */
test('check H1 UI', async ({ page }) => {
    const model = createTodoModel(page)
    await model.navigate()

    const header = page.getByText('todos')
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS('color', 'rgb(184, 63, 69)');
    await expect(header).toHaveCSS('font-size', '80px');
    await expect(header).toHaveCSS('font-weight', '200');
    await expect(header).toHaveCSS('position', 'absolute');
});
