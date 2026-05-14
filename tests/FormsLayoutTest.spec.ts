import {test, expect} from '@playwright/test'

// Use should add "await" before all Playwright actions, otherwise the test will not wait for the action to complete.
// Add acync to the "page" ficsture, otherwise the test will not wait for the page to load before performing actions on it.

test.beforeEach(async ({page}) => {
    await page.goto(" http://localhost:4200/")
      await page.click("text=Forms")
      await page.click("text=Form Layouts")
})

test.describe("Forms", () => {

    test("Inline form", async ({page}) => {

    // Fill in the form
    await page.getByPlaceholder("Jane Doe").fill("Test User")
    await page.getByRole("textbox", { name: "Email" }).first().fill("test.email@example.com")

    // Assertions of the entered values
    await expect (page.getByPlaceholder("Jane Doe").first()).toHaveValue("Test User")
    await expect (page.getByRole("textbox", { name: "Email" }).first()).toHaveValue("test.email@example.com")

    //Assertions of the checkbox   

    const checkbox = page.locator(".custom-checkbox").first()
    await checkbox.check()

    await expect(checkbox).toBeChecked()

    // Submit the form
    await page.getByRole("button", { name: "Submit" }).first().click()
    })

    test("Using the Grid", async ({page}) => {
    await page.getByPlaceholder("Email").first().fill("test.email@example.com")
    await page.getByPlaceholder("Password").first().fill("password1")

    // Select radios
    await page.locator('nb-card nb-radio :text-is("Option 1")').check()
    await page.locator('nb-card nb-radio :text-is("Option 2")').check()

    // Assertions
    await expect(page.locator('nb-card nb-radio :text-is("Option 1")')).not.toBeChecked()
    await expect(page.locator('nb-card nb-radio :text-is("Option 2")')).toBeChecked()
    // Disabled radio
    const disabledRadio = page.locator('nb-radio:has-text("Disabled Option") input')
    await expect(disabledRadio).toBeDisabled()

    // Click button
    await page.getByRole("button", { name: "Sign in" }).first().click()


})
})