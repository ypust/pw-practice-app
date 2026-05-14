import {test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto(" http://localhost:4200/")
      await page.click("text=Forms")
})

test.describe("Datepicker", () => {
    test("Datepicker", async ({page}) => {
    await page.click("text=Datepicker")

})
})