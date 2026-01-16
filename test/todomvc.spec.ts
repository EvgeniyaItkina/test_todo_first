import { test, expect } from '@playwright/test';

/* test('check you can add todo items', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    await page.locator('#todo-input').fill('buy milk')
    await page.locator('#todo-input').press('Enter')
    await expect(page.getByText('buy milk')).toBeVisible();
})
 */
/* -------------------------1------------------------- */
test('check you can add todo items -2', async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    const newTodoInput = page.getByPlaceholder('What needs to be done?');

    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')\

    await expect(page.getByText('buy milk')).toBeVisible();
})
/* -------------------------2------------------------- */
test ('does page have buttons', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    await page.getByRole('button', {name: 'All'})
    await page.getByRole('button', {name: 'Active'})
    await page.getByRole('button', {name: 'Completed'})
    await page.getByRole('button', {name: 'Clear completed'})
})

/* -------------------------3------------------------- */
/* not work */
test ('edit todo item', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')

    await page.getByText('buy milk').dblclick()
    await page.getByText('buy milk').fill('buy 2 milk')
    await page.getByText('buy 2 milk').press('Enter')
})

/* -------------------------4------------------------- */
/* not work */
test ('delete todo item', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/')
    
    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')

    
    await newTodoInput.fill('buy bread')
    await newTodoInput.press('Enter')

    const todoItem1 = page.getByText('buy milk')
    todoItem1.hover()
    const deleteButton = todoItem1.getByRole('button', {name: 'destroy'})
    await deleteButton.click()
    await expect(todoItem1).not.toBeVisible();
})

/* -------------------------5------------------------- */
test ('complete todo item', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/') 

    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')

    const todoItem1 = page.getByText('buy milk')
    const todoItem = page.locator('li:has-text("buy milk")')
    const checkbox = todoItem.locator('.toggle')

    await checkbox.check()
    await expect(todoItem1).toHaveClass(/completed/)
})


/* -------------------------6------------------------- */
test ('filter by button completed todo items', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')

    const todoItem1 = page.getByText('buy milk')
    const toggleCheckbox = todoItem1.getByRole('checkbox')
    await toggleCheckbox.check()
    await expect(todoItem1).toHaveClass(/completed/)

    const completedButton = page.getByRole('button', {name: 'Completed'})
    await completedButton.click()
    await expect(todoItem1).toBeVisible();
})

/* -------------------------7------------------------- */
test ('filter by button completed todo items without not complited items', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/')

    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')
    const todoItem1 = page.getByText('buy milk')

    await newTodoInput.fill('buy bread')
    await newTodoInput.press('Enter')
    const todoItem2 = page.getByText('buy bread')

    await newTodoInput.fill('buy chips')
    await newTodoInput.press('Enter')
    const todoItem3 = page.getByText('buy chips')

    const toggleCheckbox = todoItem1.getByRole('checkbox')
    await toggleCheckbox.check()

    const completedButton = page.getByRole('button', {name: 'Completed'})
    await completedButton.click()
    await expect(todoItem1).toBeVisible();
    await expect(todoItem2).not.toBeVisible();
})

/* -------------------------8------------------------- */
test ('clear completed todo items', async ({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/') 

    const newTodoInput = page.getByPlaceholder('What needs to be done?');
    await newTodoInput.fill('buy milk')
    await newTodoInput.press('Enter')

    const todoItem1 = page.getByText('buy milk')
    const toggleCheckbox = todoItem1.getByRole('checkbox')
    await toggleCheckbox.check()
    await expect(todoItem1).toHaveClass(/completed/)

    const clearCompletedButton = page.getByRole('button', {name: 'Clear completed'})
    await clearCompletedButton.click()
    await expect(todoItem1).not.toBeVisible();
})

/* -------------------------9------------------------- */

