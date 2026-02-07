
    import { test } from '@playwright/test';
    import { createTodoModel } from './todomodel.ts';

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
        await model.expectTodoItemText(0, 'buy milk');
    })

    /* -------------------------2------------------------- */
    test('does page have buttons and they are NOT visible', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()

        await model.expectLink('All', 'toHaveCount0');
        await model.expectLink('Active', 'toHaveCount0');
        await model.expectLink('Completed', 'toHaveCount0');
    })
    /* -------------------------3------------------------- */
    test('does page have buttons and they ARE visible', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()


        /* Add one task */
        await model.createNewItem('buy milk')

        /*check visible*/
        await model.expectLink('All');
        await model.expectLink('Active');
        await model.expectLink('Completed');
        await model.expectButton('Clear completed');
    })
    /* -------------------------4------------------------- */
    test('edit todo item', async ({ page }) => {

        const model = createTodoModel(page)
        await model.navigate()

        await model.createNewItem('buy milk')

        await model.editItem('buy milk', 'milk 2');
        await model.expectTodoItemText(0, 'milk 2');
    });



    /* -------------------------5------------------------- */

    test('delete todo item', async ({ page }) => {
        const model = createTodoModel(page);
        await model.navigate();

        await model.createNewItem('buy milk');
        await model.createNewItem('buy bread');

        await model.expectTodoItemsCount(2);
        await model.expectTodoItemText(0, 'buy milk');
        await model.expectTodoItemText(1, 'buy bread');

        await model.deleteTodoItem(0);

        await model.expectTodoItemsCount(1);
        await model.expectTodoItemNotVisibleByText('buy milk');
        await model.expectTodoItemVisibleByText('buy bread');
    });

    /* -------------------------6------------------------- */
    test('complete todo item', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()

        await model.createNewItem('buy milk')
        await model.createNewItem('buy bread')

        await model.completeTodoItem(0)
        await model.expectTodoItemCompleted(0)
        await model.expectTodoItemNotCompleted(1)
    })

    /* -------------------------7------------------------- */
    test('filter by button completed todo items', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()

        await model.createNewItem('buy milk')

        await model.completeTodoItem(0)
        await model.useFilter('Completed')

        await model.expectTodoItemVisibleByText('buy milk');
    })


    /* -------------------------8------------------------- */
    test('filter by button completed todo items without not complited items', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()

        await model.createNewItem('buy milk');
        await model.createNewItem('buy bread');
        await model.createNewItem('buy chips');

        await model.completeTodoItem(0);
        await model.useFilter('Completed');
        await model.expectTodoItemVisibleByText('buy milk');
        await model.expectTodoItemNotVisibleByText('buy bread');
        await model.expectTodoItemNotVisibleByText('buy chips');
    });

    /* -------------------------9------------------------- */


    test('clear completed todo items', async ({ page }) => {
        const model = createTodoModel(page)
        await model.navigate()
        await model.createNewItem('buy milk')

        await model.completeTodoItem(0)
        await model.expectTodoItemCompleted(0)
        await model.useButtonClearComplited()

        await model.expectTodoItemNotVisibleByText('buy milk');
    })